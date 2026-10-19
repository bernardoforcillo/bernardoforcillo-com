variable "project_id" {
  description = "GCP project that hosts everything."
  type        = string
}

variable "region" {
  description = "Single region for every resource. europe-west8 is Milan."
  type        = string
  default     = "europe-west8"
}

variable "service_name" {
  description = "Cloud Run service name, also used as the image name."
  type        = string
  default     = "www"
}

variable "repository_name" {
  description = "Artifact Registry repository id."
  type        = string
  default     = "www"
}

variable "github_owner" {
  description = "GitHub user or org that owns the repo (the Cloud Build GitHub app must be installed on it)."
  type        = string
  default     = "bernardoforcillo"
}

variable "github_repo" {
  description = "GitHub repository name."
  type        = string
  default     = "bernardoforcillo-com"
}

variable "github_branch_regex" {
  description = "Branches that trigger a build and deploy."
  type        = string
  default     = "^main$"
}

variable "keep_image_count" {
  description = "Always keep this many most recent image versions, regardless of age."
  type        = number
  default     = 10
}

variable "image_max_age_days" {
  description = "Delete image versions older than this many days (unless protected by keep_image_count)."
  type        = number
  default     = 180
}

variable "max_instances" {
  description = "Cloud Run max instances; caps cost under a traffic spike or abuse."
  type        = number
  default     = 3
}

variable "allow_unauthenticated" {
  description = "Make the Cloud Run service publicly reachable."
  type        = bool
  default     = true
}
