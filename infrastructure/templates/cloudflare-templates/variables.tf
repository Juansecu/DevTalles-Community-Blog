variable "account_id" {
  description = "Cloudflare Account ID"
  type = string
  sensitive = true
}

variable "domain" {
  description = "Primary domain for the project"
  type = string
}

variable "r2_bucket_name" {
  description = "Name for the R2 bucket to store user  avatar images and post images"
  type = string
}

variable "r2_bucket_min_tls" {
  description = "Minimum TLS version for the R2 bucket custom domain"
  type = string
  default = "1.0"
  validation {
    condition     = contains(["1.0", "1.1", "1.2", "1.3"], var.r2_bucket_min_tls)
    error_message = "r2_bucket_min_tls must be one of '1.0', '1.1', '1.2', or '1.3'."
  }
}

variable "r2_bucket_subdomain" {
  description = "Subdomain for the R2 bucket custom domain (e.g., 'static' for static.example.com)"
  type = string
  default = "static"
}

variable "turnstile_domains" {
  description = "List of domains for Cloudflare Turnstile"
  type = list(string)
  sensitive = true
  default = []
}

variable "turnstile_mode" {
  description = "Turnstile mode: 'non-interactive', 'invisible', 'managed'"
  type = string
  default = "managed"
  validation {
    condition     = contains(["non-interactive", "invisible", "managed"], var.turnstile_mode)
    error_message = "turnstile_mode must be one of 'non-interactive', 'invisible', or 'managed'."
  }
}

variable "turnstile_name" {
  description = "Name for the Turnstile configuration"
  type = string
}

variable "zone_id" {
  description = "Cloudflare Zone ID"
  type = string
  sensitive = true
}
