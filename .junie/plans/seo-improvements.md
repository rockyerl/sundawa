# SEO Improvements Plan

### ✓ Step 1: Structured Data Expansion
Add JSON-LD schemas to pages that currently lack them: PortfolioDetail (CreativeWork), ServicesPage (Service listing), ServiceDetail (Service), AboutPage (AboutPage), and ObjectionsSection (FAQPage).

### ✓ Step 2: BreadcrumbList Schema
Create `src/shared/ui/BreadcrumbJsonLd.tsx` component and inject it in all subpages (blog, portfolio, services, about, contact, outsource, proses-kerja).

### ✓ Step 3: BlogPosting Enhancement & Meta Optimization
Enhance BlogPosting schema with `dateModified` and `articleSection`, then optimize meta descriptions in both id.json and en.json with keyword-rich text.
