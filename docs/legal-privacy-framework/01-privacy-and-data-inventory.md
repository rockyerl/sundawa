# 01 — Privacy Policy Specification & Verified Data Processor Inventory

## 1. Verified Technical Processors (Observed in `sundawa-web`)

Every processor disclosed in `/privacy-policy` MUST correspond strictly to services actually used in production:

| Processor | Purpose | Data Categories Processed | Hosting / Transfer Disclosure |
|---|---|---|---|
| **Supabase** | Primary PostgreSQL database (`inquiries`, `posts`, `portfolio_projects`) & Storage | Inquiry contact fields (name, work email, company, topic, message, optional assessment snapshot, marketing opt-in flag) | Cloud infrastructure (Southeast Asia / global edge) with Row-Level Security (RLS) |
| **Resend** *(optional, if `RESEND_API_KEY` set)* | Transactional lead notification email to `contact@sundawa.net` | Submitted inquiry payload | Encrypted HTTPS API transit (TLS) |
| **Google Analytics 4 & Google Tag Manager** *(consent-gated)* | Aggregated traffic & conversion measurement (`generate_lead`, `contact_whatsapp`) | Pseudonymous interaction telemetry — **strictly blocked unless `analytics` consent is granted** | Global Google infrastructure |
| **WhatsApp (`wa.me`)** *(user-initiated)* | Direct consultation chat initiated explicitly by the visitor | Pre-filled message chosen by the visitor | Meta/WhatsApp platform under user's own account |

## 2. 19-Section Bilingual Privacy Policy Architecture

Both `/id/privacy-policy` and `/en/privacy-policy` implement the exact 19 sections:
1. Introduction & Scope
2. Data Controller Identity (`PT Sundawa Teknologi Indonesia`, Bandung, Jawa Barat, Indonesia)
3. Personal Information We Collect
4. How We Collect Information
5. Purpose of Data Processing
6. Legal Basis for Processing (Consent, Pre-Contractual Steps, Legitimate Business Interest, Legal Obligation)
7. Cookies & Tracking Technologies
8. Analytics & Advertising
9. Third-Party Service Providers
10. International Data Transfers
11. Data Retention (**12 months** standard retention for B2B lead inquiries, or earlier upon verified deletion request)
12. Information Security
13. Confidentiality of Business Information (Mutual NDA readiness)
14. Data Subject Rights (Access, Correction, Deletion, Restriction, Withdrawal of Consent, Portability)
15. Marketing Communications & Opt-Out (Explicit opt-in only)
16. Children's Privacy (B2B service; not directed to individuals under 18)
17. Third-Party Links
18. Changes to This Privacy Policy
19. Contact Information (`contact@sundawa.net`, Subject: `[Privacy Request]`)
