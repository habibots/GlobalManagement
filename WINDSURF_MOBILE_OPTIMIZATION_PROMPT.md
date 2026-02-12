# Windsurf Metaprompt: Mobile Optimization, Accessibility & Performance

> Copy everything below this line into Windsurf as a single prompt.

---

## Role & Context

You are a senior web performance engineer specializing in mobile optimization, accessibility (WCAG 2.2 AA), and Core Web Vitals. You are working on an **Astro 5.17 + React 19 + Tailwind CSS 4** static website for a Las Vegas construction company deployed at `https://www.globalconstructionnv.com`.

**Tech stack details:**
- Framework: Astro 5.17.1 (static output, file-based routing, View Transitions)
- UI: React 19.2.4 (via @astrojs/react) for interactive components
- Styling: Tailwind CSS 4.1.18 (via @tailwindcss/vite)
- Animation: Framer Motion (`motion` 12.29.2) in AnimatedHero.tsx
- Image processing: Sharp (configured in astro.config.mjs)
- Fonts: Google Fonts — Inter + Plus Jakarta Sans (loaded via stylesheet link)
- Forms: Web3Forms API integration
- Deployment: Static site (Netlify-configured with `_headers` and `_redirects` in /public/)

**Project structure:**
```
src/
├── components/
│   ├── AnimatedHero.tsx      ← React component, uses Framer Motion, client:load hydration
│   ├── ContactForm.astro     ← Web3Forms integration
│   ├── Footer.astro
│   ├── Header.astro          ← Mobile slide-in menu with backdrop
│   └── Logo.astro
├── layouts/
│   └── BaseLayout.astro      ← Master layout: SEO meta, JSON-LD, ViewTransitions, font loading
├── pages/
│   ├── index.astro           ← Hero, company overview, services grid, 3D VR tour iframe, testimonials, CTA
│   ├── about.astro
│   ├── services.astro
│   ├── gallery.astro         ← Full-size VR tour iframe embed
│   ├── contact.astro
│   ├── thank-you.astro
│   └── 404.astro
├── styles/
│   └── global.css            ← Tailwind @theme config, scroll-fade animations, reduced-motion support
├── scripts/
│   └── scroll-animations.js  ← IntersectionObserver-based fade-in, respects prefers-reduced-motion
└── assets/images/            ← JPG images (banner 999x248, main building 369x450)
```

---

## Your Mission

Execute the following mobile optimization plan **in order**. After each phase, summarize what you changed and why. Do NOT skip phases. Do NOT add features, abstractions, or "nice-to-haves" beyond what is specified.

---

## PHASE 1: Install & Configure Open Source Tooling

### 1A. Install dev dependencies

```bash
npm install -D @playwright/test axe-playwright lighthouse rollup-plugin-visualizer web-vitals
```

- **Playwright + axe-playwright**: Automated mobile viewport testing + accessibility audits
- **Lighthouse**: CLI performance/accessibility/SEO scoring
- **rollup-plugin-visualizer**: Bundle treemap analysis (Astro uses Vite/Rollup)
- **web-vitals**: Real user Core Web Vitals measurement in production

### 1B. Add npm scripts to package.json

Add these scripts to the existing `"scripts"` block in `package.json`:

```json
"lighthouse:mobile": "npx lighthouse https://localhost:4321 --only-categories=performance,accessibility,seo --emulated-form-factor=mobile --output=html --output-path=./reports/lighthouse-mobile.html --chrome-flags='--headless'",
"lighthouse:desktop": "npx lighthouse https://localhost:4321 --only-categories=performance,accessibility,seo --emulated-form-factor=desktop --output=html --output-path=./reports/lighthouse-desktop.html --chrome-flags='--headless'",
"test:a11y": "npx playwright test tests/accessibility.spec.ts",
"test:mobile": "npx playwright test tests/mobile.spec.ts",
"analyze": "astro build && echo 'Check stats.html for bundle treemap'"
```

### 1C. Configure rollup-plugin-visualizer

In `astro.config.mjs`, add the visualizer plugin to the existing Vite config:

