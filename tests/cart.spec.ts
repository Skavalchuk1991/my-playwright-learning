import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test.describe("Cart", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("cart badge shows correct count after adding product", async () => {
    await inventoryPage.addProductToCart("sauce-labs-backpack");
    await expect(inventoryPage.cartBadge, "Cart badge should show 1").toHaveText("1");
  });

  test("cart page shows the name of added product", async () => {
    await inventoryPage.addProductToCart("sauce-labs-backpack");
    await inventoryPage.openCart();
    await expect(cartPage.cartItems, "Cart should have 1 item").toHaveCount(1);
    await expect(cartPage.cartItems, "Cart should show Backpack").toContainText("Sauce Labs Backpack");
  });

  test("removing product updates the cart", async () => {
    await inventoryPage.addProductToCart("sauce-labs-backpack");
    await expect(inventoryPage.cartBadge).toHaveText("1");
    await inventoryPage.removeProduct("sauce-labs-backpack");
    await expect(inventoryPage.cartBadge, "Cart badge should disappear").not.toBeVisible();
  });

  test("adding multiple products shows correct badge count", async () => {
    await inventoryPage.addProductToCart("sauce-labs-backpack");
    await inventoryPage.addProductToCart("sauce-labs-bike-light");
    await expect(inventoryPage.cartBadge, "Cart badge should show 2").toHaveText("2");
  });
});