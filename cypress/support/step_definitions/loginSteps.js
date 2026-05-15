import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../Pages/LoginPage';

Given('I navigate to the login page', () => {
  loginPage.visit();
});

Then('the login page should render correctly', () => {
  loginPage.verifyPageLoad();
});

When('I login with valid credentials', () => {
  loginPage.login(globalThis.testUser.validUser.email, globalThis.testUser.validUser.password);
});

Then('I should be redirected to the dashboard with an active session', () => {
  loginPage.verifySuccessfulLogin();
});

When('I login with an incorrect password', () => {
  loginPage.login(globalThis.testUser.validUser.email, globalThis.testUser.invalidUser.password);
});

When('I login with an unregistered email', () => {
  loginPage.login(globalThis.testUser.invalidUser.email, globalThis.testUser.validUser.password);
});

Then('I should see an authentication error', () => {
  loginPage.verifyAuthError();
});

Then('the email field should retain the valid email', () => {
  loginPage.verifyEmailValue(globalThis.testUser.validUser.email);
});

Then('the email field should retain the invalid email', () => {
  loginPage.verifyEmailValue(globalThis.testUser.invalidUser.email);
});

When('I submit an empty login form', () => {
  loginPage.submitEmpty();
});

Then('the input fields should show validation errors', () => {
  loginPage.verifyEmptyFormErrors();
});

When('I enter an invalid email format', () => {
  loginPage.typeInvalidEmailFormat(globalThis.testUser.validUser.password);
});

Then('the email field should show a format validation error', () => {
  loginPage.verifyEmailFormatError();
});

When('I enter a password', () => {
  loginPage.typePassword(globalThis.testUser.validUser.password);
});

Then('the password field should be masked', () => {
  loginPage.verifyPasswordMasking(globalThis.testUser.validUser.password);
});

When('I refresh the page', () => {
  cy.reload();
});

Then('my session should persist', () => {
  loginPage.verifySessionPersistence();
});

When('I click the forgot password link', () => {
  loginPage.clickForgotPassword();
});

Then('I should be redirected to the forgot password page', () => {
  loginPage.verifyForgotPasswordRedirect();
});

When('I click the register link', () => {
  loginPage.clickRegister();
});

Then('I should be redirected to the register page', () => {
  loginPage.verifyRegisterRedirect();
});

When('I attempt to login with invalid credentials 4 times', () => {
  loginPage.triggerLockout(globalThis.testUser.validUser.email, globalThis.testUser.invalidUser.password);
});

Then('I should see a lockout error message', () => {
  loginPage.verifyLockoutError();
});