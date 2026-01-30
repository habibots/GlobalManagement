# ✨ PHASE 4: Contact Form & Animations

**Objective:** Implement functional contact form with Web3Forms and add professional animations

**Duration:** 3-4 hours

**Success Criteria:**
- ✅ Contact form sends to business Gmail
- ✅ Form validation working
- ✅ Spam protection active
- ✅ Smooth animations throughout
- ✅ Respects prefers-reduced-motion

---

## Tasks

### 1. Set Up Web3Forms (15 min)
- Sign up at web3forms.com with business Gmail
- Create access key for globalconstructionnv.com
- Save access key securely

### 2. Build ContactForm Component (1 hour)
**File:** `src/components/ContactForm.astro`

**Fields:**
- Name (text, required)
- Email (email, required)
- Phone (tel, optional)
- Subject (select, optional)
- Message (textarea, required)

**Hidden fields:**
- access_key (Web3Forms key)
- subject (email subject line)
- redirect (thank-you page URL)
- botcheck (honeypot for spam)

**Action:** https://api.web3forms.com/submit

### 3. Create Thank You Page (20 min)
**File:** `src/pages/thank-you.astro`
- Confirmation message
- Timeline: "We'll respond within 24 hours"
- Contact info as fallback
- Link to home

### 4. Integrate Form (15 min)
- Update `src/pages/contact.astro`
- Remove placeholder
- Import and use ContactForm
- Test layout

### 5. Test Contact Form (30 min)
- Valid submission → Check Gmail
- Missing fields → Validation errors
- Invalid email → Error
- Honeypot test
- Mobile usability

### 6. Add Hero Animations (45 min)
**Home page with Motion.dev:**
```astro
import { Motion } from 'motion/react';

<Motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  client:load
>
```

Animate: heading, tagline, CTA (staggered)

### 7. Service Card Animations (30 min)
**Tailwind hover effects:**
```html
<div class="
  transition-all duration-300
  hover:scale-105 hover:shadow-xl hover:-translate-y-2
">
```

### 8. Scroll Animations (45 min)
Create intersection observer for fade-in on scroll
Add to sections throughout site

### 9. Page Transitions (30 min)
Enhance View Transitions with custom CSS
Add transition:name to key elements

### 10. Micro-Interactions (30 min)
- Button press effects
- Input focus effects
- Link hover animations

### 11. Reduced Motion Support (15 min)
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Deliverables Checklist
- [ ] Web3Forms account created
- [ ] ContactForm component built
- [ ] Thank you page created
- [ ] Form integrated on contact page
- [ ] Form tested (emails arriving)
- [ ] Spam protection working
- [ ] Hero animations added
- [ ] Service card hovers
- [ ] Scroll animations
- [ ] Page transitions enhanced
- [ ] Micro-interactions added
- [ ] Reduced motion support
- [ ] Committed and deployed

---

# 📐 META PROMPT FOR PHASE 4

```
You are an Astro expert continuing Global Management & Construction. Phases 1-3 complete.

TASK: Implement functional contact form with Web3Forms and add professional animations.

PART A: CONTACT FORM

1. Web3Forms Setup:
   - User creates account at web3forms.com with business Gmail
   - User provides access key after creating it
   - Domain: globalconstructionnv.com

2. Build src/components/ContactForm.astro:

Form fields:
- name (text, required)
- email (email, required)  
- phone (tel, optional)
- subject (select dropdown, optional)
- message (textarea, required, rows=5)

Hidden fields:
```html
<input type="hidden" name="access_key" value="[USER_PROVIDED_KEY]">
<input type="hidden" name="subject" value="New Contact from Global Management Website">
<input type="hidden" name="redirect" value="https://[site-url]/thank-you">
<input type="checkbox" name="botcheck" class="hidden" style="display:none">
```

Form attributes:
- action="https://api.web3forms.com/submit"
- method="POST"
- HTML5 validation (required attributes)

Styling:
- Tailwind form classes
- Focus states: ring-2 ring-primary-500
- Submit button: primary color, loading state
- Responsive on mobile

3. Create src/pages/thank-you.astro:
- "Thank you for contacting us!"
- "We'll respond within 24 hours"
- Contact info display
- Link back to home

4. Update src/pages/contact.astro:
- Import ContactForm
- Replace placeholder
- Add introductory text

5. Test thoroughly:
- Submit form → Check business Gmail
- Test validation errors
- Test on mobile device

PART B: ANIMATIONS

**Animation Principles:**
- Subtle and professional
- 60fps performance
- Respect prefers-reduced-motion
- Mobile-friendly

**Hero Animations (Home page):**

Use Motion.dev:
```astro
---
import { Motion } from 'motion/react';
---

<Motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  client:load
>
  Global Management & Construction
</Motion.h1>
```

Stagger: heading (0s), tagline (0.2s), CTA (0.4s)

**Service Cards (Hover):**
```html
<div class="
  transition-all duration-300 ease-out
  hover:scale-105 hover:shadow-2xl hover:-translate-y-2
">
```

**Scroll Animations:**

Create src/scripts/scroll-animations.js:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeIn');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el));
```

Add to global.css:
```css
.scroll-fade {
  opacity: 0;
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

Add class to sections:
```html
<section class="scroll-fade">
```

**Page Transitions:**

Enhance in BaseLayout:
```astro
<style is:global>
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.3s;
  }
</style>
```

**Micro-Interactions:**

Buttons:
```css
.btn {
  @apply transition-transform duration-150 active:scale-95;
}
```

Inputs:
```css
input:focus, textarea:focus {
  @apply ring-2 ring-primary-500 border-primary-500 transition-all;
}
```

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Deploy: Commit "Phase 4: Contact form and animations", push, test live

SUCCESS CRITERIA:
- ✅ Form sends emails to business Gmail
- ✅ Form validation works
- ✅ Spam protection active
- ✅ Hero animations smooth
- ✅ Card hovers work
- ✅ Scroll animations trigger
- ✅ Page transitions smooth
- ✅ Reduced motion respected
- ✅ Mobile performance good

NOTE: User must provide Web3Forms access key before form can be implemented.
```
