# Change Log Plan — Global Management & Construction NV

## Front-End Aesthetic & Presentation Overhaul

**Objective:** Transform the website from its current Apple-style tech/luxury aesthetic into a grounded, professional construction company website that communicates **growth**, **dependability**, and **quality** — while remaining modern, slick, and smooth.

**Core Problem:** The site currently feels like a premium tech product landing page (dark minimalism, gold gradients, wireframe globe, glassmorphism, rainbow accent cards). It does not feel like a construction company.

**Phase Order:** UI and aesthetics first. Content and functionality that requires additional information is pushed to later phases.

**Placeholder Strategy:** Content that is not yet available (project photos, team headshots, testimonials) will be built with swap-ready placeholders marked with `<!-- PLACEHOLDER: ... -->` comments in code.

---

## PHASE 1 — Color Palette, Typography & Visual Cleanup

**Priority:** HIGHEST — This changes the entire feel of every page in one pass.
**Content needed from owner:** None. Pure styling.

### What Changes
- **Replace the entire color palette** in `global.css`:
  - Remove near-black backgrounds (#030303, #0a0a0a), gold gradients (#D4AF37/#FFD700/#B8860B), and the full rainbow vibrant accent set (pink, purple, cyan, green, yellow)
  - New primary backgrounds: warm off-white / light stone (#F5F3EF or similar) and soft warm gray for alternating sections
  - New dark sections: deep charcoal or slate (not pure black) for footer and select contrast blocks
  - New primary accent: deep navy blue (#1B3A5C or similar) — trustworthy, construction-appropriate
  - New secondary accent: warm amber/copper (#C17817 or similar) for CTAs and highlights — used as solid colors, not gradients
  - Text: dark charcoal (#1a1a1a) on light backgrounds, white on dark sections
  - Remove all multi-color rainbow card accents — service cards use a single consistent accent
- **Typography adjustments:**
  - Introduce a heading font with more authority (e.g., "Plus Jakarta Sans" or "DM Sans" for headings, keep Inter for body text)
  - Reduce hero text sizes from text-7xl down to text-4xl/5xl — confident, not shouting
  - Tighten the overall type scale for informational content over marketing splash
- **Remove all abstract tech graphics:**
  - Remove the wireframe globe SVG from the hero section
  - Remove all background gradient orbs and blur effects (the `blur-[80px]` to `blur-[120px]` ambient glows)
  - Remove grid.svg background pattern
  - Remove glassmorphism effects (backdrop-blur-xl, bg-white/5, bg-white/10 transparency layers)
  - Replace with clean whitespace or a subtle, faint construction-relevant texture (e.g., a light concrete or blueprint-line pattern used sparingly as section dividers — not gimmicky)
- **Tone down animations globally:**
  - Speed up scroll-triggered fade-ins from 0.6s to 0.3s
  - Remove stagger-child animation delays (100ms cascading reveals)
  - Remove pulse animations on badges
  - Remove hover lift effects (-translate-y-1) on every card — keep only on primary CTA buttons
  - Remove hover glow/shadow effects (shadow-accent-500/20)
  - Keep: basic scroll fade-ins, smooth page transitions, button hover color changes
  - Continue respecting `prefers-reduced-motion`

### Windsurf Prompt — Phase 1

```
I need you to completely overhaul the visual foundation of this Astro + Tailwind CSS website for a Las Vegas construction company called Global Management & Construction NV. The site currently looks like an Apple product landing page — dark mode, gold gradients, rainbow accent cards, glassmorphism, ambient blur orbs. It needs to look like a professional, warm, trustworthy construction company.

DO NOT move on to any other changes after completing this phase. Only change what is listed below. Do not restructure pages, do not change content or layout, do not add or remove sections. This is purely a color, typography, and visual cleanup pass.

Here is exactly what to do:

1. REPLACE THE COLOR PALETTE in src/styles/global.css:
   - Replace all dark-950 through dark-500 backgrounds with a warm light palette:
     - Primary background: #F5F3EF (warm off-white/stone)
     - Secondary background: #E8E4DE (soft warm gray for alternating sections)
     - Dark sections (footer, select contrast blocks): #2C3E50 (deep slate, NOT pure black)
   - Replace the accent color scale with a deep navy blue: primary accent #1B3A5C
   - Replace gold gradients and vibrant colors with a warm amber: secondary accent #C17817
   - Update text colors: #1a1a1a for body text on light backgrounds, #ffffff on dark sections, #6B7280 for muted/secondary text
   - Update border colors to work with the light palette: #D1CCC4 for borders
   - Remove ALL vibrant-* color definitions (vibrant-pink, vibrant-purple, vibrant-blue, vibrant-cyan, vibrant-green, vibrant-yellow, vibrant-orange)
   - Remove ALL gradient backgrounds from cards — service cards, value cards, etc. should use a single consistent accent, not rainbow colors

2. UPDATE TYPOGRAPHY:
   - Add "Plus Jakarta Sans" from Google Fonts as the heading font (weights 600, 700, 800)
   - Keep Inter as the body font
   - In the BaseLayout.astro, update the Google Fonts link to include Plus Jakarta Sans
   - Apply the heading font to all h1, h2, h3 elements
   - Reduce the hero heading from text-7xl/text-6xl down to text-5xl max on desktop, text-3xl on mobile
   - Ensure the type scale across all pages is tighter and more practical — headings should feel confident, not like a product launch

3. REMOVE ALL ABSTRACT TECH GRAPHICS:
   - Remove the wireframe globe SVG from the hero section in index.astro (the inline SVG with coordinate-based lines creating a 3D sphere). Leave the text content in place, just remove the globe graphic
   - Remove ALL background gradient orbs across all pages — these are the large blurred divs with classes like blur-[80px], blur-[120px], opacity-5/10/20 with gradient backgrounds. Search every .astro file for these and remove them
   - Remove the grid.svg usage if it appears as a background anywhere
   - Remove ALL glassmorphism/backdrop-blur effects: backdrop-blur-xl on overlays, bg-white/5, bg-white/10 transparency layers on cards and sections. Replace with solid background colors from the new palette
   - Do NOT add replacement decorative graphics — use clean whitespace

4. TONE DOWN ANIMATIONS:
   - In src/styles/global.css: change the fadeInUp animation duration from 0.6s to 0.3s
   - Remove the stagger delay system — in scroll-animations.js, remove the logic that adds incremental delays to .stagger-child elements. All items should fade in together, not cascade
   - Remove the animate-pulse class usage from any badges or indicators across all pages
   - Remove hover:-translate-y-1 from all cards across all pages. Keep hover effects only as subtle color/border changes
   - Remove hover:shadow-lg and hover:shadow-accent-500/20 glow effects from cards
   - Keep: the basic .scroll-fade / .animate-fadeIn system (just faster), smooth view transitions between pages, button hover color changes, active:scale-95 on buttons
   - The prefers-reduced-motion media query handling should remain untouched

5. UPDATE ALL PAGES to work with the new light palette:
   - Go through every .astro file in src/pages/ and src/components/ and update any hardcoded dark-mode classes (bg-dark-900, bg-dark-800, text-white as default, etc.) to use the new light palette
   - Cards should have white or very light gray backgrounds with subtle borders instead of dark semi-transparent backgrounds
   - The header should use a solid white or light background with a subtle bottom border — no more backdrop-blur
   - The footer should use the dark slate (#2C3E50) as its background
   - Ensure all text remains readable with proper contrast against the new backgrounds
   - The gold gradient on CTA buttons (from-[#D4AF37] via-[#FFD700] to-[#B8860B]) should be replaced with a solid amber/copper (#C17817) background with white text

After completing all changes, run `npm run build` to verify there are no build errors. Do NOT proceed to any other changes. Stop and report what was done.
```

---

## PHASE 2 — Header, Footer & Navigation Overhaul

**Priority:** HIGH — These appear on every page and set the frame for the whole site.
**Content needed from owner:** None. Uses existing content, just restyled.

### What Changes
- **Header:**
  - Solid white background with a subtle bottom border (1px light gray) — no more glassmorphism/blur
  - Add the phone number (702-890-0900) directly visible in the desktop header next to the "Get a Quote" CTA
  - Clean, simple nav links — dark text on white, active page indicated by accent-colored underline or text color, not a background fill
  - Mobile menu: solid white background, clean slide-in, no backdrop blur effects
- **Footer:**
  - Dark slate background (#2C3E50) with well-organized columns
  - Add: office hours, license info (#66668, $6.8M), direct phone numbers, quick links to all pages
  - Add a "Virtual Tours" link (will point to /virtual-tours once Phase 6 is built — link can be added now as a placeholder)
  - Clean, practical layout — the footer should feel like useful reference information, not a design statement
- **Contact page restyle:**
  - Restyle form inputs and buttons to match the new warm palette
  - Make phone numbers and physical address more visually prominent — larger text, accent-colored phone icon
  - Keep the Google Maps embed but adjust any grayscale filter to match the new color treatment

### Windsurf Prompt — Phase 2

```
I need you to overhaul the Header, Footer, and Contact page of this Astro + Tailwind website. Phase 1 (color palette and typography) has already been completed — the site now uses a warm light palette with navy blue (#1B3A5C) and amber (#C17817) accents on an off-white (#F5F3EF) background.

DO NOT change any other pages or sections beyond the Header component, Footer component, and Contact page. Do not restructure the homepage, services page, or about page content. Stop after completing these changes and report what was done.

Here is exactly what to do:

1. HEADER (src/components/Header.astro):
   - Replace the current glassmorphism/backdrop-blur header with a solid white (#FFFFFF) background and a subtle bottom border (1px solid #D1CCC4 or similar warm gray)
   - Navigation links: dark charcoal text (#1a1a1a), active page indicated by the navy accent color (#1B3A5C) with an underline — remove any bg-white/10 or bg-dark background active states
   - Add the phone number 702-890-0900 as a visible clickable tel: link in the desktop header, positioned to the left of the "Get a Quote" button. Style it with a small phone icon and the navy accent color
   - "Get a Quote" CTA button: solid amber (#C17817) background, white text, rounded, subtle hover darkening
   - Mobile hamburger menu: update icon color to dark charcoal. The slide-in mobile panel should have a solid white background, no backdrop-blur, clean dividers between menu items
   - Remove any remaining glassmorphism, transparency, or blur effects from the header
   - The header should remain sticky (position fixed/sticky at top) with z-50

2. FOOTER (src/components/Footer.astro):
   - Background: dark slate (#2C3E50)
   - Organize into 3-4 columns:
     - Column 1: Company name/logo, brief one-line description, license info (Nevada Contractor License #66668, $6.8 Million Limit)
     - Column 2: Quick Links — Home, Services, About, Contact, Virtual Tours (this last link can point to /virtual-tours even if the page doesn't exist yet)
     - Column 3: Contact Info — phone numbers (702-890-0900, 702-505-1344), address (9500 Hillwood Dr, Ste# 201, Las Vegas, NV 89134), business hours (Mon-Fri 8-5, Sat by appointment, Sun closed)
   - Bottom bar: copyright line with current year
   - All text white or light gray (#D1D5DB) on the dark background
   - Links should have a subtle hover color change to the amber accent
   - Clean, practical, well-spaced — this should feel like useful reference information

3. CONTACT PAGE (src/pages/contact.astro):
   - Make phone numbers and address more visually prominent — display them at a larger size with accent-colored icons
   - Restyle form inputs: light gray backgrounds (#F9F8F6), warm gray borders, navy accent focus ring
   - Submit button: solid amber (#C17817) background, white text, matching the site CTA style
   - Keep the Google Maps embed. If there's a grayscale CSS filter on it, keep it but ensure it works visually with the new light palette
   - Ensure the overall layout and spacing feels clean and warm on the light background

After completing all changes, run `npm run build` to verify no build errors. Do NOT proceed to any other changes. Stop and report what was done.
```

---

## PHASE 3 — Hero Section Rebuild

**Priority:** HIGH — First thing visitors see.
**Content needed from owner:** None right now. Uses a placeholder image.

### What Changes
- Remove the AnimatedHero.tsx React component entirely (the Motion library stagger-fade entrance, wireframe globe, animated badge)
- Replace with a full-width hero section built in plain Astro/HTML:
  - A strong, high-quality placeholder construction photo as the background (full-width, ~60-70vh height)
  - Dark overlay gradient so white text remains readable
  - Company name, a construction-grounded tagline (replace "Creative vision, bold design" with something like "Building Las Vegas Since 2004"), and a single prominent "Get a Free Quote" CTA
  - The stat bar (20+ Years, 500+ Projects, 100% Licensed) restyled as a clean, simple horizontal strip below or overlapping the bottom of the hero — no pulse animations, no glassmorphism, just solid confident presentation
- Simple single fade-in on load (0.3s) or no animation at all — hero should communicate instantly
- Mark the hero background image with a `<!-- PLACEHOLDER -->` comment for later swap

### Windsurf Prompt — Phase 3

```
I need you to rebuild the hero section on the homepage of this Astro + Tailwind website. Phases 1-2 have already been completed — the site uses a warm light palette with navy (#1B3A5C) and amber (#C17817) accents.

DO NOT change anything else on the homepage beyond the hero section. Do not touch the services preview, trust indicators, company overview, or CTA sections. Do not modify any other pages. Stop after completing this and report what was done.

Here is exactly what to do:

1. REMOVE the AnimatedHero.tsx React component:
   - Delete src/components/AnimatedHero.tsx
   - Remove the import and usage of AnimatedHero from src/pages/index.astro
   - If the Motion library (framer-motion/motion) is no longer used anywhere else in the project after this removal, uninstall it from package.json

2. BUILD A NEW HERO in plain Astro/HTML directly in index.astro:
   - Structure: A full-width section, 60-70vh height on desktop, 50vh on mobile
   - Background: Use one of the existing building/project images from src/assets/images/ (image-01-main-building or similar) as a background image via CSS or an <img> with object-cover. If none of the existing images work well as a wide hero banner, use a solid dark slate (#2C3E50) background as a temporary placeholder
   - Add a semi-transparent dark overlay gradient (from rgba(0,0,0,0.5) to rgba(0,0,0,0.3)) so white text is always readable over the image
   - Add a <!-- PLACEHOLDER: Replace hero background with wide-angle photo of a completed GM&C project --> comment on the background image element
   - Content centered vertically and horizontally (or left-aligned with padding, whichever looks more natural for a construction company):
     - Company name: "Global Management & Construction" in the heading font, text-4xl md:text-5xl, white, font-bold
     - Tagline: "Building Las Vegas Since 2004" in text-lg md:text-xl, white/slightly transparent, directly below the company name
     - CTA button: "Get a Free Quote" — solid amber (#C17817) background, white text, rounded, links to /contact. Sized generously (px-8 py-4)
   - NO animation on the hero content, or at most a single simple 0.3s opacity fade-in on page load. No stagger reveals, no Motion library, no piece-by-piece animation

3. STAT BAR below the hero:
   - Keep the existing stats: "20+ Years Experience", "500+ Projects Completed", "100% Licensed & Insured"
   - Restyle as a horizontal strip directly below the hero section (or overlapping the bottom edge of the hero)
   - Background: white or very light with a subtle shadow, or the navy accent (#1B3A5C) with white text
   - Three stats in a row on desktop (stacked on mobile), separated by vertical dividers or spacing
   - No pulse animations, no glassmorphism, no gradient backgrounds — clean and solid
   - Numbers should be in the heading font, bold, and larger than the labels

After completing all changes, run `npm run build` to verify no build errors. Do NOT proceed to any other changes. Stop and report what was done.
```

---

## PHASE 4 — Services Section Rework

**Priority:** MEDIUM — Restructures existing content with better UI. No new content needed.
**Content needed from owner:** None. All service descriptions already exist.

### What Changes
- **Homepage services preview:** Remove the Apple-style icon cards with color-coded gradient backgrounds. Replace with a cleaner grid using consistent styling — white cards, subtle borders, a single accent color for icons, construction-relevant SVG icons (hard hat, blueprint, crane, building, etc.) instead of JPG icons with gradient backgrounds
- **Services page (/services):** Restructure the layout:
  - Group services into clear categories: Pre-Construction / Construction / Management
  - Use a two-column or accordion layout instead of isolated floating cards
  - Replace JPG icon images with proper inline SVG icons from a construction-relevant set
  - Keep all existing service descriptions and text — just restyle the presentation
- Remove all rainbow per-card accent colors — everything uses the single navy/amber accent system

### Windsurf Prompt — Phase 4

```
I need you to rework the services sections on both the homepage and the services page of this Astro + Tailwind website. Phases 1-3 are complete — the site uses a warm light palette, the hero has been rebuilt, header/footer are updated.

DO NOT change any other sections or pages. Do not touch the hero, about page, contact page, trust indicators, or CTA sections. Keep all existing service text/descriptions — this is a UI/presentation change only. Stop after completing this and report what was done.

Here is exactly what to do:

1. HOMEPAGE SERVICES PREVIEW (in src/pages/index.astro):
   - Find the section with the 6 service preview cards (Project Development, Project Management, Design & Build, Commercial Construction, New Developments, Tenant Improvement)
   - Remove any per-card unique accent colors (each card currently has its own color: pink, purple, cyan, etc.). All cards should use the same consistent styling
   - Restyle cards: white background (#FFFFFF), subtle warm gray border (1px solid #D1CCC4), rounded-xl, light hover effect (just a border color change to the navy accent or a subtle shadow — no translate/lift)
   - Replace the current icon treatment (JPG images with gradient backgrounds) with simple inline SVG icons in the navy accent color (#1B3A5C). Use appropriate construction icons:
     - Project Development → building/blueprint icon
     - Project Management → clipboard/checklist icon
     - Design & Build → pencil-ruler/drafting icon
     - Commercial Construction → crane/hard-hat icon
     - New Developments → building-rise/construction icon
     - Tenant Improvement → interior/paint-roller icon
   - You can use Heroicons (already compatible with the stack) or create simple inline SVGs. Icon size: 40-48px, displayed in a light accent-tinted circle background (bg-blue-50 or similar)
   - Keep the "View All Services" link, styled with the amber accent color

2. SERVICES PAGE (src/pages/services.astro):
   - KEEP all existing text content — every service name and description stays the same
   - Pre-Construction Services section (6 items): Display as a clean 2-column or 3-column grid of cards. Same card styling as homepage: white background, subtle border, rounded corners, navy SVG icon per card. Remove any rainbow/gradient icon backgrounds
   - Construction Services section (3 items: Design Build, Project Management, Construction Management): Display as larger feature cards, possibly full-width with icon on the left and description on the right. Give these more visual prominence than the pre-construction cards since they are the core offerings
   - Our Approach section (4 items): Restyle as a clean numbered list or timeline layout — "1. Project Development, 2. Initial Stage Involvement, 3. Permitting, 4. Project Completion" — to show the logical flow. Remove any gradient/colored card backgrounds
   - Use the same inline SVG icon approach throughout — construction-relevant icons in navy accent color, no JPG icons, no gradient backgrounds
   - Ensure clear visual separation between the three sections (Pre-Construction / Construction / Our Approach) with section headings in the heading font

After completing all changes, run `npm run build` to verify no build errors. Do NOT proceed to any other changes. Stop and report what was done.
```

---

## PHASE 5 — About Page & Trust/Values Rework

**Priority:** MEDIUM — Restructures existing content + adds placeholder sections for content provided later.
**Content needed from owner:** Team photos, team bios, testimonials — all will use placeholders for now.

### What Changes
- **Rename** "Our Philosophy" to "About Us" or "Our Story"
- **Remove** the duplicated core values cards (they already appear on the homepage)
- **Rework trust/values section** into concrete proof: license badge, years in business, project count, insurance details — presented as confident facts, not abstract value words
- **Add testimonials section** with 2-3 placeholder cards (client name, company, quote, optional photo — all placeholder content marked for swap)
- **Add team/leadership section** with 2-4 placeholder cards (headshot, name, role, bio — all placeholder)
- **Expand company history timeline** with space for project milestones (placeholder entries alongside the real 2004/2006 dates)

### Windsurf Prompt — Phase 5

```
I need you to rework the About page and the Trust/Values section on the homepage of this Astro + Tailwind website. Phases 1-4 are complete — the site uses a warm light palette, header/footer are updated, hero is rebuilt, and services are restyled.

DO NOT change any other sections or pages beyond the About page and the trust/values section on the homepage. Stop after completing this and report what was done.

IMPORTANT: Several parts of this phase use PLACEHOLDER content that the owner will provide later. Every placeholder must be marked with an HTML comment: <!-- PLACEHOLDER: description of what to replace -->. Placeholders should look intentional and styled — not broken or obviously fake.

Here is exactly what to do:

1. HOMEPAGE — TRUST/VALUES SECTION (in src/pages/index.astro):
   - Find the current section with 4 abstract value cards (Trustworthiness, Honesty, Dedication, Reliability)
   - Replace it with a "Why Trust Us" or "Our Track Record" section containing CONCRETE PROOF:
     - A prominent license badge: "Nevada Contractor License #66668 — $6.8 Million Limit — Licensed Since 2006" — display this as a styled badge or banner with an official/certificate feel, using the navy accent color
     - A row of 3-4 fact boxes: "20+ Years in Business", "500+ Projects Completed", "Licensed & Insured", "Established 2004" — styled as clean, simple stat boxes (similar to the hero stat bar but integrated into the page flow)
   - Add a TESTIMONIALS subsection below the facts:
     - Build 2-3 testimonial cards in a row (stacked on mobile)
     - Each card has: a quote in italics, client name (bold), client company/role, and an optional small circular avatar photo
     - Use placeholder content:
       - Card 1: Quote: "Placeholder testimonial — client feedback coming soon." Name: "Client Name" Company: "Company Name"
       - Card 2: Quote: "Placeholder testimonial — client feedback coming soon." Name: "Client Name" Company: "Company Name"
       - Card 3: Quote: "Placeholder testimonial — client feedback coming soon." Name: "Client Name" Company: "Company Name"
     - For avatar images, use a simple circle with initials or a generic silhouette SVG
     - Add <!-- PLACEHOLDER: Replace with real client testimonial, name, company, and photo --> comment on each card
     - Style: white card background, subtle border, a small accent-colored quote mark icon at the top

2. ABOUT PAGE (src/pages/about.astro):
   - Change the page title from "Our Philosophy" to "About Us"
   - Keep the Mission section content but clean up its presentation to match the new palette
   - REMOVE the duplicated core values cards (Trustworthiness, Honesty, Dedication, Reliability) — these already appear on the homepage and don't need to repeat in the same card format here
   - Keep the "Why Choose Us" section (Licensed & Insured, International Experience, Client Relationships)
   - COMPANY HISTORY TIMELINE: Keep the existing entries (2004 Founded, 2006 Licensed, $6.8M Limit). Add 2-3 placeholder milestone entries between them:
     - "2010 — Milestone Title" with description "Project milestone description coming soon" <!-- PLACEHOLDER: Replace with real project milestone -->
     - "2015 — Milestone Title" with description "Project milestone description coming soon" <!-- PLACEHOLDER: Replace with real project milestone -->
     - "2020 — Milestone Title" with description "Project milestone description coming soon" <!-- PLACEHOLDER: Replace with real project milestone -->
   - ADD A TEAM SECTION after the company history:
     - Section heading: "Our Leadership" or "Meet the Team"
     - Build 2-4 team member cards in a grid (2 columns on desktop, 1 on mobile)
     - Each card: circular photo area (top), name, title/role, 2-sentence bio below
     - Use placeholder content:
       - Photo: a neutral gray circle with a generic person silhouette SVG icon
       - Name: "Team Member"
       - Role: "Role Title"
       - Bio: "Bio coming soon."
     - Add <!-- PLACEHOLDER: Replace with real team member photo, name, role, and bio --> on each card
     - Style: white card, subtle border, rounded corners, centered content

After completing all changes, run `npm run build` to verify no build errors. Do NOT proceed to any other changes. Stop and report what was done.
```

---

## PHASE 6 — 3D Panoramic Viewer Integration

**Priority:** MEDIUM — Adds a flagship differentiator feature.
**Content needed from owner:** None. The 3D content is already hosted at the ShineWonder URL.

### What Changes
- **Create a new `/virtual-tours` page** with a full-viewport iframe embedding the ShineWonder 360° panoramic viewer
- **Add a homepage teaser section** with a static placeholder thumbnail + "Explore in 3D" button linking to the virtual tours page (no iframe on homepage)
- **Update navigation:** Add "Virtual Tours" to the header menu and footer links
- **Iframe details:** lazy loading, gyroscope/accelerometer permissions, fullscreen support, responsive container, loading state
- **Source URL:** `https://vr.shinewonder.com/pano/page/publik/pklimit?inf=ECLEFEG@EDDLGDCDA`

### Windsurf Prompt — Phase 6

```
I need you to integrate a 3D panoramic project viewer into this Astro + Tailwind website. Phases 1-5 are complete. The site uses a warm light palette with navy (#1B3A5C) and amber (#C17817) accents, Plus Jakarta Sans headings, Inter body text.

DO NOT change any existing pages or sections beyond what is listed below. Stop after completing this and report what was done.

The 3D panoramic content is hosted externally at this URL:
https://vr.shinewonder.com/pano/page/publik/pklimit?inf=ECLEFEG@EDDLGDCDA

Here is exactly what to do:

1. CREATE A NEW PAGE: src/pages/virtual-tours.astro
   - Use the existing BaseLayout.astro layout
   - Page title and meta: "Virtual Tours — Global Management & Construction NV"
   - Page content structure:
     a. Page header: "Explore Our Work in 360°" in the heading font, centered, with a brief description below: "Step inside our completed projects. Drag to look around, pinch to zoom, and explore the craftsmanship and quality of our work firsthand."
     b. Interaction hints: A small row of 3 hint items below the description (before the viewer):
        - Icon + "Drag to look around"
        - Icon + "Pinch to zoom"
        - Icon + "Click hotspots to navigate"
        Style these as small, muted text with simple icons — not prominent, just helpful for first-time users
     c. IFRAME VIEWER: The main content — embed the ShineWonder URL in an iframe:
        - Wrap in a responsive container: width 100%, max-width: 1400px, centered, aspect ratio 16:9, rounded-xl with a subtle shadow
        - iframe attributes: src="https://vr.shinewonder.com/pano/page/publik/pklimit?inf=ECLEFEG@EDDLGDCDA" width="100%" height="100%" frameborder="0" allow="gyroscope; accelerometer; fullscreen" loading="lazy" style="border:0; border-radius: inherit;"
        - Add a loading state: before the iframe loads, show a skeleton placeholder (light gray animated pulse background) with centered text "Loading 360° Tour..." that gets hidden once the iframe loads. Use an iframe onload event or Intersection Observer
     d. Below the viewer: An "Open Full Screen" button that uses the Fullscreen API to make the iframe go fullscreen. Style: navy background, white text, small and subtle
     e. Below that: A CTA section — "Interested in what you see?" with a "Contact Us" button linking to /contact and a phone number link to 702-890-0900

2. HOMEPAGE TEASER SECTION (in src/pages/index.astro):
   - Add a new section AFTER the services preview section and BEFORE the trust/values section
   - Section heading: "See Our Work Up Close" in the heading font
   - Description: "Experience our completed projects in immersive 360° — explore every detail from anywhere."
   - Display a large rectangular image container (aspect ratio 16:9, rounded-xl, max-width ~900px, centered) with:
     - A placeholder construction interior/exterior image from the existing src/assets/images/ folder (use one of the existing images). Add <!-- PLACEHOLDER: Replace with screenshot from 360° virtual tour --> comment
     - A centered overlay button: a circular play-style button with "360°" text or an explore icon, semi-transparent dark background, white text/icon. On hover: slight scale up
     - The entire container links to /virtual-tours
   - Keep this section lightweight — NO iframe, NO external scripts. Just an image + link

3. UPDATE NAVIGATION:
   - In src/components/Header.astro: Add "Virtual Tours" as a nav link, positioned after "Services" and before "About". Link to /virtual-tours
   - In src/components/Footer.astro: Add "Virtual Tours" to the quick links column, linking to /virtual-tours

4. MOBILE CONSIDERATIONS:
   - The iframe viewer on the virtual-tours page should be full-width on mobile with a taller aspect ratio (closer to 4:3 or even square) so it's usable on small screens
   - The interaction hints should stack vertically on mobile
   - The homepage teaser section should be full-width on mobile with proper padding

After completing all changes, run `npm run build` to verify no build errors. Do NOT proceed to any other changes. Stop and report what was done.
```

---

## PHASE 7 — Portfolio / Projects Section

**Priority:** LOWER — Requires placeholder content that will be swapped later.
**Content needed from owner:** Project names, descriptions, and photos (will use placeholders for now).

### What Changes
- Add a "Our Projects" section on the homepage (after the hero/stats, before services) with 4-6 project cards in a grid
- Each card: placeholder photo, project name, project type, 1-2 sentence description — all marked for swap
- Optionally create a dedicated `/projects` page if the homepage section warrants it

### Windsurf Prompt — Phase 7

```
I need you to add a project portfolio/showcase section to the homepage of this Astro + Tailwind website. Phases 1-6 are complete.

DO NOT change any existing sections or pages. Only ADD the new portfolio section. Stop after completing this and report what was done.

IMPORTANT: All content in this section is PLACEHOLDER and will be replaced by the owner later. Every placeholder element must have an HTML comment: <!-- PLACEHOLDER: description -->. The section must look polished and intentional even with placeholder content.

Here is exactly what to do:

1. ADD A "OUR PROJECTS" SECTION on the homepage (src/pages/index.astro):
   - Position it AFTER the stat bar / hero section and BEFORE the services preview section
   - Section heading: "Our Projects" or "Recent Work" in the heading font, centered
   - Subheading: "A selection of our completed construction and management projects across Las Vegas."

2. BUILD A PROJECT GRID:
   - 4-6 project cards in a responsive grid: 3 columns on desktop, 2 on tablet, 1 on mobile
   - Each card structure:
     - Image area: rectangular (aspect ratio 4:3 or 3:2), rounded top corners, object-cover
     - Use the existing images from src/assets/images/ as placeholder photos (reuse image-01, image-02, etc. — resize/crop via CSS as needed). Add <!-- PLACEHOLDER: Replace with real project photo --> on each
     - Below the image: project name (bold, heading font), project type tag (small badge, e.g., "Commercial Build", "Tenant Improvement", "New Development"), and 1-2 sentence description
     - Use placeholder content for each card:
       - Card 1: "Project Name" / "Commercial Construction" / "Project description coming soon."
       - Card 2: "Project Name" / "Tenant Improvement" / "Project description coming soon."
       - Card 3: "Project Name" / "Design Build" / "Project description coming soon."
       - Card 4: "Project Name" / "New Development" / "Project description coming soon."
       (Add 5-6 cards if the grid looks better with more)
     - Add <!-- PLACEHOLDER: Replace with real project name, type, and description --> on each card
   - Card styling: white background, subtle border, rounded-xl, on hover a subtle shadow appears (no lift/translate)
   - Project type tag: small pill/badge shape, light navy background (bg-blue-50 or similar), navy text

3. OPTIONAL "View All Projects" link below the grid, styled with the amber accent, linking to # for now (can be connected to a /projects page later if needed)

After completing all changes, run `npm run build` to verify no build errors. Do NOT proceed to any other changes. Stop and report what was done.
```

---

## PHASE 8 — Photography & Iconography Cleanup

**Priority:** LOWEST — Final polish pass. Some items depend on real photos being provided.
**Content needed from owner:** Real project photos and team photos when available. Placeholder approach continues until then.

### What Changes
- Audit all remaining JPG icon images (icon-01 through icon-04) and replace with proper inline SVG icons if any were missed in Phase 4
- Ensure every placeholder image across the site has a `<!-- PLACEHOLDER -->` comment describing the ideal replacement
- Evaluate the globe wireframe logo usage — if it still appears anywhere after Phase 1/3 removals, decide on treatment (pair it with construction imagery or flag for a branding discussion)
- Final consistency pass: make sure all images have lazy loading, proper alt text, and consistent aspect ratios

### Windsurf Prompt — Phase 8

```
I need you to do a final photography and iconography cleanup pass across the entire site. All previous phases (1-7) are complete.

DO NOT change layouts, content structure, or functionality. This is a visual asset cleanup pass only. Stop after completing this and report what was done.

Here is exactly what to do:

1. ICON AUDIT:
   - Search the entire project for any remaining usage of the JPG icon files: icon-01-191x188.jpg, icon-02-250x247.jpg, icon-03-232x231.jpg, icon-04-225x222.jpg
   - If any are still being used anywhere, replace them with appropriate inline SVG icons styled in the navy accent color (#1B3A5C). Use the same icon style established in Phase 4 (simple, clean, construction-relevant)
   - If the JPG icon files are no longer referenced anywhere, delete them from src/assets/images/

2. PLACEHOLDER COMMENT AUDIT:
   - Go through every .astro file in src/pages/ and src/components/
   - Check every <img> tag and background image reference
   - Ensure every placeholder image has an HTML comment directly above or on it: <!-- PLACEHOLDER: specific description of what replacement image should be -->
   - If any images are missing this comment and are clearly placeholder/stock content, add the comment
   - Add descriptive alt text to any images missing it

3. LOGO CHECK:
   - Check if the wireframe globe SVG (from globe-logo.svg or the inline hero SVG) still appears anywhere in the site after Phases 1-3
   - If it appears in the header/nav as part of the company branding, leave it but add a comment: <!-- NOTE: Globe logo — evaluate whether to update for construction branding -->
   - If it appears decoratively elsewhere, remove it

4. IMAGE OPTIMIZATION:
   - Ensure all <img> tags have loading="lazy" (except the hero image which should load eagerly)
   - Ensure all images have appropriate alt text describing the content
   - Ensure image aspect ratios are consistent within each section (all project cards same ratio, all team cards same ratio, etc.)

5. FINAL VISUAL CONSISTENCY CHECK:
   - Scan all pages for any remaining dark-mode artifacts: bg-dark-*, text-white used as default body text, gradient orb remnants, glassmorphism effects, rainbow accent colors
   - Fix any stragglers to match the warm light palette established in Phase 1

After completing all changes, run `npm run build` to verify no build errors. Report a summary of everything that was cleaned up.
```

---

## Phase Summary

| Phase | Focus | Content Needed | Priority |
|-------|-------|---------------|----------|
| 1 | Color, Typography, Animation Cleanup | None | HIGHEST |
| 2 | Header, Footer, Navigation, Contact Page | None | HIGH |
| 3 | Hero Section Rebuild | None (placeholder image) | HIGH |
| 4 | Services Section Rework | None (existing content) | MEDIUM |
| 5 | About Page & Trust/Values + Testimonials/Team Placeholders | Placeholders for now | MEDIUM |
| 6 | 3D Panoramic Viewer Integration | None (hosted externally) | MEDIUM |
| 7 | Project Portfolio Section | Placeholders for now | LOWER |
| 8 | Photography & Iconography Final Cleanup | Real photos when available | LOWEST |

---

## Placeholder Content Inventory

All placeholders are marked with `<!-- PLACEHOLDER: ... -->` comments for easy search-and-replace.

| Placeholder | Location | What to Provide Later |
|-------------|----------|-----------------------|
| Hero background photo | Homepage hero (Phase 3) | Wide-angle photo of a completed project or active job site |
| Project portfolio photos (4-6) | Homepage portfolio grid (Phase 7) | One photo per project — exterior or interior shot |
| Project names & descriptions (4-6) | Homepage portfolio grid (Phase 7) | Project name, type, 1-2 sentence description |
| Client testimonials (2-3) | Homepage trust section (Phase 5) | Client name, company/role, quote (2-3 sentences) |
| Client photos (optional, 2-3) | Homepage trust section (Phase 5) | Headshot or company logo per testimonial |
| Team member headshots (2-4) | About page team section (Phase 5) | Professional photo of each team member |
| Team member bios (2-4) | About page team section (Phase 5) | Name, title/role, 2-3 sentence bio |
| Timeline milestones (2-3) | About page history (Phase 5) | Year, milestone title, description |
| Virtual tour thumbnail | Homepage 360° teaser (Phase 6) | Screenshot from the ShineWonder panoramic viewer |
| Certification/partner logos | Footer & about page | Any industry affiliations or certification logos |

All placeholders are designed for zero-code swaps — replace the file or edit the text, no structural changes needed.
