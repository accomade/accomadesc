import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders button with text', async ({ page }) => {
    const button = page.locator('button');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Inc');
  });

  test('button has proper ARIA attributes', async ({ page }) => {
    const button = page.locator('button');
    await expect(button).toHaveAttribute('type', 'button');
  });
});
