output "service_url" {
  description = "Cloud Run URL."
  value       = google_cloud_run_v2_service.website.uri
}

output "image_base" {
  description = "Image path used by Cloud Build."
  value       = local.image_base
}

output "build_trigger" {
  description = "Cloud Build trigger name."
  value       = google_cloudbuild_trigger.deploy.name
}
