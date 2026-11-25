# 02 — Cookie Policy & Consent Management Technical Specification

## 1. Cookie & Local Storage Taxonomy

| Category | Required? | Storage / Scripts Covered | Default State |
|---|---|---|---|
| **Strictly Necessary** | Always Active | Locale routing preference (`NEXT_LOCALE`), HMAC admin session cookie (admin panel only), PWA offline cache (`sw.js`), Cookie Consent preference (`sundawa_cookie_consent_v1`) | `true` |
| **Analytics** | Optional (Opt-In) | Google Analytics 4 (`gtag.js`), Google Tag Manager (`gtm.js`), `generate_lead` & `contact_whatsapp` event dispatch | `false` |
| **Marketing** | Optional (Opt-In) | Reserved for future advertising / LinkedIn Insight / Google Ads conversion tags (none active unless explicitly enabled & consented) | `false` |

## 2. Consent Record Schema (`localStorage`)

Key: `sundawa_cookie_consent_v1`

```json
{
  "version": "1.0",
  "updatedAt": "2026-11-25T12:00:00.000Z",
  "necessary": true,
  "analytics": false,
  "marketing": false
}
```

## 3. UI & Accessibility Requirements
- Banner displays brand mark (`SUNDAWA — PROFESSIONAL PRECISION, CUSTOMER COMFORT`) and clear neutral copy.
- Three buttons with equal visual accessibility and $\ge$ 44px touch targets: **Reject All**, **Customize**, **Accept All**.
- Clicking **Cookie Preferences** in the site footer reopens the Customize modal at any time so visitors can withdraw or modify consent without friction.
- `GoogleAnalytics.tsx` MUST NOT render `<Script>` tags for GA4 or GTM until `consent.analytics === true`.
