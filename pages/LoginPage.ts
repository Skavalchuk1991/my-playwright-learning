import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  // Сохраняем page — через него работаем с браузером
  readonly page: Page;
  // Все локаторы для страницы логина
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // constructor запускается когда пишешь new LoginPage(page)
  // Получает page из теста и настраивает все локаторы
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Открыть страницу логина
  async open() {
    await this.page.goto("/");
  }

  // Залогиниться — заполнить поля и кликнуть Login
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}