describe('Practice Software Testing - Login Module', () => {

  before(() => {
    cy.createMockAccount().then((fixtureData) => {
      globalThis.data = fixtureData;
    });
  });

  beforeEach(() => {
    cy.visit('/auth/login');
  });

  afterEach(() => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
  });

  it('1. Login page loads correctly', () => {
    cy.url().should('include', '/auth/login');
    cy.getElement('email').should('be.visible');
    cy.getElement('password').should('be.visible');
  });

  it('2. Successful login with valid credentials', () => {
    cy.typeInput('email', data.validUser.email);
    cy.typeInput('password', data.validUser.password);
    cy.clickElement('login-submit');

    cy.url().should('not.include', '/login');
    cy.getElement('nav-menu').should('be.visible');
    cy.window().then((win) => {
      expect(win.localStorage.length > 0).to.be.true;
    });
  });

  it('3. Login fails with incorrect password', () => {
    cy.typeInput('email', data.validUser.email);
    cy.typeInput('password', data.invalidUser.password);
    cy.clickElement('login-submit');

    cy.getElement('login-error').should('be.visible');
    cy.url().should('include', '/auth/login');
    cy.getElement('email').should('have.value', data.validUser.email);
  });

  it('4. Login fails with unregistered email', () => {
    cy.typeInput('email', data.invalidUser.email);
    cy.typeInput('password', data.validUser.password);
    cy.clickElement('login-submit');

    cy.getElement('login-error').should('be.visible');
    cy.url().should('include', '/auth/login');
    cy.getElement('email').should('have.value', data.invalidUser.email);
  });

  it('5. Empty form submission validation', () => {
    cy.clickElement('login-submit');

    cy.getElement('email').should('have.class', 'is-invalid');
    cy.getElement('password').should('have.class', 'is-invalid');
    cy.url().should('include', '/auth/login');
  });

  it('6. Invalid email format validation', () => {
    cy.typeInput('email', 'badformat');
    cy.typeInput('password', data.validUser.password);
    cy.get('body').click(0, 0);

    cy.getElement('email').should('have.class', 'ng-invalid');
    cy.url().should('include', '/auth/login');
    cy.getElement('login-error').should('not.exist');
  });

  it('7. Password field masking behavior', () => {
    cy.typeInput('password', data.validUser.password);

    cy.getElement('password').should('have.attr', 'type', 'password');
    cy.getElement('password').should('have.value', data.validUser.password);
    cy.getElement('password').should('not.have.attr', 'type', 'text');
  });

  it('8. Session persists after refresh', () => {
    cy.typeInput('email', data.validUser.email);
    cy.typeInput('password', data.validUser.password);
    cy.clickElement('login-submit');
    cy.url().should('not.include', '/login');

    cy.reload();

    cy.url().should('not.include', '/login');
    cy.getElement('nav-menu').should('be.visible');
    cy.getElement('nav-sign-in').should('not.exist');
  });

  it('9. Forgot password navigation works', () => {
    cy.contains('Forgot your password', { matchCase: false }).click();

    cy.url().should('include', '/forgot-password');
    cy.getElement('email').should('be.visible');
    cy.getElement('forgot-password-submit').should('be.visible');
  });

  it('10. Register navigation works', () => {
    cy.clickLinkByText('Register your account');

    cy.url().should('include', '/register');
    cy.getElement('first-name').should('be.visible');
    cy.getElement('email').should('be.visible');
  });

  it('11. Account locks out after multiple failed login attempts', () => {
    for (let i = 0; i < 4; i++) {
      cy.typeInput('email', data.validUser.email);
      cy.typeInput('password', data.invalidUser.password);
      cy.clickElement('login-submit');
      cy.wait(500);
    }

    cy.getElement('login-error').should('be.visible');
    cy.getElement('login-error').should('contain.text', 'too many failed');
    cy.url().should('include', '/auth/login');
  });
  
});