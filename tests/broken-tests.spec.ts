import { test, expect } from "@playwright/test";

// Broken test #1 — wrong locator
test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});

// Broken test #2 — wrong expected text
test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

// Broken test #3 — missing await
test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});


/* Broken test #1 — wrong locator
Root cause:   Placeholder text was "User Name" (with a space) but the actual placeholder on SauceDemo is "Username" (no space).
Fix:          Changed getByPlaceholder("User Name") to getByPlaceholder("Username").
How I verified: Ran npx playwright test tests/broken-tests.spec.ts --project=chromium — test passed.

Broken test #2 — wrong expected text
Root cause:   Two issues: (1) getByTestId("error") looks for data-testid attribute, but SauceDemo uses data-test attribute. (2) Expected text was "Username and password do not match" but the actual error text is "Epic sadface: Username and password do not match any user in this service".
Fix:          Changed getByTestId("error") to locator('[data-test="error"]') and updated the expected text to match the full error message including "Epic sadface:" prefix.
How I verified: Ran npx playwright test tests/broken-tests.spec.ts --project=chromium — test passed. Also verified visually with --headed flag.

Broken test #3 — missing await
Root cause:   The line page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click() was missing await. Without await, the test moved to the assertion before the click action completed.
Fix:          Added await before page.locator(...).click().
How I verified: Ran npx playwright test tests/broken-tests.spec.ts --project=chromium — test passed. */