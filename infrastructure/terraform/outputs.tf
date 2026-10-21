output "service_url" {
  description = "Cloud Run URL."
  value       = google_cloud_run_v2_service.website.uri
}

output "name_servers" {
  description = "Set these as the nameservers at the registrar."
  value       = google_dns_managed_zone.apex.name_servers
}

output "image_base" {
  description = "Image path used by Cloud Build."
  value       = local.image_base
}

output "build_trigger" {
  description = "Cloud Build trigger name."
  value       = google_cloudbuild_trigger.deploy.name
}
