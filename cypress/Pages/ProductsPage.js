class ProductsPage {
  visitHome() {
    cy.loginPresetAccount();
  }

  navigateToHandTools() {
    cy.clickElement('nav-categories');
    cy.clickElement('nav-hand-tools');
  }

  search(term) {
    cy.typeInput('search-query', term);
    cy.clickElement('search-submit');
  }

  resetSearch() {
    cy.clickElement('search-reset');
  }

  filterByBrands() {
    cy.getBrands().then((response) => {
      const brands = response.body;
      cy.get(`[data-test="brand-${brands[0].id}"]`).check({ force: true });
      cy.get(`[data-test="brand-${brands[0].id}"]`).should('be.checked');
      cy.get('.card').should('have.length.greaterThan', 0);
      cy.get(`[data-test="brand-${brands[1].id}"]`).check({ force: true });
      cy.get(`[data-test="brand-${brands[1].id}"]`).should('be.checked');
      cy.get('.card').should('have.length.greaterThan', 0);
    });
  }

  sortBy(value) {
    cy.getElement('sort').select(value);
  }

  navigateToPageTwo() {
    cy.intercept('GET', '**/products?*page=2*').as('pageTwo');
    cy.contains('.page-link', '2').click();
    cy.wait('@pageTwo');
  }

  clickFirstProduct() {
    cy.getElement('product-name').first().should('be.visible').click();
  }

  verifyHandToolsCategory() {
    cy.url().should('include', '/category/hand-tools');
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.getElement('product-name').first().should('be.visible');
  }

  verifyDefaultGrid() {
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.getElement('product-name').first().should('be.visible');
    cy.getElement('product-price').first().should('be.visible');
  }

  verifySearchResults(term, expectedCount) {
    cy.get('.card').should('have.length', expectedCount);
    cy.getElement('product-name').each(($el) => {
      expect($el.text().trim()).to.include(term);
    });
    cy.getElement('search-term').should('contain.text', term);
  }

  verifySortPriceAsc() {
    cy.getElement('sort').should('have.value', 'price,asc');
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.getElement('product-price').first().should('be.visible');
  }

  verifySortNameDesc() {
    cy.getElement('sort').should('have.value', 'name,desc');
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.getElement('product-name').first().should('be.visible');
  }

  verifyPageTwoActive() {
    cy.get('.page-item.active').should('contain.text', '2');
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.getElement('product-name').first().should('be.visible');
  }

  verifyGridRestored() {
    cy.getElement('search-query').should('have.value', '');
    cy.get('.card').should('have.length.greaterThan', 1);
  }

  verifyProductDetailNavigation() {
    cy.url().should('include', '/product/');
    cy.get('h1').should('be.visible');
    cy.getElement('add-to-cart').should('be.visible');
  }

  verifyEmptyState(term) {
    cy.get('.card').should('not.exist');
    cy.getElement('search-caption').should('be.visible');
    cy.getElement('search-term').should('contain.text', term);
  }
}

export default new ProductsPage();