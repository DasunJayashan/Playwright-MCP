const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const TestDataHelper = require('../utils/TestDataHelper');

test.describe('SauceDemo Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Arrange
    const { username, password } = TestDataHelper.VALID_CREDENTIALS;

    // Act
    await loginPage.login(username, password);

    // Assert - Verify inventory page is loaded
    const isInventoryLoaded = await loginPage.isInventoryPageLoaded();
    expect(isInventoryLoaded).toBeTruthy();

    // Verify URL changed to inventory page
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('inventory');
  });

  test('should fail login with invalid credentials', async () => {
    // Arrange
    const { username, password } = TestDataHelper.INVALID_CREDENTIALS;

    // Act
    await loginPage.login(username, password);

    // Assert - Verify error message is displayed
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();

    // Verify error message content
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('should fail login when username is empty', async () => {
    // Arrange
    const { password } = TestDataHelper.VALID_CREDENTIALS;

    // Act
    await loginPage.fillText(loginPage.passwordInput, password);
    await loginPage.click(loginPage.loginButton);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username is required');
  });

  test('should fail login when password is empty', async () => {
    // Arrange
    const { username } = TestDataHelper.VALID_CREDENTIALS;

    // Act
    await loginPage.fillText(loginPage.usernameInput, username);
    await loginPage.click(loginPage.loginButton);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Password is required');
  });

  test('should fail login with locked out user', async () => {
    // Arrange
    const { username, password } = TestDataHelper.LOCKED_USER;

    // Act
    await loginPage.login(username, password);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('locked out');
  });

  test('should display login button on page load', async () => {
    // Act & Assert
    const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
    expect(isLoginButtonVisible).toBeTruthy();
  });

  test('should display correct page title', async ({ page }) => {
    // Act
    const title = await loginPage.getPageTitle();

    // Assert
    expect(title).toBe('Swag Labs');
  });

  test('should display username and password fields', async () => {
    // Assert
    const isUsernameVisible = await loginPage.isVisible(loginPage.usernameInput);
    const isPasswordVisible = await loginPage.isVisible(loginPage.passwordInput);

    expect(isUsernameVisible).toBeTruthy();
    expect(isPasswordVisible).toBeTruthy();
  });
});
