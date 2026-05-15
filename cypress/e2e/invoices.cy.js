describe('Account - Invoices Module', () => {
  beforeEach(() => {
    cy.loginViaApi();
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
  });

  it('1. Empty invoices state displays correctly', () => {
    cy.navigateUserMenu('nav-my-invoices');
    cy.url().should('include', '/invoices');
    cy.get('thead').should('contain.text', 'Invoice Number');
    cy.get('tbody tr').should('not.exist');
  });

  it('2. Invoice table renders with data', () => {
    cy.fixture('invoices').then((mock) => {
      cy.intercept('GET', '**/invoices*', { statusCode: 200, body: mock.basic }).as('injectInvoice');
    });

    cy.navigateUserMenu('nav-my-invoices');
    cy.wait('@injectInvoice');
    cy.get('table').should('be.visible');
    cy.get('th').should('contain.text', 'Invoice Number');
    cy.contains('No invoices found', { matchCase: false }).should('not.exist');
  });

  it('3. Invoice table cell data is correct', () => {
    cy.fixture('invoices').then((mock) => {
      cy.intercept('GET', '**/invoices*', { statusCode: 200, body: mock.detailed }).as('validateData');
    });

    cy.navigateUserMenu('nav-my-invoices');
    cy.wait('@validateData');
    cy.contains('td', 'INV-9999').should('be.visible');
    cy.contains('td', '2026-04-01').should('be.visible');
    cy.contains('td', '150.75').should('be.visible');
  });

  it('4. Invoices list is sorted newest first', () => {
    cy.fixture('invoices').then((mock) => {
      cy.intercept('GET', '**/invoices*', { statusCode: 200, body: mock.sorted }).as('sortingMock');
    });

    cy.navigateUserMenu('nav-my-invoices');
    cy.wait('@sortingMock');
    cy.get('tbody tr').should('have.length', 2);
    cy.get('tbody tr').first().should('contain.text', 'INV-0002');
    cy.get('tbody tr').last().should('contain.text', 'INV-0001');
  });


});