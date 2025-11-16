/**
 * BrowserHelper - Utility class for browser-related operations
 */
class BrowserHelper {
  /**
   * Wait for a specific timeout
   */
  static async waitForTimeout(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Clear all cookies
   */
  static async clearCookies(page) {
    const context = page.context();
    await context.clearCookies();
  }

  /**
   * Get all cookies
   */
  static async getCookies(page) {
    const context = page.context();
    return await context.cookies();
  }

  /**
   * Set a cookie
   */
  static async setCookie(page, name, value) {
    const context = page.context();
    await context.addCookies([
      {
        name: name,
        value: value,
        url: await page.url(),
      },
    ]);
  }

  /**
   * Get local storage value
   */
  static async getLocalStorage(page, key) {
    return await page.evaluate(key => localStorage.getItem(key), key);
  }

  /**
   * Set local storage value
   */
  static async setLocalStorage(page, key, value) {
    await page.evaluate(
      ({ key, value }) => localStorage.setItem(key, value),
      { key, value }
    );
  }

  /**
   * Clear local storage
   */
  static async clearLocalStorage(page) {
    await page.evaluate(() => localStorage.clear());
  }
}

module.exports = BrowserHelper;
