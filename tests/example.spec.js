const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const TestDataHelper = require('../utils/TestDataHelper');

test.describe('Login Tests', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async () => {
    // Arrange
    const { username, password } = TestDataHelper.VALID_CREDENTIALS;

    // Act
    await loginPage.login(username, password);

    // Assert
    const url = await loginPage.getCurrentUrl();
    expect(url).toContain('practicetestautomation.com');
  });

  test('should show error message with invalid credentials', async () => {
    // Arrange
    const { username, password } = TestDataHelper.INVALID_CREDENTIALS;

    // Act
    await loginPage.login(username, password);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  test('should show error message when password is empty', async () => {
    // Arrange
    const { username } = TestDataHelper.VALID_CREDENTIALS;

    // Act
    await loginPage.fillText(loginPage.usernameInput, username);
    await loginPage.click(loginPage.loginButton);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  test('should show login button on login page', async () => {
    // Assert
    const isVisible = await loginPage.isLoginButtonVisible();
    expect(isVisible).toBeTruthy();
  });
});

test.describe('Navigation Tests', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
  });

  test('should navigate to home page', async () => {
    // Act
    await homePage.goto();

    // Assert
    const url = await homePage.getCurrentUrl();
    expect(url).toContain('practicetestautomation.com');
  });

  test('should get page title', async () => {
    // Act
    await loginPage.goto();
    const title = await loginPage.getPageTitle();

    // Assert
    expect(title).toBeTruthy();
  });
});
