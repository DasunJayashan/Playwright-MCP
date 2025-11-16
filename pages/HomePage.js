const BasePage = require('./BasePage');

/**
 * HomePage - Page Object for home/dashboard functionality
 * Encapsulates all home page-related selectors and actions
 */
class HomePage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.logoutButton = 'a[class*="logout"]';
    this.welcomeMessage = '.welcome-message';
    this.userProfile = '.user-profile';
    this.navigationMenu = 'nav.main-menu';
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await super.goto('https://practicetestautomation.com/');
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage() {
    await this.waitForElement(this.welcomeMessage);
    return await this.getText(this.welcomeMessage);
  }

  /**
   * Check if logout button is visible
   */
  async isLogoutButtonVisible() {
    return await this.isVisible(this.logoutButton);
  }

  /**
   * Logout from application
   */
  async logout() {
    await this.click(this.logoutButton);
    await this.waitForNavigation();
  }

  /**
   * Check if user is logged in (by checking if welcome message is visible)
   */
  async isUserLoggedIn() {
    return await this.isVisible(this.welcomeMessage);
  }

  /**
   * Get user profile information
   */
  async getUserProfile() {
    return await this.getText(this.userProfile);
  }

  /**
   * Check if navigation menu is visible
   */
  async isNavigationMenuVisible() {
    return await this.isVisible(this.navigationMenu);
  }
}

module.exports = HomePage;
