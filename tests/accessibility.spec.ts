import { test, expect } from '@playwright/test';
import { injectAxe, getAxeResults } from 'axe-playwright';
import type { Result } from 'axe-core';

const pages = ['/', '/about', '/services', '/gallery', '/contact'];

for (const page of pages) {
  test(`accessibility audit: ${page}`, async ({ page: browserPage }) => {
    await browserPage.goto(`http://localhost:4321${page}`);
    await browserPage.waitForLoadState('networkidle');

    await injectAxe(browserPage);
    const results = await getAxeResults(browserPage, undefined, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag22aa']
      }
    });

    const violations = results.violations.map((v: Result) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.length
    }));

    if (violations.length > 0) {
      console.log('Accessibility violations:', JSON.stringify(violations, null, 2));
    }

    expect(results.violations.filter((v: Result) => v.impact === 'critical' || v.impact === 'serious')).toHaveLength(0);
  });
}
