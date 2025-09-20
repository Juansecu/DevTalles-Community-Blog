resource "cloudflare_r2_bucket" "r2_bucket" {
  account_id = var.account_id
  name = var.r2_bucket_name
  storage_class = "Standard"
}

resource "cloudflare_r2_bucket_cors" "r2_bucket_cors" {
  account_id = var.account_id
  bucket_name = cloudflare_r2_bucket.r2_bucket.name
  rules = [
    {
      allowed = {
        methods = ["GET"]
        origins = ["https://*.${var.domain}"]
        headers = ["*"]
      }
      expose_headers = ["Cf-Cache-Status", "Cf-Ray", "Content-Encoding"]
      id = "Allow Access from Production Environments"
      max_age_seconds = 14400 # 4 hours
    }
  ]
}

resource "cloudflare_r2_bucket_lifecycle" "r2_bucket_lifecycle" {
  account_id = var.account_id
  bucket_name = cloudflare_r2_bucket.r2_bucket.name
  rules = [
    {
      id = "Abort Multipart Uploads After 7 Days"
      enabled = true
      conditions = {
        prefix = ""
      }
      abort_multipart_uploads_transition = {
        condition = {
          max_age = 604800
          type = "Age"
        }
      }
    }
  ]
}

resource "cloudflare_r2_custom_domain" "r2_bucket_custom_domain" {
  account_id = var.account_id
  bucket_name = cloudflare_r2_bucket.r2_bucket.name
  domain = "${var.r2_bucket_subdomain}.${var.domain}"
  enabled = true
  min_tls = var.r2_bucket_min_tls
  zone_id = var.zone_id
}
