import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../../pages/ProductsPage';

Before(() => {
  cy.fixture('products').then((fixtureData) => {
    cy.wrap(fixtureData).as('productData');
  });
});



Given('I am authenticated on the shop home page', () => {
  productsPage.visitHome();
});

When('I select the Hand Tools category', () => {
  productsPage.navigateToHandTools();
});

Then('I should be navigated to the Hand Tools page with products', () => {
  productsPage.verifyHandToolsCategory();
});

Then('the default product grid should be visible', () => {
  productsPage.verifyDefaultGrid();
});

When('I search for a valid product term', function () {
  productsPage.search(this.productData.searchTerm);
});

Then('the grid should only display products matching the search term', function () {
  productsPage.verifySearchResults(this.productData.searchTerm, this.productData.expectedSearchCount);
});

When('I filter products by the available brands', () => {
  productsPage.filterByBrands();
});

Then('the grid should update to display the filtered brands', () => {
  // Assertions are handled internally within the filtering logic
});

When('I sort the products by price ascending', () => {
  productsPage.sortBy('price,asc');
});

Then('the grid should display the lowest priced items first', () => {
  productsPage.verifySortPriceAsc();
});

When('I sort the products by name descending', () => {
  productsPage.sortBy('name,desc');
});

Then('the grid should display items sorted alphabetically in reverse', () => {
  productsPage.verifySortNameDesc();
});

When('I navigate to the second page of products', () => {
  productsPage.navigateToPageTwo();
});

Then('I should see the next set of products in the grid', () => {
  productsPage.verifyPageTwoActive();
});

When('I search for a reset product term', function () {
  productsPage.search(this.productData.searchTermReset);
});

When('I clear the search filters', () => {
  productsPage.resetSearch();
});

Then('the product grid should restore to its default state', () => {
  productsPage.verifyGridRestored();
});

When('I click on the first product in the grid', () => {
  productsPage.clickFirstProduct();
});

Then('I should be redirected to its product detail page', () => {
  productsPage.verifyProductDetailNavigation();
});

When('I search for a non-existent product term', function () {
  productsPage.search(this.productData.searchTermEmpty);
});

Then('I should see an empty state search message', function () {
  productsPage.verifyEmptyState(this.productData.searchTermEmpty);
});