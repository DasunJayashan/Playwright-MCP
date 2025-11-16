# Page Object Model - Quick Reference (JavaScript)

## Creating a New Page Object

**File: `pages/MyPage.js`**
```javascript
const BasePage = require('./BasePage');

class MyPage extends BasePage {
  constructor(page) {
    super(page);
    // Define selectors
    this.header = 'h1.title';
    this.submitButton = 'button[type="submit"]';
    this.errorMessage = '.error';
  }

  // Define actions
  async fillForm(data) {
    // Use BasePage methods
  }

  async submit() {
    await this.click(this.submitButton);
  }
}

module.exports = MyPage;
```

## Creating Tests

**File: `tests/my.spec.js`**
```javascript
const { test, expect } = require('@playwright/test');
const MyPage = require('../pages/MyPage');

test.describe('My Feature', () => {
  test('should do something', async ({ page }) => {
    const myPage = new MyPage(page);
    
    // Act
    await myPage.goto('url');
    
    // Assert
    expect(true).toBeTruthy();
  });
});
```

## Common BasePage Methods

| Method | Usage |
|--------|-------|
| `goto(url)` | Navigate to URL |
| `click(selector)` | Click element |
| `fillText(selector, text)` | Fill input field |
| `getText(selector)` | Get element text |
| `isVisible(selector)` | Check if visible |
| `waitForElement(selector)` | Wait for element |
| `selectDropdown(selector, value)` | Select option |
| `takeScreenshot(filename)` | Capture screenshot |

## Using Utilities

**TestDataHelper:**
```javascript
const TestDataHelper = require('../utils/TestDataHelper');

const creds = TestDataHelper.VALID_CREDENTIALS;
const email = TestDataHelper.generateRandomEmail();
const randomStr = TestDataHelper.generateRandomString(15);
const randomNum = TestDataHelper.generateRandomNumber(1, 100);
```

**BrowserHelper:**
```javascript
const BrowserHelper = require('../utils/BrowserHelper');

await BrowserHelper.clearCookies(page);
await BrowserHelper.setCookie(page, 'name', 'value');
await BrowserHelper.setLocalStorage(page, 'key', 'value');
```

## Running Specific Tests

```powershell
npm test                                        # Run all tests
npm test tests/my.spec.js                      # Single file
npm test -- --grep "login"                     # By name
npm test -- --headed                           # Visible browser
npm test -- --project=chromium                 # Specific browser
npm test -- --debug                            # Debug mode
```

## Project Structure Reminder

```
pages/              # Page objects (extend BasePage)
tests/              # Test files (.spec.js)
utils/              # Helpers (TestDataHelper, BrowserHelper)
playwright.config.js # Test configuration
package.json        # Dependencies
```
