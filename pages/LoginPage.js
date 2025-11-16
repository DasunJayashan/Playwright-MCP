const BasePage = require('./BasePage');

/**
 * LoginPage - Page Object for login functionality
 * Encapsulates all login-related selectors and actions
 */
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors for SauceDemo site
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = 'h3[data-test="error"]';
    this.inventoryContainer = '[data-test="inventory-container"]';
  }

  /**
   * Navigate to login page
   */
  async goto() {
    await super.goto('https://www.saucedemo.com/');
  }

  /**
   * Login with username and password
   */
  async login(username, password) {
    await this.fillText(this.usernameInput, username);
    await this.fillText(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.waitForNavigation();
  }

  /**
   * Get error message text
   */
  async getErrorMessage() {
    await this.waitForElement(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed() {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Check if login button is visible
   */
  async isLoginButtonVisible() {
    return await this.isVisible(this.loginButton);
  }

  /**
   * Check if inventory page is loaded (success indicator)
   */
  async isInventoryPageLoaded() {
    return await this.isVisible(this.inventoryContainer);
  }
}

module.exports = LoginPage;
