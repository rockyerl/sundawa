## Sundawa Web

Next.js App Router application for Sundawa Teknologi. Feature code lives under `src/features`, shared UI under `src/shared/ui`, and routes under `app/[locale]`.

## Setup

Install dependencies and copy the environment template:

```bash
npm install
cp .env.example .env.local
```

Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local` before running the application. The Sanity client fails fast when either value is missing.

## Commands

```bash
npm run dev       # local development
npm run check     # lint, typecheck, and unit tests
npm run build     # production build
npm run start     # serve the production build
```

Pull requests and pushes to `main` or `master` run the same checks through `.github/workflows/ci.yml`.

## Architecture

- `app/[locale]`: locale-aware routes and route boundaries.
- `src/features/<name>`: domain components, data access, and public feature exports.
- `src/shared/ui`: cross-feature shell and UI components.
- `lib`: Sanity client, validated content types, SEO helpers, and query definitions.
- `messages`: Indonesian and English translations; keep keys synchronized.

The sections below are the original Next.js starter notes.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
