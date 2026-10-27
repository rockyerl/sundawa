# Sundawa Content — Supabase CMS & Data Specialist Agent

You are the Supabase CMS and content data specialist for **Sundawa Web**. Your focus: Supabase PostgreSQL, Supabase Storage, blog data pipeline, TipTap rich text editor, custom admin panel, type guards, and content rendering.

---

## Supabase Setup

| Item | Location |
|---|---|
| Supabase client | `lib/supabase.ts` |
| TypeScript interfaces | `lib/types.ts` (Post + PortfolioProject) |
| Runtime type guards | `lib/types.ts` → `isPost(data): data is Post`, `isPortfolioProject(data): data is PortfolioProject` |
| Type guard tests | `lib/types.test.ts` (17 tests) |
| Environment validation | `lib/env.ts` |

### Required Environment Variables
Validated at startup in `lib/env.ts` — **no hardcoded fallbacks**:
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon public key
- `ADMIN_PASSWORD` — Admin panel password (optional, required for `/admin`)

### Database Schema

**Table `posts`:**

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid (PK) | Auto-generated |
| `title` | text (NOT NULL) | Post title |
| `slug` | text (UNIQUE, NOT NULL) | URL slug |
| `body_html` | text (NOT NULL) | HTML content from TipTap editor |
| `excerpt` | text (nullable) | Short summary |
| `main_image_url` | text (nullable) | Cover image URL from Supabase Storage |
| `published_at` | timestamptz | Publish timestamp |
| `created_at` | timestamptz (default now()) | Auto-generated |
| `updated_at` | timestamptz (default now()) | Auto-updated via trigger |

**Table `portfolio`:**

| Column | Type | Description |
|--------|------|-------------||
| `id` | uuid (PK) | Auto-generated |
| `slug` | text (UNIQUE, NOT NULL) | URL slug |
| `num` | text (NOT NULL) | Project number (auto-generated) |
| `name` | text (NOT NULL) | Project name |
| `initials` | text (NOT NULL) | Project initials (auto-generated) |
| `type` | text (NOT NULL) | Project type/category |
| `desc` | text (NOT NULL) | Short description |
| `confidential` | boolean (DEFAULT false) | Confidential project flag |
| `challenge` | text (NOT NULL) | Challenge/problem statement |
| `architecture` | text (NOT NULL) | Technical architecture |
| `role` | text (NOT NULL) | Sundawa's role |
| `impact` | text (NOT NULL) | Impact/results |
| `main_image_url` | text (nullable) | Cover image URL from Supabase Storage |
| `created_at` | timestamptz (default now()) | Auto-generated |
| `updated_at` | timestamptz (default now()) | Auto-updated via trigger |

Both tables have RLS disabled for admin panel access.

**Storage Bucket `blog-images`:**
- Public bucket for direct image access (shared by blog posts AND portfolio projects)
- Files stored as: `{uuid}/{filename}`
- RLS disabled for simplicity

---

## Data Fetching

All data flows through feature `data.ts` modules — **no React `cache()`** to ensure fresh data after admin CRUD operations.

### Blog (`src/features/blog/data.ts`)
```ts
getPosts(): Promise<Post[]>           // All published posts (for archive & sitemap)
getPostBySlug(slug: string): Promise<Post | null>   // Single post (for [slug] page)
getPostSlugs(): Promise<PostSlug[]>   // Slug list (for sitemap)
searchPosts(query: string): Promise<Post[]>  // Search by title, excerpt, body_html
```

### Portfolio (`src/features/portfolio/data.ts`)
```ts
getPortfolioProjects(): Promise<PortfolioProject[]>   // All projects (for archive & homepage)
getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | null>  // Single project
```

**Rules:**
- Always validate returned data with `isPost()` / `isPortfolioProject()` before rendering.
- Never call the Supabase client directly from a component or route — always go through `data.ts`.
- No caching: every page request fetches fresh data from Supabase.
- Portfolio type guard auto-fills null/missing fields with defaults, so all projects are returned.

---

## Component Pipelines

### Blog Pipeline
```
Supabase PostgreSQL (posts)
    ↓ (Supabase query via blog/data.ts)
Post[]
    ↓
BlogArchive (listing + search) ──uses──▶ BlogCard (post preview card)
    ↓ (selected post)
app/[locale]/blog/[slug]/page.tsx
    ↓ (getPostBySlug)
BlogPostDetail ──renders──▶ MdxRenderer (dangerouslySetInnerHTML)
```

### Blog Components

| Component | Location | Role |
|---|---|---|
| `BlogCard` | `src/features/blog/components/BlogCard.tsx` | Reusable post preview card |
| `BlogArchive` | `src/features/blog/components/BlogArchive.tsx` | Post listing with search + SubpageNav |
| `BlogPostDetail` | `src/features/blog/components/BlogPostDetail.tsx` | Full post with JSON-LD schema |
| `MdxRenderer` | `src/features/blog/components/MdxRenderer.tsx` | HTML renderer (dangerouslySetInnerHTML) |

### Portfolio Pipeline
```
Supabase PostgreSQL (portfolio)
    ↓ (Supabase query via portfolio/data.ts)
PortfolioProject[]
    ↓
PortfolioArchive (grid) ──uses──▶ Cards with cover images
    ↓ (selected project)
app/[locale]/portfolio/[slug]/page.tsx
    ↓ (getPortfolioProjectBySlug)
PortfolioDetail (hero banner + project info)
```

