# 03 — Data Retention Schedule & Data Subject Request (DSR) Workflow

## 1. Data Retention Matrix

| Data Category | Retention Duration | Deletion / Anonymization Trigger |
|---|---|---|
| Website Consultation & Partnership Inquiries (`inquiries` table) | **12 months** from last interaction | Deleted or anonymized after 12 months unless converted into an active client contract or deleted earlier upon verified DSR request |
| System Health Assessment Lead Snapshots | **12 months** from submission | Same as above; anonymous unsubmitted assessment sessions are never persisted on Sundawa servers |
| Legacy Cost Calculator & Outsource Estimator Inputs | **0 days (client-side only)** | Computed strictly inside the visitor's browser unless voluntarily shared via WhatsApp or Contact Form |
| Admin Authentication Session Cookie | Session / short-lived HMAC expiry | Cleared on logout or expiration |
| Cookie Consent Preference (`localStorage`) | Up to **12 months** (or until user clears browser storage) | User may update or clear anytime via Cookie Preferences |

## 2. Data Subject Request (DSR) Handling SOP

1. **Intake**: Data subject emails `contact@sundawa.net` with subject `[Privacy Request]`.
2. **Acknowledgment & Identity Verification**: Acknowledge receipt within **3×24 hours** (aligned with UU PDP No. 27/2022) and verify requester identity via the email address on record.
3. **Execution**:
   - **Access / Export**: Export matching rows from Supabase `inquiries` table in readable JSON/CSV format.
   - **Correction**: Update inaccurate records in Supabase and confirm completion.
   - **Deletion / Opt-Out**: Permanently delete matching inquiry rows and confirm removal from any notification logs/marketing lists.
4. **Closure**: Provide written confirmation within **14 calendar days** (well within GDPR's 30-day statutory ceiling).
