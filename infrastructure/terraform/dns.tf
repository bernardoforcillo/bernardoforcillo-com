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

# ---------------------------------------------------------------------------
# Email: Hostinger mailbox (MX, SPF, DKIM, DMARC).
# The apex TXT set also carries the Search Console verification the domain
# mapping depends on, so it lives here as one record set.
# ---------------------------------------------------------------------------
resource "google_dns_record_set" "apex_mx" {
  managed_zone = google_dns_managed_zone.apex.name
  name         = google_dns_managed_zone.apex.dns_name
  type         = "MX"
  ttl          = 14400
  rrdatas      = ["5 mx1.hostinger.com.", "10 mx2.hostinger.com."]
}

resource "google_dns_record_set" "apex_txt" {
  managed_zone = google_dns_managed_zone.apex.name
  name         = google_dns_managed_zone.apex.dns_name
  type         = "TXT"
  ttl          = 300
  rrdatas = [
    "\"google-site-verification=JZ9BBjtXqJS0O9qFBbeWvAlIfjtjdSEIvCKoRwD4MTg\"",
    "\"v=spf1 include:_spf.mail.hostinger.com ~all\"",
  ]
}

resource "google_dns_record_set" "dkim" {
  for_each = toset(["a", "b", "c"])

  managed_zone = google_dns_managed_zone.apex.name
  name         = "hostingermail-${each.key}._domainkey.${google_dns_managed_zone.apex.dns_name}"
  type         = "CNAME"
  ttl          = 300
  rrdatas      = ["hostingermail-${each.key}.dkim.mail.hostinger.com."]
}

resource "google_dns_record_set" "dmarc" {
  managed_zone = google_dns_managed_zone.apex.name
  name         = "_dmarc.${google_dns_managed_zone.apex.dns_name}"
  type         = "TXT"
  ttl          = 3600
  rrdatas      = ["\"v=DMARC1; p=none\""]
}

# These records were first created by hand in the console; adopt them into state.
import {
  to = google_dns_record_set.apex_mx
  id = "bernardoforcillo-com/bernardoforcillo.com./MX"
}

import {
  to = google_dns_record_set.apex_txt
  id = "bernardoforcillo-com/bernardoforcillo.com./TXT"
}

import {
  for_each = toset(["a", "b", "c"])
  to       = google_dns_record_set.dkim[each.key]
  id       = "bernardoforcillo-com/hostingermail-${each.key}._domainkey.bernardoforcillo.com./CNAME"
}

import {
  to = google_dns_record_set.dmarc
  id = "bernardoforcillo-com/_dmarc.bernardoforcillo.com./TXT"
}
