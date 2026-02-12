import { test, expect, devices } from '@playwright/test';

const mobileDevices = [
  { name: 'iPhone 14', config: devices['iPhone 14'] },
  { name: 'Pixel 7', config: devices['Pixel 7'] },
  { name: 'Galaxy S9+', config: devices['Galaxy S9+'] }
];

const pages = ['/', '/about', '/services', '/gallery', '/contact'];

for (const device of mobileDevices) {
  for (const pagePath of pages) {
    test(`${device.name} - ${pagePath}`, async ({ browser }) => {
      const context = await browser.newContext({ ...device.config });
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
