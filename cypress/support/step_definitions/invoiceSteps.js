import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor';
import invoicesPage from '../../pages/InvoicesPage';

Before(() => {
  cy.fixture('invoices').then((fixtureData) => {
    cy.wrap(fixtureData).as('invoicesData');
  });
});



Given('I am logged in and on the home page', () => {
  invoicesPage.visitHome();
});

When('I navigate to my invoices', () => {
  invoicesPage.navigateToInvoices();
});

Then('I should see an empty invoices table', () => {
  invoicesPage.verifyEmptyState();
});

When('I navigate to my invoices with basic mock data', function () {
  invoicesPage.mockBasicInvoices(this.invoicesData.basic);
});

Then('the invoice table should render successfully', () => {
  invoicesPage.verifyTableRenders();
});

When('I navigate to my invoices with detailed mock data', function () {
  invoicesPage.mockDetailedInvoices(this.invoicesData.detailed);
});

Then('the invoice table should display the correct cell data', () => {
  invoicesPage.verifyCellData();
});

When('I navigate to my invoices with sorted mock data', function () {
  invoicesPage.mockSortedInvoices(this.invoicesData.sorted);
});

Then('the invoices list should be sorted newest first', () => {
  invoicesPage.verifySorting();
});