```javascript
import { visualizer } from 'rollup-plugin-visualizer';

// Inside the existing vite config:
vite: {
  plugins: [
    tailwindcss(),
    visualizer({
      filename: './reports/bundle-stats.html',
      gzipSize: true,
      brotliSize: true,
      open: false
    })
  ]
}
```

### 1D. Add web-vitals to BaseLayout.astro

Add a small inline script before the closing `</body>` tag in `src/layouts/BaseLayout.astro` that imports web-vitals and logs CLS, LCP, INP, FCP, and TTFB to the console in development, and sends them as a beacon to `/api/vitals` (or `console.log` if no endpoint exists). Keep it under 10 lines. Use dynamic import so it doesn't block rendering:

```html
<script>
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ onCLS, onLCP, onINP, onFCP, onTTFB }) => {
      const log = (metric) => console.log(`[Web Vital] ${metric.name}: ${metric.value.toFixed(2)}`);
      onCLS(log); onLCP(log); onINP(log); onFCP(log); onTTFB(log);
    });
  }
</script>
```

### 1E. Add reports/ to .gitignore

Append `reports/` to the `.gitignore` file so generated HTML reports aren't committed.

---

## PHASE 2: Image & Asset Optimization

### 2A. Audit all images

Search the entire `src/` directory for any `<img>` tags that are NOT using Astro's `<Image />` or `<Picture />` component. Every image in `src/assets/` MUST use Astro's built-in image optimization. Convert any raw `<img>` tags to use the Astro `<Image />` component with:
- `loading="lazy"` (except for above-the-fold hero images which should use `loading="eager"`)
- Explicit `width` and `height` attributes to prevent CLS
- `format="webp"` for automatic WebP conversion
- `quality={80}` for reasonable compression

### 2B. Add responsive image sizes

For each `<Image />` component, add a `sizes` attribute appropriate to its layout context. For example:
- Full-width images: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"`
- Grid card images: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`

### 2C. Optimize font loading

In `src/layouts/BaseLayout.astro`, the Google Fonts stylesheet is loaded as a render-blocking `<link>`. Change it to:

1. Add `rel="preload"` with `as="style"` and `onload="this.onload=null;this.rel='stylesheet'"` for non-blocking font loading
2. Add a `<noscript>` fallback with the original `<link>` tag
3. Keep the existing `<link rel="preconnect">` tags — they are correct

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
</noscript>
```

### 2D. Add `font-display: swap` guarantee

The Google Fonts URL already includes `&display=swap`, which is correct. Verify this is present. If not, append it.

---

## PHASE 3: Mobile-Specific Performance Fixes

### 3A. Defer the VR tour iframe

The `<iframe>` on both `index.astro` and `gallery.astro` pointing to `vr.shinewonder.com` is a heavy third-party embed. On mobile, it should NOT load until the user explicitly requests it. Replace the iframe with:

1. A static placeholder `<div>` showing a thumbnail/screenshot with a "Load Virtual Tour" button
2. On button click, dynamically inject the `<iframe>` into the DOM
3. This saves ~2-5MB of initial load on mobile
4. Keep `loading="lazy"` as a fallback for desktop where you can show the iframe directly (use a Tailwind `hidden md:block` pattern for desktop auto-load, and `md:hidden` for the mobile click-to-load version)

### 3B. Lazy-load Framer Motion

The `AnimatedHero.tsx` component uses `client:load` which hydrates immediately. Since it's above-the-fold, this is acceptable, BUT evaluate whether the `motion` library (Framer Motion) is too heavy.

Run the bundle analyzer (`npm run analyze`) and check the treemap. If `motion` contributes more than 30KB gzipped to the client bundle:
- Consider replacing Framer Motion animations in `AnimatedHero.tsx` with CSS animations (matching the existing `fadeInUp` keyframes in `global.css`)
- This would eliminate the entire `motion` + `react` client-side bundle for pages that don't need interactivity

If the bundle is acceptable (<30KB gzipped for motion), leave it as-is but document the finding.

### 3C. Mobile touch target sizes

Audit all interactive elements (buttons, links, form inputs) across all pages for minimum touch target sizes. Per WCAG 2.2 Success Criterion 2.5.8 (Target Size Minimum), all interactive targets must be at least **24x24px** with adequate spacing. Check:

