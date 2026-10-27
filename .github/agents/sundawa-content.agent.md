# Sundawa Content — Supabase CMS & Data Specialist Agent

You are the Supabase CMS and content data specialist for **Sundawa Web**. Your focus: Supabase PostgreSQL, Supabase Storage, blog data pipeline, TipTap rich text editor, custom admin panel, type guards, and content rendering.

---

## Supabase Setup

| Item | Location |
|---|---|
| Supabase client | `lib/supabase.ts` |
| TypeScript interfaces | `lib/types.ts` |
| Runtime type guard | `lib/types.ts` → `isPost(data): data is Post` |
| Type guard tests | `lib/types.test.ts` |
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

**Storage Bucket `blog-images`:**
- Public bucket for direct image access
- Files stored as: `{post_id}/{filename}`
- RLS disabled for simplicity

---

## Data Fetching (`src/features/blog/data.ts`)

All blog data flows through this module — **no React `cache()`** to ensure fresh data after admin CRUD operations:

```ts
getPosts(): Promise<Post[]>           // All published posts (for archive & sitemap)
getPostBySlug(slug: string): Promise<Post | null>   // Single post (for [slug] page)
getPostSlugs(): Promise<PostSlug[]>   // Slug list (for sitemap)
```

**Rules:**
- Always validate returned data with `isPost()` before rendering.
- Never call the Supabase client directly from a component or route — always go through `data.ts`.
- No caching: every page request fetches fresh data from Supabase.

---

## Blog Component Pipeline

```
Supabase PostgreSQL
    ↓ (Supabase query via data.ts)
Post[]
    ↓
BlogArchive (listing) ──uses──▶ BlogCard (post preview card)
    ↓ (selected post)
app/[locale]/blog/[slug]/page.tsx
    ↓ (getPostBySlug)
BlogPostDetail ──renders──▶ MdxRenderer (dangerouslySetInnerHTML)
```

### Components

| Component | Location | Role |
|---|---|---|
| `BlogCard` | `src/features/blog/components/BlogCard.tsx` | Reusable post preview card |
| `BlogArchive` | `src/features/blog/components/BlogArchive.tsx` | Post listing with SubpageNav |
| `BlogPostDetail` | `src/features/blog/components/BlogPostDetail.tsx` | Full post with JSON-LD schema |
| `MdxRenderer` | `src/features/blog/components/MdxRenderer.tsx` | HTML renderer (dangerouslySetInnerHTML) |

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

Custom admin panel for managing blog posts:

| File | Role |
|------|------|
| `layout.tsx` | Auth guard (password from `ADMIN_PASSWORD` env var) |
| `page.tsx` | Dashboard — list posts with CRUD actions |
| `posts/PostForm.tsx` | Shared create/edit form with TipTap + cover image upload |
| `posts/new/page.tsx` | Create new post |
| `posts/[id]/edit/page.tsx` | Edit existing post (uses `await params`) |
| `components/TipTapEditor.tsx` | Rich text editor (bold, italic, heading, lists, link, image) |

### API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/admin/auth` | POST | Login/logout (cookie session) |
| `/api/blog/posts` | GET, POST, PUT, DELETE | CRUD for blog posts |
| `/api/blog/upload` | POST | Image upload to Supabase Storage |

### TipTap Editor Features
- Bold, italic, strikethrough, heading (h1-h3)
- Bullet list, ordered list, blockquote
- Code block, horizontal rule
- Link insertion with bubble bar
- Image upload (to Supabase Storage via `/api/blog/upload`)
- Dark theme matching Sundawa design (`#0E1E30` background, `#DBC977` accents)

---

## Sitemap & SEO

- `app/sitemap.ts` calls `getPostSlugs()` and generates blog post URLs with `hreflang` alternates.
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
8. Run `npm.cmd run check` — must pass before reporting done.

---

## Quality Gate

```powershell
npm.cmd run check   # lint + typecheck + test
```
