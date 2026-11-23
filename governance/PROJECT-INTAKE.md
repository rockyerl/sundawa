# Project intake and review scope template

Copy and complete before executing any skill.

```yaml
project: "<project-code>"
requester: "<accountable owner>"
reviewer: "<assigned person/agent>"
skill: "<skill-slug>"
objective: "<one measurable decision>"
target:
  repository: "<link or local path>"
  commit: "<immutable commit hash>"
  environment: "<development/staging/production>"
  asset_scope: ["<only authorized assets>"]
  exclusions: []
authorization:
  approved_by: "<name and record id>"
  scope_doc: "<link>"
  active_testing_allowed: false
standards:
  target_ids: ["ISO-25010", "OWASP-ASVS"]
  official_sources_verified: false
requirements:
  baseline: "<approved BRD/SRS version>"
  acceptance_criteria: "<link>"
evidence:
  vault: "<restricted URL/location>"
  retention_policy: "<policy>"
release:
  profile: web
  decision_owner: "<human authority>"
  required_signoff: true
```

Never save actual secrets, private keys or personal data in this intake form.
