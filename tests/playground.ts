// Part 1 — TypeScript catches mistakes before you run the test

let username = "student";
const retries = 3;
const isLoggedIn = false;

// Try changing "student" to a number — VS Code will show a red underline
console.log(username, retries, isLoggedIn);
// Part 2 — const vs let
const email = "student@test.com";    // const = cannot change
let attempts = 0;                     // let = can change later
attempts = 3;                         // OK
// email = "other@test.com";          // ERROR — uncomment to see red underline

// Template strings — inserting variables into text
const env = "staging";
const url = `https://${env}.example.com/login`;
console.log(url);  // https://staging.example.com/login
// Part 3 — Arrays and Objects
const browsers = ["chromium", "firefox", "webkit"];
console.log(browsers[0]);       // "chromium"
console.log(browsers.length);   // 3

// Object — group of related data
const user = {
  email: "john@test.com",
  password: "Secret123",
  isAdmin: false,
};
console.log(user.email);        // "john@test.com"

// Typed object — define the shape
type User = {
  email: string;
  password: string;
  role?: string;     // ? means optional
};

const admin: User = {
  email: "admin@test.com",
  password: "Admin123",
  role: "admin",
};

const guest: User = {
  email: "guest@test.com",
  password: "Guest123",
  // role is optional — OK to skip
};
// Part 4 — Destructuring (pulling values out of objects)

// Допустим у нас есть объект с данными для логина:
const credentials = { email: "john@test.com", password: "Secret123" };

// БЕЗ destructuring — обращаемся через точку:
console.log(credentials.email);      // "john@test.com"
console.log(credentials.password);   // "Secret123"

// С destructuring — вытаскиваем поля в отдельные переменные:
const { email: credEmail, password: credPass } = credentials;
// Что произошло:
//   credEmail = credentials.email = "john@test.com"
//   credPass  = credentials.password = "Secret123"
// Мы переименовали чтобы не конфликтовать с другими переменными выше

console.log(credEmail);    // "john@test.com"
console.log(credPass);     // "Secret123"
// Part 5 — Functions

// Обычная функция
// Что значит каждая часть:
//   function    — ключевое слово "это функция"
//   formatEmail — имя функции (ты его выбираешь)
//   (name: string) — параметр: функция принимает name, и он должен быть строкой
//   : string    — тип возврата: функция возвращает строку
function formatEmail(name: string): string {
  return `${name.toLowerCase()}@test.com`;
}

console.log(formatEmail("Alice"));   // "alice@test.com"
console.log(formatEmail("BOB"));     // "bob@test.com"

// Arrow function — короткая запись, делает то же самое
// Это как лямбда в Java: (параметры) -> { тело }
const buildUrl = (env: string): string => {
  return `https://${env}.example.com/login`;
};

console.log(buildUrl("staging"));    // "https://staging.example.com/login"
console.log(buildUrl("production")); // "https://production.example.com/login"

// Функция без возврата — : void (как void в Java)
function logUser(email: string): void {
  console.log(`Logging in as: ${email}`);
  // нет return — функция просто делает действие
}

logUser("alice@test.com");  // выведет: "Logging in as: alice@test.com"
// Part 6 — async/await

// Представь: ты в ресторане
// БЕЗ await = заказал еду и сразу ешь пустую тарелку
// С await   = заказал еду, ДОЖДАЛСЯ, потом ешь

// async — помечает функцию: "внутри будут операции с ожиданием"
// await — "жди пока эта операция завершится"

// Пример: имитация загрузки страницы
async function fakeFetch(url: string): Promise<string> {
  // Promise<string> = "обещание вернуть строку когда-нибудь"
  // Это как Future<String> в Java
  return `Loaded: ${url}`;
}

// Чтобы вызвать async-функцию, нужен await
// А await можно использовать только внутри другой async-функции
async function demo() {
  const result = await fakeFetch("https://example.com");
  console.log(result);  // "Loaded: https://example.com"
}

