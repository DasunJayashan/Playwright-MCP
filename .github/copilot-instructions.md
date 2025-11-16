# Copilot Instructions for Playwright Automation - Page Object Model (JavaScript)

## Project Overview

This is a **Playwright automation testing framework** using the **Page Object Model (POM)** pattern with JavaScript. The project is designed for test automation, web scraping, and browser-based QA workflows.

## Architecture

**Key Components:**
- **`pages/`** - Page Object classes that encapsulate UI interactions
  - `BasePage.js` - Abstract base class with common methods
  - `LoginPage.js`, `HomePage.js` - Page-specific objects
- **`tests/`** - Playwright test specifications (`.spec.js` files)
- **`utils/`** - Helper utilities for test data and browser operations
- **`playwright.config.js`** - Playwright configuration (browsers, retries, reporting)
- No TypeScript config needed - pure JavaScript project

**Data Flow:**
1. Tests create page object instances
2. Page objects interact with browser via Playwright API
3. Assertions validate expected behavior
4. Reports generated in `test-results/` directory

## Critical Workflows

### Running Tests
```powershell
npm install                    # Install dependencies
npx playwright install         # Install browsers
npm test                       # Run all tests
npm run test:headed           # Run with visible browser
npm run test:ui               # Interactive test runner
npm run test:debug            # Debug mode with inspector
```

### Creating New Page Objects
1. Create class extending `BasePage` in `pages/`
2. Define selectors as class properties in constructor
3. Implement page-specific action methods
4. Reuse `BasePage` methods for common operations

**Example:**
```javascript
const BasePage = require('./BasePage');

class MyPage extends BasePage {
  constructor(page) {
    super(page);
    this.headerText = 'h1';
    this.submitButton = 'button[type="submit"]';
  }
  
  async navigateAndVerify() {
    await this.goto('https://example.com');
    return await this.getText(this.headerText);
  }
}

module.exports = MyPage;
```

## Key Patterns & Conventions

### Page Object Pattern
- **Selectors** are class properties (encapsulated)
- **Actions** are methods that interact with the page
- **Assertions stay in tests**, not in page objects
- **BasePage** provides common methods to avoid duplication

### Test Structure
Tests follow the **Arrange-Act-Assert (AAA)** pattern:
```javascript
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('should perform action', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  
  // Act
  await loginPage.login('user', 'pass');
  
  // Assert
  const url = await loginPage.getCurrentUrl();
  expect(url).toContain('dashboard');
});
```

### Selectors
- Use stable, semantic selectors (IDs, data attributes)
- Avoid brittle XPath when possible
- Store selectors as class properties
- Example: `#username`, `[data-testid="submit"]`, `button[type="submit"]`

### Asynchronous Handling
- Always `await` Playwright operations
- Use `waitForElement()` and `waitForNavigation()` for synchronization
- Configure timeouts in `playwright.config.ts`

## Dependencies & Integration Points

- **@playwright/test** - Test runner and assertion library
- **JavaScript (ES6+)** - Modern JavaScript for automation code
- **Playwright browsers** - Chrome, Firefox, WebKit, and mobile emulation
- **Node.js 16+** - Runtime environment

## File Reference

- `pages/BasePage.js` - Base class with 10+ common methods
- `pages/LoginPage.js` - Concrete page object example
- `tests/example.spec.js` - Test examples using page objects
- `utils/TestDataHelper.js` - Test data and random generators
- `utils/BrowserHelper.js` - Browser-level operations
- `playwright.config.js` - Parallel execution, reporting, device configs

## Notes for AI Agents

- **Page objects are the core abstraction** - Always use page objects in tests
- **No custom UI framework** - This is pure Playwright with JavaScript
- **Minimal config** - Configuration is straightforward and editable
- **Extensible** - Add new page objects following existing patterns
- **Simple and readable** - JavaScript without TypeScript compilation overhead
- **Browser support** - Tests can run on Chromium, Firefox, WebKit, and mobile devices
