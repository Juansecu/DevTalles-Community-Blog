variable "account_id" {
  description = "Cloudflare Account ID"
  type = string
  sensitive = true
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
