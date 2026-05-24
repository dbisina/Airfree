# Design System: Airfree Geospatial

This document is the authoritative reference for the visual and interaction design of the Airfree Geospatial website. Every design decision made here was deliberate. Read this before touching any component.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Tokens](#color-tokens)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Patterns](#component-patterns)
6. [Animation System](#animation-system)
7. [Responsive Strategy](#responsive-strategy)
8. [Anti-Patterns](#anti-patterns)

---

## Design Philosophy

The site is positioned as **institutional-grade**, not a startup or creative agency. The aesthetic should read like a top-tier engineering consultancy's annual report crossed with a premium architecture firm's portfolio. Every element earns its place.

**Three governing principles:**

1. **Restraint over decoration.** Whitespace is a design element. Empty space communicates confidence. Never fill space for the sake of filling it.

2. **Typographic hierarchy over visual hierarchy.** Headlines do the heavy lifting. We do not use gradients, loud colors, or complex illustrations. The editorial serif heading on a white background IS the design.

3. **Motion with physics.** Nothing animates linearly. Every transition uses a spring-like cubic-bezier that simulates physical mass. Blur+translate entry animations are the signature motion pattern across the whole site.

---

## Color Tokens

All color tokens are defined as CSS custom properties in `app/globals.css` inside the `@theme` block. Use Tailwind utility classes. Never hardcode hex values in components.

### Core Palette

| Token | Hex | Tailwind Class | Role |
|---|---|---|---|
| `--color-navy` | `#0A1628` | `text-navy`, `bg-navy` | Primary brand dark; used for nav backgrounds, section fills, headings on light |
| `--color-brand-blue` | `#4A86B8` | `text-brand-blue`, `bg-brand-blue` | Accent color for CTAs, active states, section labels, links |
| `--color-ink` | `#1A1A1A` | `text-ink` | Near-black body text on white backgrounds |
| `--color-ink-2` | `#5A5A5A` | `text-ink-2` | Secondary body text, descriptions, supporting copy |
| `--color-ink-3` | `#9A9A9A` | `text-ink-3` | Tertiary use: timestamps, placeholder text, mono labels |
| `--color-surface` | `#F7F6F3` | `bg-surface` | Warm off-white section backgrounds (alternating with white) |
| `--color-white` | `#FFFFFF` | `bg-white`, `text-white` | Pure white for cards, form inputs, high-contrast sections |

### Border Tokens

| Token | Usage | Tailwind Class |
|---|---|---|
| `--color-border-s` | Subtle hairline for card edges, list dividers | `border-border-s` |
| `--color-border-m` | Medium weight for input outlines, button borders on light bg | `border-border-m` |

### Section Color Strategy

Sections alternate to create rhythm without requiring imagery:

```
white → surface → navy → white → surface → navy
```

- **White** `bg-white`: primary content sections
- **Surface** `bg-surface`: secondary / supporting content, `#F7F6F3` warm off-white
- **Navy** `bg-navy`: high-contrast CTAs, sector lists, capability strips

Never place two white sections or two navy sections adjacent without a surface between them.

---

## Typography

### Font Families

The site uses four Google Fonts, all pre-loaded in `app/layout.tsx`:

| Family | CSS Class | Character |
|---|---|---|
| Playfair Display | `font-serif` | The default editorial serif. Bold headings feel authoritative, almost print-like. High contrast strokes. |
| Cormorant Garamond | `font-serif` (via CMS toggle) | Alternate heading serif. Thinner, more elegant and refined. Better for large display sizes. |
| Inter | `font-sans` | Default body sans. Clean, neutral, highly legible at all sizes. The workhorse. |
| Plus Jakarta Sans | `font-sans` (via CMS toggle) | Alternate body sans. Slightly more geometric and open than Inter. |
| IBM Plex Mono | `font-mono` | Used exclusively for labels, tags, nav links, numbers, index counters. Never for body copy. |

Both `font-serif` and `font-sans` are runtime-switchable via the CMS Typography tab. The `TypographyProvider` injects the selection as a CSS custom property on `:root`.

### Type Scale

The site uses `clamp()` for headings throughout to ensure fluid scaling across breakpoints. The minimum values are carefully set to avoid overflow on 280px fold cover screens.

| Element | Size | Notes |
|---|---|---|
| Hero h1 | `clamp(2.1rem, 8vw, 7rem)` | Massive on desktop, 2.1rem floor on tiny screens |
| Page hero h1 | `clamp(1.5rem, 5vw, 4rem)` | Interior page headers |
| Section h2 | `clamp(1.4rem, 3vw, 2.75rem)` | Main content headings |
| Service title | `clamp(1rem, 1.4vw, 1.2rem)` | List items |
| Body | `1rem` (= `18px` default, CMS-adjustable 15–22px) | Set on `html` element |
| Section label | `0.55rem` | Mono eyebrow text |
| Nav links | `0.56rem` (md) / `0.62rem` (lg) | Mono, tracking-heavy |
| Tags | `0.55rem` | Monospace, uppercase, tracked |

### Type Rules

- **Headings**: Always `font-serif` + appropriate `font-bold` or `font-semibold`. Leading `leading-[1.02]` to `leading-[1.08]` for display sizes.
- **Body**: `font-sans`, `leading-relaxed` (1.625), `text-ink-2` for supporting copy.
- **Labels/Tags**: `font-mono`, `uppercase`, `tracking-[0.18em]` to `tracking-[0.28em]`. Never bold.
- **Nav**: `font-mono` (set via `font-nav` token), `font-bold`, `tracking-[0.1em]` to `tracking-[0.16em]`.

### SectionLabel Component

The eyebrow label above major headings is `<SectionLabel>`. It renders as:

```
──  LABEL TEXT IN MONO CAPS
```

A `3px` horizontal line + `0.55rem` monospaced uppercase text in `text-brand-blue`. **No pill shape. No background. No rounded corners.** This was an explicit design decision: pill badges read as AI-generated UI.

Usage:
```tsx
<SectionLabel className="mb-5">Core Service Pillars</SectionLabel>
// On dark backgrounds:
<SectionLabel className="text-white/60 mb-5">Operational Focus</SectionLabel>
```

---

## Spacing & Layout

### Container

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-10 lg:px-24">
```

`max-w-7xl` = 1280px. Padding scales from 16px on mobile to 96px on large desktop. This generous side padding is intentional: content should never feel cramped against the viewport edge on large screens.

### Section Vertical Rhythm

Sections breathe heavily. Vertical padding:

- **Mobile**: `py-16` (64px top + bottom)
- **Tablet**: `sm:py-20` to `sm:py-28`
- **Desktop**: `md:py-36` (144px) for major sections

Never use less than `py-16` for a section. The whitespace IS the luxury.

### Grid System

Two-column grids use `gap-10 md:gap-14 lg:gap-24`. Three-column grids use `gap-8`. Always include `md:` variants so tablets do not fall back to single-column unless content genuinely requires it.

Common patterns:
```tsx
// 2-col: text + visual
<div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-24 items-center">

// 3-col: cards
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

// Numbered service list
<div className="grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[4rem_1fr_auto] gap-4 sm:gap-8">
```

### Section Alternation

Content sections alternate background colors for visual rhythm:
```
white → surface → navy → white
```

Never use a border or divider between sections. The background change IS the separator.

---

## Component Patterns

### Button

Three variants. All are `rounded-none` with `tracking-widest text-xs uppercase`. These are intentionally sharp. The squared edges match the architectural feel of the cards and grid lines.

```tsx
// Primary: blue fill, used for main CTAs
<Button href="/services" variant="primary">View Capabilities</Button>

// Ghost: transparent white border, used on dark/photo backgrounds
<Button href="/contact" variant="ghost">Get in Touch</Button>

// Outline: transparent with ink border, used in content sections
<Button href="/services" variant="outline" size="sm">View Service</Button>
```

**Sizing:**
- `md` (default): `px-7 py-3.5`
- `sm`: `px-5 py-2.5`

**Hover states:** `hover:-translate-y-[1px]`, a 1px lift. `active:scale-[0.98]` gives physical press feel. Easing: `cubic-bezier(0.32, 0.72, 0, 1)` always.

**On fold screens (<480px):** Hero CTAs use `max-[479px]:text-[0.5rem] max-[479px]:tracking-[0.06em] max-[479px]:px-4 max-[479px]:py-2.5` via `className` prop to prevent text wrapping.

### Card / Container

Cards use `border border-border-s`, a hairline border in `--color-border-s`. Never use box shadows on cards. Never use `rounded-lg` or larger. At most `rounded-[2px]` or nothing.

```tsx
// Standard card
<div className="border border-border-s bg-white p-5 sm:p-8">

// Surface card (on white bg)
<div className="border border-border-s bg-surface p-5 sm:p-8">
```

### Form Inputs

```tsx
const inputClass = 'w-full border border-border-s bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-brand-blue transition-colors';
```

Sharp corners, hairline border, focus shifts border to brand-blue. No shadow on focus. No `rounded-*`.

### Nav

The nav is a **floating glass pill** detached from the top edge:

```
fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl
```

- **Transparent state** (hero overlap): `bg-navy/15 border-white/[0.08] backdrop-blur-md`
- **Scrolled state**: `bg-white/90 border-black/[0.05] backdrop-blur-md shadow-[0_8px_32px_rgba(10,22,40,0.06)]`

Hamburger morphs to X via `rotate(45deg)` / `rotate(-45deg)` on the two outer lines. Middle line fades out (`opacity: 0`).

Mobile overlay: full-screen white panel, slides in from right via Framer Motion. Nav links use `font-serif text-xl sm:text-2xl font-light`, not the mono style of the desktop links.

Desktop links show at `md:` (768px) for iPad/tablet support.

### RevealOnScroll

All significant content uses scroll-triggered entry animations:

```tsx
<RevealOnScroll delay={0.07}>
  <YourContent />
</RevealOnScroll>
```

Animation: `opacity: 0 → 1`, `y: 24px → 0`, `filter: blur(4px) → blur(0)`, duration 0.7s, easing `[0.32, 0.72, 0, 1]`.

For list items: `delay={index * 0.07}` for staggered cascade.

Uses Framer Motion `whileInView` with `once: true` and `amount: 0.15` threshold (triggers when 15% of element is visible).

### HeroSlider

Full-screen (`h-screen`) auto-advancing slider. 5s interval. Crossfade via Framer Motion `AnimatePresence`.

- Content block limited to `max-w-4xl`
- Heading uses `\n` in CMS to force line breaks. Each line renders as a `display: block` span.
- Blue accent line animates in with `scaleX: 0 → 1` after heading
- Slide indicators: `w-4 h-[1px]` inactive → `w-10 h-[2px]` active, bottom-right corner
- Scroll indicator: vertical line gradient + "SCROLL" mono text, bottom-centre

### PageHero

Interior pages use `PageHero` with an `imageKey` prop. The component reads the CMS photo for that key and falls back to hardcoded Unsplash URLs.

```tsx
<PageHero
  label="Contact"
  title="Get in Touch"
  subtitle="Project enquiries..."
  imageKey="contact"
/>
```

Photo overlay: `bg-[rgba(10,22,40,0.72)]`, dark navy at 72% opacity over the image. Text always white.

---

## Animation System

### The Easing Curve

**One easing curve for everything:** `cubic-bezier(0.32, 0.72, 0, 1)`

This is an aggressive ease-out that starts fast and decelerates sharply, simulating physical deceleration (like a ball landing). It creates a sense of weight and precision.

```tsx
transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
```

Never use:
- `linear`: mechanical, lifeless
- `ease`: generic browser default
- `ease-in-out`: symmetric, boring
- Any spring/bounce effects: too playful for this brand

### Entry Animation Signature

Every element that enters the viewport uses:

| Property | From | To |
|---|---|---|
| `opacity` | `0` | `1` |
| `y` (translateY) | `24px` | `0` |
| `filter` | `blur(4px)` | `blur(0px)` |

Duration: `0.7s` for most elements, `0.8s` for hero heading.

### Staggering

List items, cards, and grid items stagger by `index * 0.07s`:

```tsx
{items.map((item, i) => (
  <RevealOnScroll key={item.id} delay={i * 0.07}>
```

### What to Animate

- **Animate:** opacity, transform (translate, scale, rotate), filter
- **Never animate:** top, left, width, height, padding, margin, border-width. These trigger layout reflow and kill performance.

### Nav Transition

The nav background state transition (transparent ↔ scrolled) uses `duration-700` for a silky feel rather than snapping.

---

## Responsive Strategy

### Breakpoints

| Name | px | Device |
|---|---|---|
| `xs` | 320 | Galaxy Fold cover, very small phones |
| `sm` | 640 | Phones |
| `md` | 768 | iPad mini, tablets, opened foldables |
| `lg` | 1024 | iPad Air landscape, small laptops |
| `xl` | 1280 | Desktop |

`xs` is a custom breakpoint defined in `globals.css @theme`. Standard Tailwind doesn't include it.

### Patterns

**Mobile-first always.** Write base styles for mobile, use `sm:`, `md:`, `lg:` to add width.

**Padding scale:**
```
px-4 sm:px-8 md:px-10 lg:px-24
```
Consistent across every section. Do not deviate.

**Grids fall back to single column on mobile:**
```tsx
grid grid-cols-1 md:grid-cols-2
grid grid-cols-1 md:grid-cols-3
```

**Fold screen text safety:** `clamp()` minimums must never exceed `~1.8rem` (28px) or text risks overflowing a 280px viewport. Test at 280px width.

**Never use `overflow-hidden` on a flex row that wraps**: it clips wrapped content. Use `overflow-x-hidden` on the page root only.

### Nav Responsive

| Viewport | Behaviour |
|---|---|
| < 768px | Hamburger only. Full-screen white overlay on open. |
| 768px–1023px | Desktop links visible, condensed spacing (`px-2`, `text-[0.56rem]`, `tracking-[0.1em]`). |
| 1024px+ | Full desktop nav, full spacing and tracking. |

---

## Anti-Patterns

Things that have been explicitly considered and rejected. Do not reintroduce them.

| Anti-pattern | Why it was removed |
|---|---|
| Pill-shaped `SectionLabel` with dot | Reads as AI-generated UI ("an AI trait") |
| `rounded-full` buttons | Not consistent with the sharp architectural brand |
| `box-shadow` on cards | Adds visual noise. Hairline borders are cleaner. |
| `ease-in-out` transitions | Generic. All motion uses the custom cubic-bezier. |
| `backdrop-blur` on scrolling content | Continuous GPU repaint; kills mobile performance |
| `linear` animations | Mechanical. Never used. |
| `position: fixed; top: 0` full-width navbar | Replaced with floating pill nav (detached from edge) |
| `Inter` as `font-serif` | Wrong semantic. Inter is `font-sans` only. |
| Inline `style={{ fontSize: 'X' }}` for heading sizes | Prefer `clamp()` in inline style only when Tailwind can't express it, never hardcode px values for type scale |
| Nav links showing only at `lg:` | Broken tablet/iPad experience. Use `md:` instead. |
| `grid-cols-2 lg:grid-cols-2` (skipping `md:`) | Tablets get single-column fallback. Use `md:grid-cols-2`. |
| Hardcoded phone numbers, emails in components | Always read from `lib/constants.ts` or CMS |
| `window.addEventListener('scroll', ...)` for scroll animations | Causes continuous reflow. Use Framer Motion `whileInView`. |

---

## File Ownership

| File | Owns |
|---|---|
| `app/globals.css` | All CSS custom properties, color tokens, breakpoints, scrollbar reset, base font size |
| `lib/constants.ts` | Navigation structure, service definitions, site-level constants |
| `lib/cms-store.ts` | CMS content shape (interface) and all default content values |
| `components/ui/Button.tsx` | All button variants and sizes |
| `components/ui/SectionLabel.tsx` | Eyebrow label appearance |
| `components/ui/RevealOnScroll.tsx` | Scroll entry animation configuration |
| `lib/TypographyProvider.tsx` | Runtime font family and base size injection |

Changes to these files affect the entire site. Always check blast radius before editing.
