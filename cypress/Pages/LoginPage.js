class LoginPage {
  visit() {
    cy.visit('/auth/login');
  }

  login(email, password) {
    cy.typeInput('email', email);
    cy.typeInput('password', password);
    cy.clickElement('login-submit');
  }

  submitEmpty() {
    cy.clickElement('login-submit');
  }

  typeInvalidEmailFormat(password) {
    cy.typeInput('email', 'badformat');
    cy.typeInput('password', password);
    cy.get('body').click(0, 0);
  }

  typePassword(password) {
    cy.typeInput('password', password);
  }

  clickForgotPassword() {
    cy.contains('Forgot your password', { matchCase: false }).click();
  }

  clickRegister() {
    cy.clickLinkByText('Register your account');
  }

  verifyPageLoad() {
    cy.url().should('include', '/auth/login');
    cy.getElement('email').should('be.visible');
    cy.getElement('password').should('be.visible');
  }

  verifySuccessfulLogin() {
    cy.url().should('not.include', '/login');
    cy.getElement('nav-menu').should('be.visible');
    cy.window().then((win) => {
      expect(win.localStorage.length > 0).to.be.true;
    });
  }

  verifyAuthError() {
    cy.getElement('login-error').should('be.visible');
    cy.url().should('include', '/auth/login');
  }

  verifyEmailValue(email) {
    cy.getElement('email').should('have.value', email);
  }

  verifyEmptyFormErrors() {
    cy.getElement('email').should('have.class', 'is-invalid');
    cy.getElement('password').should('have.class', 'is-invalid');
    cy.url().should('include', '/auth/login');
  }

  verifyEmailFormatError() {
    cy.getElement('email').should('have.class', 'ng-invalid');
    cy.url().should('include', '/auth/login');
    cy.getElement('login-error').should('not.exist');
  }

  verifyPasswordMasking(password) {
    cy.getElement('password').should('have.attr', 'type', 'password');
    cy.getElement('password').should('have.value', password);
    cy.getElement('password').should('not.have.attr', 'type', 'text');
  }

  verifySessionPersistence() {
    cy.url().should('not.include', '/login');
    cy.getElement('nav-menu').should('be.visible');
    cy.getElement('nav-sign-in').should('not.exist');
  }

  verifyForgotPasswordRedirect() {
    cy.url().should('include', '/forgot-password');
    cy.getElement('email').should('be.visible');
    cy.getElement('forgot-password-submit').should('be.visible');
  }

  verifyRegisterRedirect() {
    cy.url().should('include', '/register');
    cy.getElement('first-name').should('be.visible');
    cy.getElement('email').should('be.visible');
  }

  triggerLockout(email, password) {
    for (let i = 0; i < 4; i++) {
      cy.typeInput('email', email);
      cy.typeInput('password', password);
      cy.clickElement('login-submit');
      cy.wait(500);
    }
  }

  verifyLockoutError() {
    cy.getElement('login-error').should('be.visible');
    cy.getElement('login-error').should('contain.text', 'too many failed');
    cy.url().should('include', '/auth/login');
  }
}

export default new LoginPage();