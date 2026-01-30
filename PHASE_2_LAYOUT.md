# 🎨 PHASE 2: Layout & Component Architecture

**Objective:** Build reusable layout components (header, footer, navigation) and design system

**Duration:** 3-4 hours

**Success Criteria:**
- ✅ Base layout with consistent header/footer
- ✅ Responsive navigation (desktop + mobile)
- ✅ Logo optimized and displayed
- ✅ Design system tokens configured
- ✅ Test pages using layout

---

## Tasks

### 1. Copy Images (20 min)
```bash
cp -r /Users/uspharoh/CascadeProjects/GlobalManagement/organized_content/images/* \
     src/assets/images/
```

### 2. Create BaseLayout.astro (45 min)
- HTML boilerplate with meta tags
- Import global styles
- ViewTransitions from astro:transitions
- Accept props: title, description
- Slot for content
- Include Header and Footer

### 3. Build Header.astro (45 min)
- Logo (left) - use logo-icon.svg
- Desktop nav (right): Home, Services, About, Contact
- Mobile hamburger icon
- Active page indicator
- Sticky positioning (optional)

### 4. Build Footer.astro (30 min)
- Company name and license #66668
- Address: 9500 Hillwood Dr, Suite #201, Las Vegas, NV 89134
- Phone: 702-890-0900
- Copyright with year
- Responsive stacking

### 5. Build MobileNav.astro (45 min)
- Slide-in animation
- Backdrop blur
- Close button
- Same nav items
- JavaScript toggle functionality
- Accessible (ARIA, keyboard)

### 6. Configure Design System (30 min)
- Extend Tailwind config:
  - Primary: Blues (#0369a1, #0284c7, #0ea5e9)
  - Accent: Orange (#f97316)
  - Neutral: Grays
- Typography scale
- Spacing utilities

### 7. Create Test Pages (30 min)
- Update index.astro with BaseLayout
- Create test.astro
- Add placeholder hero
- Test View Transitions

### 8. Test Responsiveness (30 min)
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px
- Verify hamburger on mobile
- No horizontal scroll

---

## Deliverables Checklist
- [ ] BaseLayout.astro with meta tags
- [ ] Header with logo and nav
- [ ] Footer with contact info
- [ ] MobileNav with animation
- [ ] Images copied to src/assets/images/
- [ ] Logo displays correctly
- [ ] Brand colors in Tailwind
- [ ] Desktop nav working
- [ ] Mobile menu working
- [ ] View Transitions enabled
- [ ] Responsive on all viewports
- [ ] Committed and deployed

---

# 📐 META PROMPT FOR PHASE 2

```
You are an Astro expert continuing the Global Management & Construction website. Phase 1 is complete.

TASK: Build layout system with header, footer, mobile navigation, and base layout wrapper.

CONTEXT:
- Phase 1: ✅ Foundation deployed
- Images: /Users/uspharoh/CascadeProjects/GlobalManagement/organized_content/images/
- Company info: organized_content/WEBSITE_CONTENT.md

REQUIREMENTS:

1. Copy images from organized_content/images/ to src/assets/images/

2. Create src/layouts/BaseLayout.astro:
   - Props: title, description
   - ViewTransitions from astro:transitions
   - Import global.css
   - Include Header and Footer components
   - <slot /> for page content

3. Create src/components/Header.astro:
   - Logo left (logo-icon.svg from assets)
   - Desktop nav right: Home, Services, About, Contact
   - Hamburger on mobile (md:hidden)
   - Active page styling

4. Create src/components/Footer.astro:
   - Company: Global Management & Construction Corp.
   - License: Nevada #66668
   - Address: 9500 Hillwood Dr, Suite #201, Las Vegas, NV 89134
   - Phone: 702-890-0900
   - Copyright 2026
   - Responsive (stacks on mobile)

5. Create src/components/MobileNav.astro:
   - Slide-in animation
   - Backdrop blur
   - Toggle with <script> tag
   - ARIA labels
   - Same nav items

6. Configure tailwind.config.mjs:
   - Primary colors: Blues (#0369a1, #0284c7, #0ea5e9)
   - Accent: Orange (#f97316)
   - Extend with custom utilities

7. Update test pages:
   - Modify src/pages/index.astro to use BaseLayout
   - Create src/pages/test.astro
   - Test View Transitions between pages

8. Test responsiveness:
   - 375px, 768px, 1440px
   - Nav switches to hamburger < 768px
   - No horizontal overflow

9. Deploy:
   - Commit: "Phase 2: Layout and components"
   - Push to GitHub
   - Verify on .ondigitalocean.app

SUCCESS CRITERIA:
- ✅ BaseLayout with header, footer, ViewTransitions
- ✅ Header shows logo + nav
- ✅ Footer shows company info
- ✅ Mobile nav works (toggle)
- ✅ Responsive design
- ✅ Brand colors applied
- ✅ Deployed successfully

DESIGN: Professional, clean, construction industry aesthetic (blues/grays, orange accents)

CONSTRAINTS: No page content yet (Phase 3), no forms (Phase 4), no complex animations (Phase 4)
```
