# 🔍 PHASE 5: SEO & Performance Optimization

**Objective:** Optimize for search engines and ensure maximum performance

**Duration:** 2-3 hours

**Success Criteria:**
- ✅ Lighthouse score 90+ on all metrics
- ✅ All pages have proper meta tags
- ✅ Sitemap.xml and robots.txt configured
- ✅ Images optimized
- ✅ Core Web Vitals passing

---

## Tasks

### 1. Add SEO Meta Tags (1 hour)
**Update BaseLayout.astro to accept SEO props:**

```astro
interface Props {
  title: string;
  description: string;
  ogImage?: string;
}
```

**Add to each page:**
- Home: "Nevada General Contractor | Global Management & Construction | Las Vegas"
- Services: "Construction Services Las Vegas | Design Build & Project Management"
- About: "About Us | Global Management & Construction Corp | Est. 2004"
- Contact: "Contact Us | Las Vegas General Contractor | Free Consultation"

**Include:**
- Title tags (unique, 50-60 chars)
- Meta descriptions (unique, 150-160 chars)
- Canonical URLs
- Open Graph tags
- Twitter Card tags
- Robots meta

### 2. Create Sitemap.xml (20 min)
**File:** `public/sitemap.xml`

Include all pages:
- / (priority 1.0)
- /services (priority 0.8)
- /about (priority 0.7)
- /contact (priority 0.9)

Set lastmod to current date

### 3. Configure Robots.txt (10 min)
**File:** `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /thank-you

Sitemap: https://www.globalconstructionnv.com/sitemap.xml
```

### 4. Optimize Images (45 min)
- Verify all images under 200KB
- Ensure WebP/AVIF formats (Astro does this)
- Add lazy loading to below-fold images
- Verify alt text on all images
- Add responsive image sizes

### 5. Add Structured Data (45 min)
**Add Schema.org JSON-LD:**

```json
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "Global Management & Construction Corp.",
  "description": "Nevada General Contractor...",
  "url": "https://www.globalconstructionnv.com",
  "telephone": "702-890-0900",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9500 Hillwood Dr, Suite #201",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "89134",
    "addressCountry": "US"
  },
  "foundingDate": "2004"
}
```

### 6. Performance Optimization (1 hour)
- Minimize JavaScript (tree-shake unused)
- Purge unused CSS (automatic with Tailwind)
- Lazy load components with client:visible
- Add loading="lazy" to images
- Inline critical CSS

### 7. Run Lighthouse Audit (30 min)
**Target scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Check Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### 8. Mobile Performance Test (30 min)
- Test on real iPhone/Android
- Check load time on 3G
- Verify touch targets (44px min)
- Check font readability

### 9. Add Analytics (Optional, 20 min)
**Google Analytics 4:**

```astro
{import.meta.env.PROD && (
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
)}
```

---

## Deliverables Checklist
- [ ] SEO meta tags on all pages
- [ ] Unique titles and descriptions
- [ ] Sitemap.xml created
- [ ] Robots.txt configured
- [ ] Images optimized
- [ ] Structured data added
- [ ] Lighthouse 90+ on all
- [ ] Core Web Vitals passing
- [ ] Mobile-friendly test passed
- [ ] Analytics installed (optional)
- [ ] No console errors
- [ ] Committed and deployed

---

# 📐 META PROMPT FOR PHASE 5

```
You are an Astro expert continuing Global Management & Construction. Phases 1-4 complete.

TASK: Optimize for SEO and performance to achieve production-ready standards.

SEO META TAGS:

Update src/layouts/BaseLayout.astro:
```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage = '/og-image.jpg' } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<head>
  <title>{title}</title>
  <meta name="description" content={description}>
  <link rel="canonical" href={canonicalURL}>
  
  <meta property="og:type" content="website">
  <meta property="og:url" content={canonicalURL}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={new URL(ogImage, Astro.site)}>
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  
  <meta name="robots" content="index, follow">
</head>
```

Update each page with unique SEO:
- Home: title="Nevada General Contractor | Global Management & Construction | Las Vegas", description="Licensed Nevada general contractor since 2006. Specializing in commercial construction, design-build, and project management in Las Vegas."
- Services: title="Construction Services Las Vegas | Design Build & Project Management", description="Comprehensive construction services including design-build, project management, feasibility studies, and commercial construction in Las Vegas, Nevada."
- About: title="About Us | Global Management & Construction Corp | Est. 2004", description="Founded in 2004 by experienced engineers. Nevada License #66668. Providing trustworthy, honest, and reliable construction services in Las Vegas."
- Contact: title="Contact Us | Las Vegas General Contractor | Free Consultation", description="Contact Global Management & Construction Corp. Call 702-890-0900 or visit our Las Vegas office for a free consultation."

SITEMAP.XML:

Create public/sitemap.xml:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.globalconstructionnv.com/</loc>
    <lastmod>2026-01-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.globalconstructionnv.com/services</loc>
    <lastmod>2026-01-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.globalconstructionnv.com/about</loc>
    <lastmod>2026-01-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.globalconstructionnv.com/contact</loc>
    <lastmod>2026-01-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

ROBOTS.TXT:

Create public/robots.txt:
```
User-agent: *
Allow: /
Disallow: /thank-you

Sitemap: https://www.globalconstructionnv.com/sitemap.xml
```

STRUCTURED DATA:

Add to Home page or BaseLayout:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "Global Management & Construction Corp.",
  "description": "Nevada General Contractor specializing in commercial construction and project management",
  "url": "https://www.globalconstructionnv.com",
  "logo": "https://www.globalconstructionnv.com/logo.svg",
  "telephone": "702-890-0900",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9500 Hillwood Dr, Suite #201",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "89134",
    "addressCountry": "US"
  },
  "foundingDate": "2004",
  "areaServed": {
    "@type": "State",
    "name": "Nevada"
  }
}
</script>
```

IMAGE OPTIMIZATION:

Ensure all Image components use:
```astro
<Image
  src={image}
  alt="Descriptive alt text"
  loading="lazy"
  widths={[400, 800, 1200]}
/>
```

PERFORMANCE:

1. Lazy load components:
```astro
<Component client:visible />
```

2. Verify all animations use transform/opacity (GPU-accelerated)

3. Check no large JavaScript bundles

LIGHTHOUSE AUDIT:

Run in Chrome DevTools (Incognito mode):
- Open DevTools → Lighthouse
- Select all categories
- Generate report
- Target: 90+ on all metrics

Fix common issues:
- Images without dimensions → Add width/height
- Large images → Compress further
- Unused JavaScript → Remove imports
- Missing alt text → Add to all images

CORE WEB VITALS:

- LCP: Optimize hero image, preload critical assets
- FID: Minimize JavaScript execution
- CLS: Add width/height to images, reserve space for content

Deploy: Commit "Phase 5: SEO and performance optimization", push, verify

SUCCESS CRITERIA:
- ✅ Lighthouse 90+ all categories
- ✅ Unique meta tags on all pages
- ✅ Sitemap.xml accessible
- ✅ Structured data valid
- ✅ Core Web Vitals passing
- ✅ Mobile-friendly

TEST TOOLS:
- Lighthouse (Chrome DevTools)
- PageSpeed Insights
- Google Mobile-Friendly Test
- Google Rich Results Test (for structured data)
```
