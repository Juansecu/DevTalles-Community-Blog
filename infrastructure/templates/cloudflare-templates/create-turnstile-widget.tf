resource "cloudflare_turnstile_widget" "turnstile_widget" {
  account_id = var.account_id
  domains = var.turnstile_domains
  mode = var.turnstile_mode
  name = var.turnstile_name
  region = "world"
}