- Navigation links in `Header.astro` (both desktop and mobile menu)
- CTA buttons across all pages
- Phone number links
- Form inputs in `ContactForm.astro`
- Footer links in `Footer.astro`

Fix any elements that are too small by adding minimum padding (e.g., `min-h-[44px] min-w-[44px]` for comfortable mobile tapping — 44px is the Apple HIG recommendation).

### 3D. Optimize scroll animations for mobile

In `src/scripts/scroll-animations.js`, the `rootMargin` is `'0px 0px -50px 0px'` which may cause elements to animate too late on small screens. Change it to `'0px 0px -30px 0px'` for mobile. Use `window.matchMedia('(max-width: 768px)')` to conditionally set the rootMargin.

---

## PHASE 4: Accessibility Audit & Fixes

### 4A. Create automated accessibility test

Create `tests/accessibility.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from 'axe-playwright';

const pages = ['/', '/about', '/services', '/gallery', '/contact'];

for (const page of pages) {
  test(`accessibility audit: ${page}`, async ({ page: browserPage }) => {
    await browserPage.goto(`http://localhost:4321${page}`);
    await browserPage.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page: browserPage })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze();

    const violations = results.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.length
    }));

    if (violations.length > 0) {
      console.log('Accessibility violations:', JSON.stringify(violations, null, 2));
    }

    expect(results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious')).toHaveLength(0);
  });
}
```

### 4B. Create mobile viewport test

Create `tests/mobile.spec.ts`:

```typescript
import { test, expect, devices } from '@playwright/test';

const mobileDevices = [
  devices['iPhone 14'],
  devices['Pixel 7'],
  devices['Galaxy S9+']
];

const pages = ['/', '/about', '/services', '/gallery', '/contact'];

for (const device of mobileDevices) {
  for (const pagePath of pages) {
    test(`${device.name} - ${pagePath}`, async ({ browser }) => {
      const context = await browser.newContext({ ...device });
      const page = await context.newPage();
      await page.goto(`http://localhost:4321${pagePath}`);
      await page.waitForLoadState('networkidle');

      // No horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);

      // Mobile menu opens and closes
      if (pagePath === '/') {
        const menuButton = page.locator('#mobile-menu-button');
        if (await menuButton.isVisible()) {
          await menuButton.click();
          await expect(page.locator('#mobile-menu-panel')).toBeVisible();
          await page.locator('#mobile-menu-close').click();
        }
      }

      // No images without alt text
      const imagesWithoutAlt = await page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);

      // All text is readable (minimum 12px font size)
      const smallText = await page.evaluate(() => {
        const elements = document.querySelectorAll('p, span, a, li, td, th, label');
        let tooSmall = 0;
        elements.forEach(el => {
          const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
          if (fontSize < 12 && el.textContent?.trim()) tooSmall++;
        });
        return tooSmall;
      });
      expect(smallText).toBe(0);

      await context.close();
    });
  }
}
```

### 4C. Create Playwright config

Create `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:4321',
  },
  webServer: {
    command: 'npm run preview',
    port: 4321,
    reuseExistingServer: true,
  },
});
```

### 4D. Manual accessibility fixes

After reading the project files, apply these fixes directly:

1. **Skip-to-content link**: Add a visually hidden skip link as the first child of `<body>` in `BaseLayout.astro`:
   ```html
   <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-accent-500 focus:rounded-lg focus:shadow-lg focus:font-semibold">
     Skip to main content
   </a>
   ```
   And add `id="main-content"` to the `<main>` tag.

2. **Color contrast**: Verify that `--color-text-secondary: #4B5563` and `--color-text-muted: #6B7280` pass WCAG AA contrast ratio (4.5:1) against the background colors (`#F5F3EF`, `#FFFFFF`). If `#6B7280` on `#F5F3EF` fails, darken it to `#5F6775` or similar.

