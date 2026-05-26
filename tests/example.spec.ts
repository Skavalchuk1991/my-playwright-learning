// import test and expect methods from playwright library
import { test, expect } from '@playwright/test';
//test if title contains Playwright in specified URL
test('has title', async ({ page }) => {
  //wait till navigate to https://playwright.dev/ URL
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
//test if page have heading with name "Instalation" after clicking get started link
test('get started link', async ({ page }) => {
  //wait until navigate to https://playwright.dev/
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
