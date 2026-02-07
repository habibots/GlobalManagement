/**
 * Scroll-triggered fade-in animations using Intersection Observer
 * Respects prefers-reduced-motion for accessibility
 */

function initScrollAnimations() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // If user prefers reduced motion, make all elements visible immediately
    document.querySelectorAll('.scroll-fade').forEach(el => {
      el.classList.add('animate-visible');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-fade class
  document.querySelectorAll('.scroll-fade').forEach(el => {
    observer.observe(el);
  });

  // Staggered animations removed — all items fade in together
  // stagger-parent elements are now observed by the main observer
  document.querySelectorAll('.stagger-parent').forEach(el => {
    observer.observe(el);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

// Re-initialize on Astro page transitions
document.addEventListener('astro:page-load', initScrollAnimations);
