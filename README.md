# Final Project — Playwright Test Suite

## Test target
SauceDemo (https://www.saucedemo.com)

## Covered user journey
Login → product selection → cart → checkout

## Test cases
- Standard user can log in and see inventory page
- Locked user cannot log in and sees error
- Wrong password shows error message
- Empty username shows validation error
- Cart badge shows correct count after adding product
- Cart page shows the name of added product
- Removing product updates the cart
- Adding multiple products shows correct badge count
- User can complete checkout and see success message

## Project structure
- `pages/` — Page Object classes (LoginPage, InventoryPage, CartPage, CheckoutPage)
- `tests/` — test specs (login.spec.ts, cart.spec.ts, checkout.spec.ts)
- `playwright.config.ts` — configuration

## How to run
```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## Notes
- No hard waits (`waitForTimeout`) are used
- Tests use semantic locators (`getByRole`, `getByPlaceholder`, `getByText`)
- Page Object Model separates locators from test logic
- All tests pass: 9 POM tests + 14 exercise tests = 23 total

## Known limitations
- Suite covers only the selected user journey (login, cart, checkout)
- Does not cover all edge cases (e.g. multiple users, payment errors)