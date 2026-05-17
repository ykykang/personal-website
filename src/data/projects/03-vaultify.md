---
title: Vaultify — Secrets & Config Manager
tech: Go, HashiCorp Vault, AWS SSM, CLI, YAML
status: Internal Tool
link: #
year: 2023
featured: false
---

Internal tooling for centralized secret rotation and environment config management across cloud environments. Integrates with Vault and AWS SSM.

## Background

Secrets were scattered across .env files committed to repos, Confluence pages, and Slack DMs. A compliance audit flagged multiple high-severity findings. The team needed centralized secret management without overhauling every service at once.

## Bottleneck

Secret rotation without downtime was the trickiest part — services needed to pick up new credentials mid-flight. Implemented a dual-version lease system where old secrets stay valid for a short overlap window during rotation.

## Achievements

- Resolved all 7 high-severity compliance findings from the security audit
- Onboarded 12 services to centralized secret management in 3 weeks
- Rotation overlap mechanism achieved zero-downtime secret cycling across all integrated services
