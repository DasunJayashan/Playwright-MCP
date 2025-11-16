/**
 * TestDataHelper - Utility class for test data management
 */
class TestDataHelper {
  /**
   * Valid login credentials for SauceDemo
   */
  static VALID_CREDENTIALS = {
    username: 'standard_user',
    password: 'secret_sauce',
  };

  /**
   * Invalid login credentials
   */
  static INVALID_CREDENTIALS = {
    username: 'invalid_user',
    password: 'invalid_password',
  };

  /**
   * Locked out user
   */
  static LOCKED_USER = {
    username: 'locked_out_user',
    password: 'secret_sauce',
  };

  /**
   * Generate random email
   */
  static generateRandomEmail() {
    const randomId = Math.random().toString(36).substring(2, 15);
    return `test.${randomId}@example.com`;
  }

  /**
   * Generate random string
   */
  static generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate random number
   */
  static generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Get current timestamp
   */
  static getCurrentTimestamp() {
    return Date.now();
  }

  /**
   * Get formatted date string
   */
  static getFormattedDate(date = new Date()) {
    return date.toISOString().split('T')[0];
  }
}

module.exports = TestDataHelper;
