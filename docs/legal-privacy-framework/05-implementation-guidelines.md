# 05 — Security & Privacy Engineering Implementation Guidelines

1. **Consent-Before-Tracking**: Never load GA4, GTM, LinkedIn Insight Tag, or Google Ads pixels before `getStoredConsent()?.analytics === true` (or `marketing === true` for ad pixels).
2. **Form Privacy Notices**: Every lead-capturing form (`ContactPage`, `AssessmentPage`) must display a visible Privacy Notice linking to `/privacy-policy` and clearly stating the 12-month retention window.
3. **Unchecked Marketing Opt-In**: Marketing communication checkboxes must always default to `false` (unchecked) and must NEVER block submission of a standard business inquiry.
4. **Anti-Spam Honeypot Consistency**: All forms posting to `/api/inquiries` must pass the unified honeypot field `hp`.
5. **Upgrading to Dedicated Email Aliases Later**:
   - All role-based emails are centralized in `lib/contact.ts` under `COMPANY_CONTACT.emails`.
   - Currently all roles route cleanly to `contact@sundawa.net`.
   - Once DNS aliases (`privacy@sundawa.net`, `legal@sundawa.net`, `security@sundawa.net`, `sales@sundawa.net`, `partnership@sundawa.net`) are activated, update only `lib/contact.ts` — every legal page and CTA updates automatically.
