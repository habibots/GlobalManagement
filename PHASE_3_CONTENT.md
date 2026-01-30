# 📝 PHASE 3: Content Pages Implementation

**Objective:** Build all four content pages with actual content from old website

**Duration:** 4-5 hours

**Success Criteria:**
- ✅ Home page with hero and company overview
- ✅ Services page with all services listed
- ✅ About page with mission and values
- ✅ Contact page structure (form in Phase 4)
- ✅ All content migrated
- ✅ Images properly placed
- ✅ Fully responsive

---

## Tasks

### 1. Build Home Page (1.5 hours)
**File:** `src/pages/index.astro`

**Sections:**
- Hero: Title, tagline "Creative vision, bold design", CTA
- Company overview: Founded 2004, License #66668
- Services preview: 6 main services with icons
- Trust indicators: Years in business, credentials

**Content source:** Lines 8-30 of WEBSITE_CONTENT.md

### 2. Build Services Page (1 hour)
**File:** `src/pages/services.astro`

**Sections:**
- Page header
- Pre-Construction Services (6 items)
- Construction Services (3 items)
- Service details with descriptions
- Card grid layout (2 col desktop, 1 col mobile)

**Content source:** Lines 33-70 of WEBSITE_CONTENT.md

### 3. Build About Page (45 min)
**File:** `src/pages/about.astro`

**Sections:**
- Mission statement
- Core values: Trustworthiness, Honesty, Dedication, Reliability
- Company history
- Why choose us
- Use main building image

**Content source:** Lines 72-95 of WEBSITE_CONTENT.md

### 4. Build Contact Page Structure (45 min)
**File:** `src/pages/contact.astro`

**Sections:**
- Page header
- Contact info display
- Form placeholder (comment: "Form added in Phase 4")
- Optional: Google Maps embed

**Content source:** Lines 97-105 of WEBSITE_CONTENT.md

### 5. Add Images (1 hour)
- Home hero: image-03-banner-999x248.jpg
- Services: icon-01 through icon-04
- About: image-01-main-building-369x450.jpg
- Use Astro Image component for optimization

### 6. Style with Tailwind (1 hour)
- Typography hierarchy (H1-H3, body)
- Consistent spacing
- Color scheme (primary blues, accent orange)
- Responsive text sizing

### 7. Accessibility Audit (30 min)
- Alt text on all images
- Heading hierarchy
- Color contrast WCAG AA
- Semantic HTML

---

## Deliverables Checklist
- [ ] Home page complete
- [ ] Services page complete
- [ ] About page complete
- [ ] Contact page structure
- [ ] All content migrated
- [ ] All images placed
- [ ] Images optimized
- [ ] Typography consistent
- [ ] Responsive on all devices
- [ ] Accessibility requirements met
- [ ] Committed and deployed

---

# 📐 META PROMPT FOR PHASE 3

```
You are an Astro expert continuing Global Management & Construction website. Phases 1-2 complete.

TASK: Build all four content pages with actual content from old GoDaddy website.

CONTENT SOURCE: /Users/uspharoh/CascadeProjects/GlobalManagement/organized_content/WEBSITE_CONTENT.md
IMAGES: src/assets/images/ (copied in Phase 2)

BUILD PAGES:

**HOME (src/pages/index.astro):**
- Hero: "Global Management & Construction", tagline, image-03-banner, CTA button
- Overview: Founded 2004, License #66668 ($6.8M limit), licensed 2006 (lines 17-18)
- Services preview: 6 services grid with icons (lines 24-29)
- Trust indicators

**SERVICES (src/pages/services.astro):**
- Header
- Pre-Construction: 6 services (lines 37-43)
- Construction: 3 services (lines 46-49)
- Details: Descriptions (lines 50-70)
- Card grid: 2 cols desktop, 1 col mobile

**ABOUT (src/pages/about.astro):**
- Mission (lines 72-82)
- Core values: Trustworthiness, Honesty, Dedication, Reliability
- History (lines 17-18)
- Why choose us
- Image: image-01-main-building

**CONTACT (src/pages/contact.astro):**
- Header
- Contact info: Address (9500 Hillwood Dr, Suite #201, Las Vegas, NV 89134), Tel (702-890-0900), Phone (702-505-1344)
- Form placeholder: <!-- Form added in Phase 4 -->
- Optional: Google Maps

IMAGES:
Use Astro Image component:
```astro
import { Image } from 'astro:assets';
import heroImage from '../assets/images/image-03-banner-999x248.jpg';

<Image src={heroImage} alt="..." loading="lazy" />
```

STYLING:
- H1: text-4xl md:text-5xl font-bold text-primary-700
- H2: text-3xl md:text-4xl font-bold
- Body: text-base md:text-lg text-gray-700
- Sections: py-16 md:py-24
- Container: max-w-7xl mx-auto px-4
- Colors: primary blues, accent orange

RESPONSIVENESS:
- Mobile: 375px (single column)
- Tablet: 768px (may use 2 cols)
- Desktop: 1024px+ (full multi-column)

ACCESSIBILITY:
- Alt text on all images
- Heading hierarchy (h1 → h2 → h3)
- WCAG AA contrast (4.5:1)
- Semantic HTML

Deploy: Commit "Phase 3: Content pages", push, verify on live URL

SUCCESS CRITERIA:
- ✅ All 4 pages complete
- ✅ Content accurate
- ✅ Images optimized
- ✅ Responsive
- ✅ Accessible

CONSTRAINTS: No contact form yet (Phase 4), no complex animations (Phase 4), no SEO tags (Phase 5)
```
