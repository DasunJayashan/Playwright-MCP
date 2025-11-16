# Playwright Automation - Page Object Model (JavaScript)

[![Playwright Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright.yml)
[![SauceDemo Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/saucedemo.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/saucedemo.yml)

A comprehensive automation testing framework using Playwright with JavaScript and the Page Object Model pattern.

## Project Structure

```
├── pages/                      # Page Object classes
│   ├── BasePage.js            # Base class with common actions
│   ├── LoginPage.js           # Login page object
│   └── HomePage.js            # Home page object
├── tests/                      # Test specifications
│   └── example.spec.js        # Example test cases
├── utils/                      # Utility classes
│   ├── BrowserHelper.js       # Browser-related utilities
│   └── TestDataHelper.js      # Test data management
├── config/                     # Configuration files
├── playwright.config.js        # Playwright configuration
└── package.json               # Project dependencies
```

## Setup Instructions

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

### Running Tests

**Run all tests:**
```bash
npm test
```

**Run tests in headed mode (see browser):**
```bash
npm run test:headed
```

**Run tests in UI mode (interactive):**
```bash
npm run test:ui
```

**Debug tests:**
```bash
npm run test:debug
```

**Generate test code via Codegen:**
```bash
npm run codegen
```

**View test report:**
```bash
npm run report
```

## Page Object Pattern

### BasePage Class
The `BasePage` class provides common methods used across all page objects:
- Navigation (`goto`, `getCurrentUrl`)
- Element interaction (`click`, `fillText`, `getText`)
- Element visibility checks (`isVisible`, `waitForElement`)
- Form interactions (`selectDropdown`, `pressKey`)
- Utility methods (`takeScreenshot`, `waitForNavigation`)

### Page Objects
Each page object extends `BasePage` and encapsulates:
- Page-specific selectors
- Page-specific actions
- Navigation logic

**Example: LoginPage**
```javascript
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = 'button[type="submit"]';
  }

  async login(username, password) {
    await this.fillText(this.usernameInput, username);
    await this.fillText(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}

module.exports = LoginPage;
```

### Writing Tests
Tests use page objects for interactions:
```typescript
test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('username', 'password');
  expect(page.url()).toContain('dashboard');
});
```

## Test Data

Use `TestDataHelper` for test data management:
```javascript
const TestDataHelper = require('../utils/TestDataHelper');

const credentials = TestDataHelper.VALID_CREDENTIALS;
const randomEmail = TestDataHelper.generateRandomEmail();
const randomString = TestDataHelper.generateRandomString(15);
const randomNumber = TestDataHelper.generateRandomNumber(1, 100);
const timestamp = TestDataHelper.getCurrentTimestamp();
const formattedDate = TestDataHelper.getFormattedDate();
```

## Browser Utilities

Use `BrowserHelper` for browser-level operations:
```javascript
const BrowserHelper = require('../utils/BrowserHelper');

await BrowserHelper.clearCookies(page);
await BrowserHelper.setCookie(page, 'name', 'value');
const cookies = await BrowserHelper.getCookies(page);

await BrowserHelper.setLocalStorage(page, 'key', 'value');
const value = await BrowserHelper.getLocalStorage(page, 'key');
await BrowserHelper.clearLocalStorage(page);
```

## Configuration

### Playwright Config (`playwright.config.js`)
- Multiple browsers (Chromium, Firefox, WebKit)
- Mobile device testing
- Screenshots on failure
- Video recording on failure
- HTML test reports
- Parallel execution
- Retries on CI

### TypeScript Config (`tsconfig.json`)
- Path aliases for easy imports
  - `@pages/*` → `pages/*`
  - `@tests/*` → `tests/*`
  - `@utils/*` → `utils/*`

## Best Practices

1. **Single Responsibility** - Each page object handles one page
2. **Descriptive Selectors** - Use meaningful selector names
3. **Action Methods** - Create methods for user actions
4. **Assertion in Tests** - Keep assertions in test files, not page objects
5. **Reusable Methods** - Use BasePage methods to avoid duplication
6. **Synchronization** - Use `waitForElement` and `waitForNavigation` appropriately

## Troubleshooting

**Module not found errors:** Run `npm install` to install all dependencies

**Browser not found:** Run `npx playwright install`

**Port already in use:** Change the port in `playwright.config.js`

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-page)
- [JavaScript Guide](https://playwright.dev/docs/intro)

## CI/CD Pipeline

This project includes automated testing with GitHub Actions:

- **Playwright Tests**: Runs across Node.js 18/20 and Chromium/Firefox/WebKit
- **SauceDemo Tests**: Dedicated workflow for SauceDemo test suite
- **Automated Reports**: HTML reports and artifact uploads
- **Daily Scheduled Tests**: Runs automatically at 2 AM UTC

See [CI_CD_SETUP.md](./CI_CD_SETUP.md) for complete pipeline documentation.
