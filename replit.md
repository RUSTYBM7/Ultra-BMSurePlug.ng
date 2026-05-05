# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Two linked products:
1. **BM SocialMedia Hub** — SMM panel at `/smm/` (artifacts/smm-site)
2. **BMVoicePlug Voice Studio** — AI voice platform at `/voice-studio/` (artifacts/voice-studio)
3. **API Server** — Express backend at port 8080 (artifacts/api-server)

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **Auth**: Replit OIDC (openid-client), sessions in PostgreSQL
- **Build**: esbuild (CJS bundle)
- **Frontend**: React 19, Vite, Tailwind CSS, shadcn/ui, Framer Motion

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## BM SocialMedia Hub (artifacts/smm-site)

### Routes
- `/smm/` — Home page (hero, stats, platform grid)
- `/smm/services` — Full service catalog (3,746+ services, TheOwlet-style table)
- `/smm/plans` — Subscription plans
- `/smm/marketplace` — Marketplace
- `/smm/dashboard` — Personalized user dashboard (auth-gated, shows orders/balance)
- `/smm/reseller` — Reseller program
- `/smm/giveaway` — Daily giveaway
- `/smm/posters` — Promo poster gallery
- `/smm/admin` — Admin control panel (password: bmsocial2025 — CHANGE THIS)

### Key Files
- `src/data/services-catalog.ts` — 400+ named services, representing 3,746 total across 20+ platforms
- `src/pages/services.tsx` — TheOwlet-style table layout with sidebar filters, pagination, inline order panel
- `src/pages/dashboard.tsx` — Personalized dashboard with Overview/Orders/New Order tabs
- `src/pages/admin.tsx` — Admin panel with Overview/Orders/Users/Services/Settings tabs
- `src/components/layout.tsx` — Main layout with enlarged logo (h-14), ticker, promo bar, full nav
- `src/components/promo-banner.tsx` — FloatingPromoBanner (appears after 8s), PagePromoBanner (dismissible), SidebarPosterWidget
- `src/App.tsx` — Router with all routes including /admin

### Assets
- Logo: `7cc9b635-a649...png` (imported as logoImg in layout.tsx)
- Posters: IMG_1148 (red newspaper), IMG_1147 (BMSureplug newspaper), IMG_1146 (pink creator), IMG_1071 (brand builder)
- All from `attached_assets/` via `@assets` alias

### Branding
- Primary color: `hsl(21 100% 52%)` (orange)
- Dark background, dark theme forced

## BMVoicePlug Voice Studio (artifacts/voice-studio)

### Routes
- `/voice-studio/` — Home
- `/voice-studio/studio` — Text to Speech
- `/voice-studio/voices` — Voice library (91 voices seeded)
- `/voice-studio/clone` — Voice cloning
- `/voice-studio/pricing` — Pricing with Paystack integration
- `/voice-studio/history` — Generation history
- Plus: speech-to-speech, voice-design, sound-effects, dubbing, projects, etc.

### Paystack Integration
- `VITE_PAYSTACK_PUBLIC_KEY` env var needed for payments to go live
- Uses `PaystackPop.setup()` inline iframe payment
- Credit packs and subscription plans both have "Buy Now" / "Pay ₦X" buttons

### Key Files
- `src/pages/pricing.tsx` — Full pricing page with Paystack payment buttons
- `src/components/layout.tsx` — Dark theme, cross-links to SMM Hub

## API Server (artifacts/api-server)

### Routes
- `GET /api/auth/user` — Current user
- `GET /api/login` — Replit OIDC login
- `GET /api/callback` — OIDC callback
- `GET /api/logout` — Logout
- `GET /api/voice/voices` — All voices
- `GET /api/voice/pricing` — Pricing plans + credit packs
- `GET /api/voice/credits` — User credits
- `GET /api/orders` — User's orders
- `POST /api/orders` — Place new order
- `GET /api/user/balance` — User wallet balance
- `POST /api/user/fund` — Fund wallet (Paystack callback)
- `GET /api/admin/stats` — Admin stats
- `GET /api/admin/orders` — All orders

## Deployment (Vercel)

- `vercel.json` at root for combined build
- `artifacts/smm-site/vercel.json` — SMM site standalone deployment
- `artifacts/voice-studio/vercel.json` — Voice studio standalone deployment
- Required env vars for Vercel:
  - `DATABASE_URL` — PostgreSQL connection string
  - `REPL_ID` — Replit app ID (for OIDC auth)
  - `REPL_SLUG` — Replit slug
  - `REPL_OWNER` — Replit owner
  - `VITE_PAYSTACK_PUBLIC_KEY` — Paystack public key
  - `PAYSTACK_SECRET_KEY` — Paystack secret key (for webhook verification)

## Admin Panel

- URL: `/smm/admin`
- Password: `bmsocial2025` (hardcoded in admin.tsx — change before going live)
- Tabs: Overview, Orders, Users, Services, Settings

## Important Notes

- Do NOT re-run `/api/seed/voices` — it will delete non-cloned voices
- Voice Studio branding: BMVoicePlug / BMSureplug Voice Studio
- SMM Hub branding: BM SocialMedia Hub / bmsureplug.online
- Both sites cross-link each other
- Services catalog: TheOwlet-style with ID, Name, Tier, Category, Min, Max, Rate/1K
- Ticker at top of SMM site: animated marquee with promotional text
- Float promo banner appears 8 seconds after page load (dismissed per-session)
