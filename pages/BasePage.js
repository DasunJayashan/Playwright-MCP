/**
 * BasePage - Base class for all page objects
 * Contains common methods and interactions used across all pages
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Get the current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Get the page title
   */
  async getPageTitle() {
    return this.page.title();
  }

  /**
   * Click on an element using selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill input field with text
   */
  async fillText(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of an element
   */
  async getText(selector) {
    return (await this.page.textContent(selector)) || '';
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Select dropdown option
   */
  async selectDropdown(selector, value) {
    await this.page.selectOption(selector, value);
  }

  /**
   * Press keyboard key
   */
  async pressKey(key) {
    await this.page.press('body', key);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(filename) {
    await this.page.screenshot({ path: `screenshots/${filename}` });
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Close the page
   */
  async close() {
    await this.page.close();
  }
}

module.exports = BasePage;
