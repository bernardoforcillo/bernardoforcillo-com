locals {
  services = [
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "run.googleapis.com",
    "logging.googleapis.com",
    "dns.googleapis.com",
  ]

  # <region>-docker.pkg.dev/<project>/<repo>/<image>
  image_base = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_name}/${var.image_name}"
}

resource "google_project_service" "enabled" {
  for_each = toset(local.services)

  service            = each.value
  disable_on_destroy = false
}

# ---------------------------------------------------------------------------
# Artifact Registry
# ---------------------------------------------------------------------------
resource "google_artifact_registry_repository" "images" {
  location      = var.region
  repository_id = var.repository_name
  format        = "DOCKER"
  description   = "Container images for ${var.service_name}"

  # Cost control. KEEP beats DELETE, so the newest N versions are always
  # retained and anything else is removed once it is older than the cutoff.
  cleanup_policy_dry_run = false

  cleanup_policies {
    id     = "keep-most-recent"
    action = "KEEP"
    most_recent_versions {
      keep_count = var.keep_image_count
    }
  }

  cleanup_policies {
    id     = "delete-old"
    action = "DELETE"
    condition {
      older_than = "${var.image_max_age_days * 86400}s"
    }
  }

  depends_on = [google_project_service.enabled]
}

# ---------------------------------------------------------------------------
# Service accounts (least privilege, no default compute SA)
# ---------------------------------------------------------------------------
resource "google_service_account" "run" {
  account_id   = "${var.service_name}-run"
  display_name = "${var.service_name} Cloud Run runtime"
}

resource "google_service_account" "build" {
  account_id   = "${var.service_name}-build"
  display_name = "${var.service_name} Cloud Build"
}

resource "google_artifact_registry_repository_iam_member" "build_writer" {
  location   = google_artifact_registry_repository.images.location
  repository = google_artifact_registry_repository.images.name
  role       = "roles/artifactregistry.writer"
  member     = "serviceAccount:${google_service_account.build.email}"
}

resource "google_project_iam_member" "build_logs" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.build.email}"
}

resource "google_cloud_run_v2_service_iam_member" "build_deployer" {
  location = google_cloud_run_v2_service.website.location
  name     = google_cloud_run_v2_service.website.name
  role     = "roles/run.developer"
  member   = "serviceAccount:${google_service_account.build.email}"
}

resource "google_service_account_iam_member" "build_acts_as_run" {
  service_account_id = google_service_account.run.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.build.email}"
}

# ---------------------------------------------------------------------------
# Cloud Run: static Go server, so it scales to zero and runs small.
# ---------------------------------------------------------------------------
resource "google_cloud_run_v2_service" "website" {
  name                = var.service_name
  location            = var.run_region
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

  template {
    service_account                  = google_service_account.run.email
    max_instance_request_concurrency = 80
    timeout                          = "30s"

    scaling {
      min_instance_count = 0 # no idle cost
      max_instance_count = var.max_instances
    }

    containers {
      # Placeholder until the first Cloud Build run; the image is then managed
      # by the pipeline (see ignore_changes below).
      image = "us-docker.pkg.dev/cloudrun/container/hello"

      ports {
        container_port = 3000
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "128Mi"
        }
        cpu_idle          = true # CPU only billed while handling requests
        startup_cpu_boost = true # fast cold starts without a warm instance
      }
    }
  }

  lifecycle {
    ignore_changes = [
      template[0].containers[0].image,
      template[0].labels,
      template[0].revision,
      client,
      client_version,
    ]
  }

  depends_on = [google_project_service.enabled]
}

resource "google_cloud_run_v2_service_iam_member" "public" {
  count = var.allow_unauthenticated ? 1 : 0

  location = google_cloud_run_v2_service.website.location
  name     = google_cloud_run_v2_service.website.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# ---------------------------------------------------------------------------
# Cloud Build: build, push, deploy on push to main.
# ---------------------------------------------------------------------------
resource "google_cloudbuild_trigger" "deploy" {
  name            = "${var.service_name}-deploy"
  location        = var.region
  description     = "Build ${var.service_name} and deploy it to Cloud Run"
  filename        = "infrastructure/cloudbuild.yaml"
  service_account = google_service_account.build.id

  github {
    owner = var.github_owner
    name  = var.github_repo

    push {
      branch = var.github_branch_regex
    }
  }

  # Only changes that can affect the image start a build. Note that markdown under
  # apps/www/content is site content, so it must not be excluded.
  included_files = [
    "apps/www/**",
    "packages/**",
    "go.work*",
    "package.json",
    "pnpm-lock.yaml",
    "pnpm-workspace.yaml",
    "turbo.json",
    "infrastructure/cloudbuild.yaml",
  ]

  substitutions = {
    _REGION     = var.region
    _RUN_REGION = var.run_region
    _SERVICE    = var.service_name
    _IMAGE   = local.image_base
    _RUN_SA  = google_service_account.run.email
  }

  depends_on = [
    google_project_service.enabled,
    google_artifact_registry_repository_iam_member.build_writer,
    google_project_iam_member.build_logs,
  ]
}
