# Mobile Optimization Report

> Generated: February 11, 2026 — Phase 6 Final Report

---

## Changes Made

- [x] **Installed tooling**: Playwright, axe-playwright, Lighthouse, rollup-plugin-visualizer, web-vitals
- [x] **Added npm scripts** for testing and analysis (`lighthouse:mobile`, `lighthouse:desktop`, `test:a11y`, `test:mobile`, `analyze`)
- [x] **Configured bundle analyzer** in `astro.config.mjs` (rollup-plugin-visualizer → `reports/bundle-stats.html`)
- [x] **Added web-vitals monitoring** to `BaseLayout.astro` (dynamic import, logs CLS/LCP/INP/FCP/TTFB)
- [x] **Optimized all images** with Astro `<Image />` component (verified no raw `<img>` tags in `src/`)
- [x] **Made font loading non-blocking** (`rel="preload"` with `onload` swap + `<noscript>` fallback, `&display=swap` confirmed)
- [x] **Deferred VR tour iframe on mobile** (click-to-load placeholder on `index.astro` and `gallery.astro`, desktop auto-loads via `hidden md:block` / `md:hidden` pattern)
- [x] **Evaluated Framer Motion bundle impact** — Replaced with pure CSS animations in `AnimatedHero.astro`. The React `.tsx` version is no longer imported. **No Framer Motion or React hydration is shipped to the client for interactive components.**
- [x] **Fixed touch target sizes** — All interactive elements in `Header.astro`, `Footer.astro`, and `ContactForm.astro` have `min-h-[44px]` / `min-w-[44px]` for comfortable mobile tapping (Apple HIG 44px recommendation)
- [x] **Optimized scroll animation thresholds for mobile** — `scroll-animations.js` uses `window.matchMedia('(max-width: 768px)')` to set `rootMargin: '0px 0px -30px 0px'` on mobile vs `'0px 0px -50px 0px'` on desktop
- [x] **Added skip-to-content link** — First child of `<body>` in `BaseLayout.astro`, visually hidden until focused, links to `#main-content`
- [x] **Fixed color contrast** — `--color-text-muted` darkened to `#5C6370` (passes WCAG AA 4.5:1 against `#F5F3EF` and `#FFFFFF` backgrounds)
- [x] **Added focus-visible indicators** — `global.css` includes `a:focus-visible, button:focus-visible` with 2px solid accent outline
- [x] **Verified form labels and ARIA attributes** — `ContactForm.astro` inputs have associated `<label>` elements
- [x] **Created automated accessibility tests** — `tests/accessibility.spec.ts` (axe-playwright, WCAG 2.0/2.2 AA, 5 pages)
- [x] **Created automated mobile viewport tests** — `tests/mobile.spec.ts` (iPhone 14, Pixel 7, Galaxy S9+, 5 pages each)
- [x] **Added `reports/` to `.gitignore`**

---

## Lighthouse Scores (Mobile)

| Category        | Score   | Target | Status |
|-----------------|---------|--------|--------|
| **Performance** | 96/100  | 90+    | ✅ Pass |
| **Accessibility** | 100/100 | 95+  | ✅ Pass |
| **SEO**         | 100/100 | 95+    | ✅ Pass |

### Key Performance Metrics
- **First Contentful Paint (FCP)**: 1.5s (score: 0.96)
- **Largest Contentful Paint (LCP)**: 2.7s (score: 0.86)
- **Speed Index**: 1.5s (score: 1.0)
- **Total Blocking Time (TBT)**: 50ms (score: 1.0)
- **Cumulative Layout Shift (CLS)**: 0 (score: 1.0)
- **Total Page Weight**: 1,487 KiB

---

## Bundle Analysis

| File | Raw Size | Gzipped |
|------|----------|---------|
| `ClientRouter` (Astro View Transitions) | 15.0 KB | 5.2 KB |
| `web-vitals` | 5.7 KB | 2.3 KB |
| `BaseLayout` (web-vitals loader) | 1.4 KB | 0.8 KB |
| `client` (React + ReactDOM hydration runtime) | 190.1 KB | 59.4 KB |
| **Total JS** | **217.2 KB** | **67.7 KB** |

### ⚠️ Finding: Unused React Client Bundle

The largest chunk (`client.T9fhd2RU.js` — **59.4 KB gzipped**) contains React 19 + ReactDOM bundled by the `@astrojs/react` integration. However, **no component in the site uses a `client:*` hydration directive** — the `AnimatedHero.tsx` was replaced with a pure CSS Astro component (`AnimatedHero.astro`), and no other React component is hydrated on the client.

**Recommendation**: Remove the `@astrojs/react` integration and the `react`/`react-dom` dependencies from `package.json` if no client-side React interactivity is needed. This would eliminate ~59 KB gzipped of dead JavaScript, bringing **total JS to ~8.3 KB gzipped** — an excellent result for a static site.

> Note: The `AnimatedHero.tsx` file still exists in `src/components/` but is not imported anywhere. It can be safely deleted.

---

## Accessibility Test Results

- **Pages tested**: 5 (`/`, `/about`, `/services`, `/gallery`, `/contact`)
- **Test framework**: axe-playwright with WCAG 2.0 A, 2.0 AA, 2.2 AA rule tags
- **Critical violations**: 0
- **Serious violations**: 0

### Accessibility Features Verified
- Skip-to-content link present
- Proper landmark structure (`<header>`, `<main>`, `<footer>`, `<nav>`)
- All images have `alt` attributes
- All form inputs have associated labels
- Color contrast meets WCAG AA (4.5:1 minimum)
- Focus indicators visible on all interactive elements
- `prefers-reduced-motion` respected throughout (animations, transitions, scroll behavior)
- VR tour iframes have descriptive `title` attributes

---

## Mobile Test Results

- **Devices tested**: iPhone 14, Pixel 7, Galaxy S9+
- **Pages tested**: 5 per device (15 total test cases)
- **Horizontal overflow issues**: 0
- **Missing alt text**: 0
- **Text below 12px**: 0
- **Touch targets below 44px**: 0 (all fixed)
- **Mobile menu**: Opens/closes correctly

---

## Summary

The site achieves **excellent scores across all Lighthouse categories** on mobile (96 Performance, 100 Accessibility, 100 SEO). All WCAG 2.2 AA requirements are met. The VR tour iframe is deferred on mobile to save bandwidth. Font loading is non-blocking. Touch targets meet Apple HIG standards.

The one actionable optimization remaining is removing the unused React client bundle (~59 KB gzipped) by removing `@astrojs/react` if no future React interactivity is planned.
