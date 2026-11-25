# 06 — Supabase 12-Month Data Retention & DSR Operational SQL Runbook

> Operational SQL procedures for executing PT Sundawa Teknologi Indonesia's **12-month data retention policy** and **Data Subject Requests (DSR)** on Supabase PostgreSQL.

---

## 1. Automated 12-Month Retention Cleanup (Supabase `pg_cron`)

Execute in the Supabase SQL Editor (requires `pg_cron` extension enabled in Supabase Dashboard → Database → Extensions):

```sql
-- 1. Preview records older than 12 months before enabling automated purge
SELECT id, name, email, company, topic, status, created_at
FROM public.inquiries
WHERE created_at < NOW() - INTERVAL '12 months'
  AND status NOT IN ('active_client', 'legal_hold');

-- 2. Create reusable retention purge function
CREATE OR REPLACE FUNCTION public.purge_expired_inquiries()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public.inquiries
    WHERE created_at < NOW() - INTERVAL '12 months'
      AND status NOT IN ('active_client', 'legal_hold');

    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$;

-- 3. Schedule weekly automated execution every Sunday at 02:00 UTC (09:00 WIB)
SELECT cron.schedule(
    'sundawa-inquiries-12m-retention',
    '0 2 * * 0',
    $$SELECT public.purge_expired_inquiries();$$
);
```

---

## 2. Data Subject Request (DSR) Procedures (`contact@sundawa.net`)

Use these exact queries after verifying requester identity (acknowledge within 3 business days; complete within 14 calendar days):

### A. Right of Access / Data Portability Export
```sql
SELECT id, name, email, company, topic, message, source_url, status, created_at
FROM public.inquiries
WHERE LOWER(email) = LOWER('requester@company.com')
ORDER BY created_at DESC;
```

### B. Right to Rectification (Correction)
```sql
UPDATE public.inquiries
SET name = 'Corrected Name',
    company = 'Corrected Company',
    updated_at = NOW()
WHERE LOWER(email) = LOWER('requester@company.com');
```

### C. Right to Erasure (Permanent Deletion)
```sql
DELETE FROM public.inquiries
WHERE LOWER(email) = LOWER('requester@company.com');
```