3. **Focus indicators**: Ensure all interactive elements have visible focus outlines. The current `input:focus` styles use box-shadow, which is good. Verify that `<a>` tags and `<button>` elements also have visible `:focus-visible` outlines. If not, add to `global.css`:
   ```css
   a:focus-visible,
   button:focus-visible {
     outline: 2px solid var(--color-accent-500);
     outline-offset: 2px;
   }
   ```

4. **Iframe accessibility**: Add `title` attributes to all `<iframe>` elements (the VR tour embeds). They already have `title` — verify they are descriptive.

5. **Landmark roles**: Verify the page has proper landmark structure: `<header>`, `<main>`, `<footer>`, `<nav>`. The current code looks correct — validate that no duplicate landmarks exist without `aria-label` differentiation.

6. **Form labels**: In `ContactForm.astro`, verify every `<input>` and `<textarea>` has an associated `<label>` element with a matching `for`/`id` pair, or an `aria-label` attribute.

---

## PHASE 5: Performance Testing & Validation

### 5A. Build and analyze

```bash
npm run build
```

Open `reports/bundle-stats.html` and report:
- Total bundle size (gzipped)
- Largest chunks and what they contain
- Whether `motion` (Framer Motion) and `react`/`react-dom` are the biggest contributors
- Recommendations if total JS exceeds 100KB gzipped

### 5B. Run Lighthouse

Start the preview server and run Lighthouse against it:

```bash
npm run preview &
npx lighthouse http://localhost:4321 --only-categories=performance,accessibility,seo --emulated-form-factor=mobile --output=json --output-path=./reports/lighthouse-mobile.json --chrome-flags='--headless'
```

Report the scores for:
- **Performance** (target: 90+)
- **Accessibility** (target: 95+)
- **SEO** (target: 95+)

If any score is below target, list the specific failing audits and fix them.

### 5C. Run accessibility tests

```bash
npm run build && npx playwright test tests/accessibility.spec.ts
```

Fix any critical or serious violations found by axe-core.

### 5D. Run mobile viewport tests

```bash
npx playwright test tests/mobile.spec.ts
```

Fix any failures (horizontal overflow, missing alt text, small text, broken mobile menu).

---

## PHASE 6: Final Report

After completing all phases, provide a summary report in this format:

```
## Mobile Optimization Report

### Changes Made
- [ ] Installed tooling: Playwright, axe-playwright, Lighthouse, rollup-plugin-visualizer, web-vitals
- [ ] Added npm scripts for testing and analysis
- [ ] Configured bundle analyzer in astro.config.mjs
- [ ] Added web-vitals monitoring to BaseLayout
- [ ] Optimized all images with Astro <Image /> component
- [ ] Made font loading non-blocking
- [ ] Deferred VR tour iframe on mobile
- [ ] Evaluated Framer Motion bundle impact
- [ ] Fixed touch target sizes
- [ ] Optimized scroll animation thresholds for mobile
- [ ] Added skip-to-content link
- [ ] Fixed color contrast issues (if any)
- [ ] Added focus-visible indicators
- [ ] Verified form labels and ARIA attributes
- [ ] Created automated accessibility tests
- [ ] Created automated mobile viewport tests

### Lighthouse Scores (Mobile)
- Performance: __/100
- Accessibility: __/100
- SEO: __/100

### Bundle Analysis
- Total JS (gzipped): __ KB
- Largest chunk: __ (__ KB)

### Accessibility Test Results
- Pages tested: 5
- Critical violations: __
- Serious violations: __

### Mobile Test Results
- Devices tested: iPhone 14, Pixel 7, Galaxy S9+
- Pages tested: 5
- Horizontal overflow issues: __
- Missing alt text: __
- Text below 12px: __
```

---

## Rules

1. **Do not invent features** — only implement what is specified above
2. **Do not delete existing functionality** — enhance, don't replace
3. **Preserve the existing design** — colors, typography, layout structure must remain intact
4. **Test after every phase** — run `npm run build` to verify no build errors before moving on
5. **Show your work** — after each phase, tell me exactly what files you changed and what the diff looks like
6. **If something fails** — report the error, explain why, and propose a fix before proceeding
7. **Respect prefers-reduced-motion** — all animation changes must honor the existing reduced-motion media query
