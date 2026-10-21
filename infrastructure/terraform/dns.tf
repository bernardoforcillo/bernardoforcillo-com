# ---------------------------------------------------------------------------
# Custom domain: Cloud Run domain mapping + Cloud DNS zone.
# The mapping needs the domain verified in Search Console by the account that
# runs terraform (add the verification TXT record at the current DNS host first).
# ---------------------------------------------------------------------------
resource "google_cloud_run_domain_mapping" "apex" {
  location = var.run_region
  name     = var.domain

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.website.name
  }
}

resource "google_dns_managed_zone" "apex" {
  name        = replace(var.domain, ".", "-")
  dns_name    = "${var.domain}."
  description = "Public zone for ${var.domain}"

  depends_on = [google_project_service.enabled]
}

locals {
  mapping_records = google_cloud_run_domain_mapping.apex.status[0].resource_records
}

resource "google_dns_record_set" "apex" {
  for_each = toset(["A", "AAAA"])

  managed_zone = google_dns_managed_zone.apex.name
  name         = google_dns_managed_zone.apex.dns_name
  type         = each.value
  ttl          = 300
  rrdatas      = [for r in local.mapping_records : r.rrdata if r.type == each.value]
}
