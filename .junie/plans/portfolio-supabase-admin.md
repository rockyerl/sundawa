# Portfolio Supabase Admin Integration Plan

### ✓ Step 1: Create Portfolio Table and Data Layer
Create `portfolio` table in Supabase, update types, and rewrite data fetching from static to Supabase.

### ✓ Step 2: Build Portfolio Admin API and Form
Create API routes, PortfolioForm component, and create/edit pages for portfolio management.

### ✓ Step 3: Integrate Portfolio Admin and Update Routes
Add tab navigation to admin dashboard, update route adapters to fetch from Supabase, update sitemap.

## Step 1 Details
- SQL migration: `supabase-portfolio-migration.sql` with `portfolio` table
- Update `lib/types.ts`: add `PortfolioProject` interface with Supabase fields (id, created_at, updated_at)
- Update `lib/types.test.ts`: add `isPortfolioProject` type guard test
- Rewrite `src/features/portfolio/data.ts`: `getPortfolioProjects()` and `getPortfolioProjectBySlug()` from Supabase
- Update `src/features/portfolio/index.ts`: export new functions

## Step 2 Details
- `app/api/blog/portfolio/route.ts`: GET, POST, PUT, DELETE
- `app/admin/portfolio/PortfolioForm.tsx`: Shared form with all fields
- `app/admin/portfolio/new/page.tsx`: Create page
- `app/admin/portfolio/[id]/edit/page.tsx`: Edit page (await params)

## Step 3 Details
- Update `app/admin/page.tsx`: Tab navigation (Blog | Portfolio)
- `app/admin/portfolio/page.tsx`: Dashboard list with edit/delete
- Update `app/[locale]/portfolio/page.tsx`: Fetch from Supabase
- Update `app/[locale]/portfolio/[slug]/page.tsx`: Fetch from Supabase
- Update `app/sitemap.ts`: Add portfolio slugs
- Update docs: AGENTS.md, README.md
- Run `npm run check`
