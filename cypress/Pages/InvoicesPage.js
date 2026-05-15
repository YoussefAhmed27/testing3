class InvoicesPage {
  visitHome() {
    cy.loginViaApi();
    cy.visit('/');
  }

  navigateToInvoices() {
    cy.navigateUserMenu('nav-my-invoices');
  }

  mockBasicInvoices(basicData) {
    cy.intercept('GET', '**/invoices*', { statusCode: 200, body: basicData }).as('injectInvoice');
    this.navigateToInvoices();
    cy.wait('@injectInvoice');
  }

  mockDetailedInvoices(detailedData) {
    cy.intercept('GET', '**/invoices*', { statusCode: 200, body: detailedData }).as('validateData');
    this.navigateToInvoices();
    cy.wait('@validateData');
  }

  mockSortedInvoices(sortedData) {
    cy.intercept('GET', '**/invoices*', { statusCode: 200, body: sortedData }).as('sortingMock');
    this.navigateToInvoices();
    cy.wait('@sortingMock');
  }

  verifyEmptyState() {
    cy.url().should('include', '/invoices');
    cy.get('thead').should('contain.text', 'Invoice Number');
    cy.get('tbody tr').should('not.exist');
  }

  verifyTableRenders() {
    cy.get('table').should('be.visible');
    cy.get('th').should('contain.text', 'Invoice Number');
    cy.contains('No invoices found', { matchCase: false }).should('not.exist');
  }

  verifyCellData() {
    cy.contains('td', 'INV-9999').should('be.visible');
    cy.contains('td', '2026-04-01').should('be.visible');
    cy.contains('td', '150.75').should('be.visible');
  }

  verifySorting() {
    cy.get('tbody tr').should('have.length', 2);
    cy.get('tbody tr').first().should('contain.text', 'INV-0002');
    cy.get('tbody tr').last().should('contain.text', 'INV-0001');
  }
}

export default new InvoicesPage();