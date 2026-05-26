import { test, expect } from '@playwright/test';

// POSITIVE test — checks that something IS as expected
test('page has the correct title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

// NEGATIVE test — checks that something is NOT present
test('page does not contain error text', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByText('404 Page Not Found')).not.toBeVisible();
});