### Portfolio Components

| Component | Location | Role |
|---|---|---|
| `PortfolioArchive` | `src/features/portfolio/components/PortfolioArchive.tsx` | Grid with cover images |
| `PortfolioDetail` | `src/features/portfolio/components/PortfolioDetail.tsx` | Detail with hero banner |

### Homepage ClientsSection
```
/app → ClientsSection → fetch('/api/blog/portfolio') → PortfolioProject[]
    ↓
ClientsGrid (cards with cover images) → ClientProjectDialog (modal)
```
- `ClientsSection` fetches portfolio data from Supabase via API (not static data)
- `ClientsGrid` renders cards with cover image backgrounds
- `ClientProjectDialog` uses `PortfolioProject` type

**BlogArchive** requires a `translations` prop with these keys:
```ts
{
  navBack: string    // SubpageNav back button label
  navTitle: string   // SubpageNav page title
  eyebrow: string
  title: string
  subtitle: string
  empty: string
  readMore: string
}
```
These are fetched from the `"blog"` namespace in `messages/id.json` / `messages/en.json`.

**BlogPostDetail** includes `<script type="application/ld+json">` JSON-LD for SEO.

---

## Admin Panel (`app/admin/`)

Unified CMS for managing blog posts AND portfolio projects:

| File | Role |
|------|------|
| `layout.tsx` | Auth guard (password from `ADMIN_PASSWORD` env var) + ToastContainer |
| `page.tsx` | Dashboard — tab navigation (Blog \| Portfolio) with real-time CRUD |
| `components/Toast.tsx` | Toast notifications + `refreshData()` + `onDataRefresh()` event emitter |
| `components/TipTapEditor.tsx` | Rich text editor (bold, italic, heading, lists, link, image) |
| `posts/PostForm.tsx` | Shared create/edit form with TipTap + cover image upload |
| `posts/new/page.tsx` | Create new post |
| `posts/[id]/edit/page.tsx` | Edit existing post (uses `await params`) |
| `portfolio/page.tsx` | Portfolio dashboard with pagination (10 per page) |
| `portfolio/PortfolioForm.tsx` | Create/edit form with cover image, auto-generate num/slug/initials |
| `portfolio/new/page.tsx` | Create new project |
| `portfolio/[id]/edit/page.tsx` | Edit existing project (uses `await params`) |

### API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/admin/auth` | POST | Login/logout (cookie session) |
| `/api/blog/posts` | GET, POST, PUT, DELETE | CRUD for blog posts |
| `/api/blog/portfolio` | GET, POST, PUT, DELETE | CRUD for portfolio (supports `?page=` and `?per_page=`) |
| `/api/blog/upload` | POST | Image upload to Supabase Storage |

### Real-time CRUD System
All operations provide instant UI feedback:
1. Local state filter (`setProjects(prev.filter(...))`) — instant UI update
2. Toast notification via `showToast()`
3. `refreshData('portfolio')` event broadcast
4. `onDataRefresh()` subscribers reload from server
5. Homepage polls every 30 seconds for fresh data

Admin routes use `next/link` directly (not `@/src/i18n/navigation`) because they live outside `[locale]` tree.

### TipTap Editor Features
- Bold, italic, strikethrough, heading (h1-h3)
- Bullet list, ordered list, blockquote
- Code block, horizontal rule
- Link insertion with bubble bar
- Image upload (to Supabase Storage via `/api/blog/upload`)
- Dark theme matching Sundawa design (`#0E1E30` background, `#DBC977` accents)

---

## Sitemap & SEO

- `app/sitemap.ts` calls `getPostSlugs()` AND `getPortfolioProjects()` to generate both blog post and portfolio project URLs with `hreflang` alternates.
- `lib/Sitemap.ts` — pure URL generator helpers (tested in `lib/Sitemap.test.ts`).
- `lib/Seo.ts` — `pageMetadata()` generates Next.js `Metadata` objects with `alternates.languages` for all locales (tested in `lib/Seo.test.ts`).

---

## Supabase Query Guidelines

- Use Supabase client from `lib/supabase.ts` — never create new clients.
- Always select only needed fields.
- Sort posts by `published_at desc` for consistent ordering.
- Filter by `published_at.is_not.null` to exclude drafts.
- Use `.single()` for single post fetches by slug.

---

## Adding a New Content Type

1. Define the TypeScript interface in `lib/types.ts`.
2. Write a runtime type guard (`isMyType(data): data is MyType`).
3. Add unit tests in `lib/types.test.ts`.
4. Create the database table in Supabase (via SQL Editor or Studio).
5. Add the fetch function to the relevant `src/features/<feature>/data.ts`.
6. Create or update the rendering component in `src/features/<feature>/components/`.
7. If admin management is needed, add CRUD pages under `app/admin/`.
8. Add `refreshData()` call in form submit handlers for real-time sync.
9. Run `npm.cmd run check` — must pass before reporting done.

---

## Quality Gate

```powershell
npm.cmd run check   # lint + typecheck + test (6 suites, 17 tests)
```
