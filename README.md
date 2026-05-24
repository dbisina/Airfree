# Airfree Geospatial: Next.js Website

Enterprise geospatial consultancy website built with Next.js 15, Tailwind CSS v4, Framer Motion, and a custom CMS backed by Upstash Redis.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Project Structure](#project-structure)
6. [CMS System](#cms-system)
7. [Pages & Routes](#pages--routes)
8. [Fonts & Typography](#fonts--typography)
9. [Responsive Strategy](#responsive-strategy)
10. [Deployment](#deployment)
11. [Contributing](#contributing)

---

## Project Overview

A high-end marketing and capability website for **Airfree Geospatial Pty Ltd** (ABN 698 093 239), an Australian enterprise geospatial consultancy headquartered in Adelaide with offices in Perth and Melbourne.

The site presents seven service domains, office locations, and a full capability showcase. A custom CMS at `/admin` allows non-technical staff to edit hero slides, page photos, company info, typography settings, and office addresses. Changes save to Upstash Redis and reflect live across all devices.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Animation | Framer Motion |
| Fonts | Google Fonts via `next/font/google` |
| CMS Storage | Upstash Redis (REST API) |
| Client State | `localStorage` (same-browser preview) |
| Deployment | Vercel (recommended) |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- An Upstash Redis database (free tier works). See [Environment Variables](#environment-variables).

### Install

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

Create a `.env.local` file in this directory:

```env
# Upstash Redis: required for cross-device CMS persistence
# Get these from https://console.upstash.com → create Redis DB → REST API tab
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

**Without these vars:** The CMS still works locally (changes save to `localStorage`), but will not persist across different browsers or devices.

A template is at `.env.example`.

---

## Project Structure

```
Airfree/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts loaded, SiteChrome mounted
│   ├── globals.css               # Tailwind v4 config, design tokens, scrollbar reset
│   ├── page.tsx                  # Homepage
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx              # Services index (all 7)
│   │   └── [slug]/
│   │       └── page.tsx          # Individual service page
│   ├── contact/
│   │   ├── page.tsx              # Thin wrapper (metadata export only)
│   │   └── ContactClient.tsx     # Client component with useCMS()
│   ├── admin/
│   │   ├── layout.tsx            # Admin-only layout (no Nav/Footer)
│   │   └── page.tsx              # Full CMS admin panel
│   └── api/
│       └── cms/
│           ├── route.ts          # GET fetch live / POST save + version
│           ├── history/
│           │   └── route.ts      # GET last 20 versions
│           └── revert/
│               └── route.ts      # POST restore a version by timestamp
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx               # Floating glass navbar, hamburger→X, dropdown
│   │   ├── Footer.tsx            # CMS-driven footer (reads useCMS)
│   │   └── SiteChrome.tsx        # Conditionally wraps Nav + Footer (hidden on /admin)
│   ├── sections/
│   │   ├── HeroSlider.tsx        # Full-screen hero, auto-advancing slides, CMS-driven
│   │   └── PageHero.tsx          # Interior page hero (photo bg + title, CMS photo)
│   └── ui/
│       ├── Button.tsx            # Primary / Ghost / Outline pill buttons
│       ├── RevealOnScroll.tsx    # Framer Motion whileInView fade+blur entry animation
│       └── SectionLabel.tsx      # Short horizontal line + mono-caps eyebrow text
│
├── lib/
│   ├── cms-store.ts              # CMSContent interface, CMS_DEFAULTS, readCMS()
│   ├── useCMS.ts                 # Hook: fetches Redis, falls back to localStorage
│   ├── redis.ts                  # Upstash Redis client + key/history constants
│   ├── TypographyProvider.tsx    # Injects font CSS vars from CMS typography settings
│   └── constants.ts              # NAV_LINKS, SERVICES array, SITE_* constants
│
├── public/
│   └── images/
│       └── logo.png              # Primary logo (Nav + Footer)
│
├── .env.example
├── .env.local                    # NOT committed: your Redis keys go here
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## CMS System

### Architecture

```
Admin edits in /admin
       │
       ├─→ localStorage (instant)
       │        └─→ storage event fires → same-browser preview updates
       │
       └─→ POST /api/cms (1.5s debounce)
                └─→ Upstash Redis (source of truth for all devices)
                         └─→ Public pages fetch on mount via useCMS()
```

### Admin Panel (`/admin`)

Split-screen interface:

- **Left half:** sidebar navigation + scrollable content editor
- **Right half:** live device mockups (CSS laptop + phone, both with scrollable iframes)

Changes auto-save to localStorage instantly and to Redis after 1.5 seconds of inactivity. The device previews reload 900ms after the last edit.

**Editable sections:**

| Tab | Controls |
|---|---|
| Company Info | Name, ABN, tagline, email, phone |
| Hero Slides | Photo, label, heading (use `\n` for line break), body, CTA labels. Add / remove / reorder slides. |
| Page Photos | Hero background image URL for each page (about, services, contact, etc.) |
| About Section | Heading, tagline, body, photo |
| Locations | Address lines for Adelaide, Perth, Melbourne |
| Footer | Brand tagline, description paragraph, copyright entity |
| Typography | Body font size slider (15–22px), heading font picker, body font picker |

### API Routes

| Route | Method | Description |
|---|---|---|
| `/api/cms` | `GET` | Live content from Redis. Falls back to `CMS_DEFAULTS` if Redis unavailable. |
| `/api/cms` | `POST` | Save content + append versioned history entry. Trims history to 20 entries. |
| `/api/cms/history` | `GET` | Returns last 20 versions newest-first. |
| `/api/cms/revert` | `POST` | Restores a version by timestamp. Adds "Reverted to…" history entry. |

### Version History

Stored in a Redis sorted set (`airfree:cms:history`). Score = Unix timestamp. Every save appends an entry; `ZREMRANGEBYRANK` keeps the latest 20. Reverting creates a new entry rather than mutating history, preserving the full audit trail.

### How Public Pages Get CMS Data

All public CMS-aware components use `useCMS()` from `lib/useCMS.ts`:

1. Mount with `CMS_DEFAULTS` (SSR-safe, no hydration flash)
2. On client mount: `fetch('/api/cms', { cache: 'no-store' })` → Redis data
3. If fetch fails (Redis not configured): fall back to `readCMS()` (localStorage → `CMS_DEFAULTS`)
4. Listen to `storage` events for real-time same-browser admin preview

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage: hero slider, capability strip, photo panels, service pillars list, about section, sector list, full-bleed CTA |
| `/about` | Mission statement, three operating principles, sectors served |
| `/services` | All 7 services listed with tags and "View Service" links |
| `/services/gis-spatial` | Enterprise GIS & Spatial Infrastructure |
| `/services/digital-mapping` | Digital Mapping & Web GIS Platforms |
| `/services/drone-photogrammetry` | Drone, Photogrammetry & 3D Spatial Engineering |
| `/services/remote-sensing` | Remote Sensing & Satellite Analytics |
| `/services/infrastructure-utility` | Infrastructure & Utility Spatial Systems |
| `/services/survey-data` | Survey Data QA/QC & Spatial Standards |
| `/services/environmental` | Environmental & Ecological Geospatial Analytics |
| `/contact` | Project enquiry form, direct contact details, office maps (OpenStreetMap), capability statement CTA |
| `/admin` | CMS admin panel (no public Nav/Footer) |

---

## Fonts & Typography

Loaded in `app/layout.tsx` via `next/font/google`. All four families are pre-loaded and exposed as CSS custom properties on `<html>`:

| CSS Variable | Font | Role |
|---|---|---|
| `--font-playfair` | Playfair Display | Default heading serif, editorial and authoritative |
| `--font-cormorant` | Cormorant Garamond | Alternate heading serif, elegant and refined |
| `--font-inter` | Inter | Default body sans, clean and highly legible |
| `--font-jakarta` | Plus Jakarta Sans | Alternate body sans, geometric and open |
| `--font-ibm-plex` | IBM Plex Mono | Monospace for labels, tags, numbers, nav links |

**Runtime injection via `TypographyProvider`** (mounted in `SiteChrome`, applies on both public and admin):

```css
html { font-size: <body_size>px; }         /* 15–22px, CMS-controlled */
:root {
  --font-serif: var(--font-playfair);       /* or --font-cormorant */
  --font-sans:  var(--font-inter);          /* or --font-jakarta   */
}
```

Tailwind's `font-serif` and `font-sans` utilities inherit these variables automatically.

---

## Responsive Strategy

### Breakpoints

Defined in `app/globals.css` inside `@theme`:

| Token | Width | Primary target |
|---|---|---|
| `xs` | 320px | Galaxy Fold cover screen, very small phones |
| `sm` | 640px | Standard large phones |
| `md` | 768px | iPad mini, Galaxy Tab, opened foldables |
| `lg` | 1024px | iPad Air landscape, small laptops |
| `xl` | 1280px | Standard desktop |
| `2xl` | 1536px | Wide desktop |

### Key Patterns

**Navigation:** Desktop links visible at `md:` (768px+). Below that, hamburger-only with full-screen overlay.

**Padding scale:** `px-4 sm:px-8 md:px-10 lg:px-24`, consistent across all sections.

**Hero heading clamp:** `clamp(2.1rem, 8vw, 7rem)`. The 2.1rem floor ensures readability on 280px fold cover screens.

**Hero CTA buttons on fold screens:** `max-[479px]:text-[0.5rem] max-[479px]:tracking-[0.06em] max-[479px]:px-4 max-[479px]:py-2.5`. Tight type prevents wrapping.

**Two-column grids:** Use `md:grid-cols-2` not `lg:grid-cols-2` wherever possible so tablets get the intended side-by-side layout.

**Global scrollbar reset:**
```css
::-webkit-scrollbar { width: 0; height: 0; }
* { scrollbar-width: none; -ms-overflow-style: none; }
```

---

## Deployment

### Vercel

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Set environment variables in the Vercel dashboard:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Deploy. Vercel auto-detects Next.js, no additional config needed.

### Other Node Hosts

```bash
npm run build
npm run start   # requires Node 20+ and the two env vars
```

---

## Contributing

### Rules

- **TypeScript strict:** no `any` without explicit inline justification comment
- **Never commit to `main`:** always branch + PR
- **Never commit `.env.local`:** credentials must stay out of git
- **Read before editing:** understand the component fully before changing it
- **Minimal diffs:** change only what is necessary

### Adding a New Page

1. Create `app/<slug>/page.tsx` with `export const metadata` and a default export
2. If it appears in the nav: add to `NAV_LINKS` in `lib/constants.ts`
3. Use `<PageHero imageKey="...">` for the header. It automatically reads the CMS photo.
4. Add the new `imageKey` to both `CMSContent['page_photos']` in `lib/cms-store.ts` and the admin `CMSContent` type in `app/admin/page.tsx`
5. Wrap content sections with `<RevealOnScroll>` for scroll entry animations

### Adding a New Service

1. Add an entry to `SERVICES` in `lib/constants.ts` with `slug`, `number`, `title`, `shortTitle`, `description`, `tags`
2. Add the detailed service data to `SERVICE_DATA` in `app/services/[slug]/page.tsx`
3. Both the listing page and dynamic route pull from these arrays automatically

### Extending the CMS

To add a new CMS-editable field:

1. Add the field to `CMSContent` interface in `lib/cms-store.ts`
2. Add its default value to `CMS_DEFAULTS` in the same file
3. Mirror the change in the local `CMSContent` type and `DEFAULTS` in `app/admin/page.tsx`
4. Add a form field in the appropriate admin section component
5. Consume via `useCMS()` in your public component

### Animation Conventions

- Entry: `opacity: 0 → 1`, `y: 24 → 0`, `filter: blur(4px) → blur(0px)`, duration 0.7s
- Easing: `cubic-bezier(0.32, 0.72, 0, 1)` everywhere. Never use `linear` or `ease-in-out`.
- Stagger: `delay={index * 0.07}` for list items
- Never animate `top`, `left`, `width`, or `height`. Use only `transform` and `opacity`.

---

## Licence

Proprietary. Airfree Geospatial Pty Ltd. All rights reserved.