demo();

// В Playwright это выглядит так:
// async ({ page }) => {                          — функция помечена async
//   await page.goto("https://example.com");      — жди загрузки страницы
//   await page.getByRole("button").click();      — жди клика
//   await expect(page).toHaveTitle(/Example/);   — жди проверки
// }
// Part 7 — Common TypeScript errors

// ERROR #1: string | undefined
// Значение может быть строкой, а может НЕ существовать
function printCode(code: string | undefined) {

     // ERROR! — code может быть undefined
  if (code) {
    console.log(code.toUpperCase());
   code.toUpperCase();// Fix: проверь сначала, потом используй   // OK — TypeScript теперь знает что code точно string
  }
  
  
}
printCode("ABC");        // выведет: "ABC"
printCode(undefined);    // ничего не выведет — if не пропустил

// ERROR #2: Property does not exist (опечатка или несуществующее поле)
const config = { baseURL: "https://staging.example.com" };
// console.log(config.baseUrl);  // ERROR — "baseUrl" не существует, правильно "baseURL"
console.log(config.baseURL);     // OK

// ERROR #3: Type mismatch (неправильный тип)
function fillField(value: string) {
  console.log(value);
}
// fillField(42);        // ERROR — number нельзя передать как string
fillField("42");         // OK — "42" это string
fillField(String(42));   // OK — преобразовали number в string

// Part 8 — Imports (how files connect to each other)

// Правило 1: имя пакета (без точки) = библиотека из node_modules/
// import { test, expect } from '@playwright/test';
//   @playwright/test — это пакет, установлен через npm

// Правило 2: путь с точкой (./ или ../) = твой собственный файл
// import { LoginPage } from './pages/LoginPage';
//   ./pages/LoginPage — файл в твоём проекте, относительно текущего

// Правило 3: если import неправильный — VS Code покажет красное,
// тест даже не запустится

// Шпаргалка:
//   '@...'  или просто имя  →  библиотека (node_modules/)
//   './'    →  файл рядом (в той же папке)
//   '../'   →  файл на уровень выше

// Part 9 — Reading a real Playwright test (line by line)

// Вот как выглядит настоящий тест. Разбираем КАЖДУЮ строку:

// import { test, expect } from "@playwright/test";
//   ↑ Загружаем test и expect из библиотеки Playwright (Part 8)

// test.describe("Login page", () => {
//   ↑ test.describe — группа связанных тестов (как папка для тестов)
//   ↑ "Login page" — название группы
//   ↑ () => { — начало arrow function (Part 5)

//   test.beforeEach(async ({ page }) => {
//     ↑ beforeEach — выполняется ПЕРЕД КАЖДЫМ тестом в группе
//     ↑ async — будут await внутри (Part 6)
//     ↑ ({ page }) — destructuring, достаём page (Part 4)
//     await page.goto("https://example.com/login");
//     ↑ await — жди загрузки (Part 6)
//     ↑ page.goto — открой URL в браузере
//   });

//   test("should show error for wrong password", async ({ page }) => {
//     ↑ один тест с понятным названием
//     await page.getByPlaceholder("Email").fill("user@test.com");
//     ↑ getByPlaceholder("Email") — найди поле с placeholder "Email" (locator)
//     ↑ .fill("user@test.com") — впечатай этот текст
//     await page.getByPlaceholder("Password").fill("wrongpassword");
//     await page.getByRole("button", { name: "Login" }).click();
//     ↑ getByRole("button", { name: "Login" }) — найди кнопку с текстом "Login"
//     ↑ .click() — нажми на неё

//     const errorMessage = page.getByText("Invalid credentials");
//     ↑ const — сохраняем locator в переменную (Part 2)
//     ↑ БЕЗ await — locator это просто "указатель", он ещё ничего не делает
//     await expect(errorMessage).toBeVisible();
//     ↑ await expect — ПРОВЕРКА: этот элемент должен быть видимым
//   });
// });