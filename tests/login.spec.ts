import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("standard user can log in and see inventory page", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page, "Should redirect to inventory").toHaveURL(/inventory/);
  });

  test("locked user cannot log in and sees error", async () => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(loginPage.errorMessage, "Locked user error should appear").toContainText("locked out");
  });

  test("wrong password shows error message", async () => {
    await loginPage.login("standard_user", "wrong_password");
    await expect(loginPage.errorMessage, "Wrong password error should appear").toContainText("do not match");
  });

  test("empty username shows validation error", async () => {
    await loginPage.login("", "secret_sauce");
    await expect(loginPage.errorMessage, "Empty username error should appear").toContainText("Username is required");
  });
});