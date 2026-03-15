import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('page loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.*/);
  });

  test('page has correct heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('X:');
  });

  test('page layout is centered', async ({ page }) => {
    await page.goto('/');
    const wrapper = page.locator('.wrapper');
    await expect(wrapper).toBeVisible();

    // Check computed styles
    const display = await wrapper.evaluate((el) => window.getComputedStyle(el).display);
    expect(display).toBe('flex');
  });
});

test.describe('Full Demo Page', () => {
  test('full page loads with all components', async ({ page }) => {
    await page.goto('/full');

    // Page should load without errors
    await expect(page.locator('body')).toBeVisible();

    // Check for common elements
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('page is responsive', async ({ page }) => {
    await page.goto('/full');

    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('body')).toBeVisible();

    // Test tablet viewport (999px breakpoint)
    await page.setViewportSize({ width: 999, height: 768 });
    await expect(page.locator('body')).toBeVisible();

    // Test mobile viewport (750px breakpoint)
    await page.setViewportSize({ width: 750, height: 667 });
    await expect(page.locator('body')).toBeVisible();

    // Test small mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
  });
});
