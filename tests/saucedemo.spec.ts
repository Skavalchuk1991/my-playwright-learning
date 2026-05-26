import { test, expect } from '@playwright/test';

test.describe('SauceDemo', () => {

  // Runs before EACH test — logs in automatically
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('products page is displayed after login', async ({ page }) => {
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('can add item to cart', async ({ page }) => {
    // Click "Add to cart" on the first item
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Cart badge should show "1"
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('can remove item from cart', async ({ page }) => {
    // Add item
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Remove item
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Cart badge should disappear
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('failed login shows error message', async ({ page }) => {
    // This test needs its OWN login flow with wrong credentials
    // So we navigate fresh
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('wrong_user');
    await page.getByPlaceholder('Password').fill('wrong_pass');
    await page.getByRole('button', { name: 'Login' }).click();

    // Error message should appear
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('cart page shows added items', async ({ page }) => {
    // Add item
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Go to cart
    await page.locator('.shopping_cart_link').click();

    // Verify item is in cart
    await expect(page.locator('.cart_item')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  });

});