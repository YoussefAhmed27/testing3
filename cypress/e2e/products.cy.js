describe('Shop - Products & Categories Module', () => {
  before(() => {
    cy.fixture('products').then((fixtureData) => {
      globalThis.products = fixtureData;
    });
  });

  beforeEach(() => {
    cy.loginPresetAccount();
  });

  afterEach(() => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
  });

  it('1. Navigates to a category via dropdown', () => {
    cy.clickElement('nav-categories');
    cy.clickElement('nav-hand-tools');
    cy.url().should('include', '/category/hand-tools');
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.getElement('product-name').first().should('be.visible');
  });

  it('2. Default product grid loads on home page', () => {
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.getElement('product-name').first().should('be.visible');
    cy.getElement('product-price').first().should('be.visible');
  });

  it('3. Search bar filters products correctly', () => {
    cy.typeInput('search-query', products.searchTerm);
    cy.clickElement('search-submit');
    cy.get('.card').should('have.length', products.expectedSearchCount);
    cy.getElement('product-name').each(($el) => {
      expect($el.text().trim()).to.include(products.searchTerm);
    });
    cy.getElement('search-term').should('contain.text', products.searchTerm);
  });

  it('4. Brand checkboxes filter products', () => {
    cy.getBrands().then((response) => {
      const brands = response.body;
      cy.get(`[data-test="brand-${brands[0].id}"]`).check({ force: true });
      cy.get(`[data-test="brand-${brands[0].id}"]`).should('be.checked');
      cy.get('.card').should('have.length.greaterThan', 0);
      cy.get(`[data-test="brand-${brands[1].id}"]`).check({ force: true });
      cy.get(`[data-test="brand-${brands[1].id}"]`).should('be.checked');
      cy.get('.card').should('have.length.greaterThan', 0);
    });
  });

  it('5. Sort by Price Low to High works', () => {
    cy.getElement('sort').select('price,asc');
    cy.getElement('sort').should('have.value', 'price,asc');
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.getElement('product-price').first().should('be.visible');
  });

  it('6. Sort by Name Z to A works', () => {
    cy.getElement('sort').select('name,desc');
    cy.getElement('sort').should('have.value', 'name,desc');
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.getElement('product-name').first().should('be.visible');
  });

    it('7. Pagination navigates to page 2', () => {
    cy.intercept('GET', '**/products?*page=2*').as('pageTwo');
    cy.contains('.page-link', '2').click();
    cy.wait('@pageTwo');
    cy.get('.page-item.active').should('contain.text', '2');
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.getElement('product-name').first().should('be.visible');
    });
    
  it('8. Search reset clears filters and restores grid', () => {
    cy.typeInput('search-query', products.searchTermReset);
    cy.clickElement('search-submit');
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.clickElement('search-reset');
    cy.getElement('search-query').should('have.value', '');
    cy.get('.card').should('have.length.greaterThan', 1);
  });

  it('9. Clicking a product navigates to its detail page', () => {
    cy.getElement('product-name').first().should('be.visible').click();
    cy.url().should('include', '/product/');
    cy.get('h1').should('be.visible');
    cy.getElement('add-to-cart').should('be.visible');
  });

  it('10. Empty state shows when no products match search', () => {
    cy.typeInput('search-query', products.searchTermEmpty);
    cy.clickElement('search-submit');
    cy.get('.card').should('not.exist');
    cy.getElement('search-caption').should('be.visible');
    cy.getElement('search-term').should('contain.text', products.searchTermEmpty);
  });
});