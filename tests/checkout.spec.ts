import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe("Checkout", () => {
  test("user can complete checkout and see success message", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step("Login as standard user", async () => {
      await loginPage.open();
      await loginPage.login("standard_user", "secret_sauce");
    });

    await test.step("Add product to cart", async () => {
      await inventoryPage.addProductToCart("sauce-labs-backpack");
      await expect(inventoryPage.cartBadge, "Badge should show 1").toHaveText("1");
    });

    await test.step("Open cart and start checkout", async () => {
      await inventoryPage.openCart();
      await expect(cartPage.cartItems, "Cart should show added item").toBeVisible();
      await cartPage.checkout();
    });

    await test.step("Fill checkout info", async () => {
      await checkoutPage.fillInfo("John", "Smith", "12345");
    });

    await test.step("Complete order", async () => {
      await checkoutPage.finish();
      await expect(checkoutPage.successMessage, "Success message should be visible").toBeVisible();
    });
  });
});