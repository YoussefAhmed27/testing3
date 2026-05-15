Cypress.Commands.add('getElement', (dataTestId) => {
  return cy.get(`[data-test="${dataTestId}"]`);
});

Cypress.Commands.add('typeInput', (dataTestId, text) => {
  if (text) cy.getElement(dataTestId).clear().type(text);
});

Cypress.Commands.add('clickElement', (dataTestId) => {
  cy.getElement(dataTestId).click();
});

Cypress.Commands.add('clickLinkByText', (linkText) => {
  cy.contains('a', linkText).click();
});

Cypress.Commands.add('createMockAccount', () => {
  return cy.fixture('authenticationData').then((fixtureData) => {
    const burnerEmail = `cypress_${Date.now()}@practicesoftwaretesting.com`;
    fixtureData.validUser.email = burnerEmail;

    return cy.request({
      method: 'POST',
      url: 'https://api.practicesoftwaretesting.com/users/register',
      failOnStatusCode: false, 
      body: {
        first_name: "Cypress",
        last_name: "Tester",
        dob: "1999-01-01",
        address: ["123 Test Way"], 
        postcode: "12345",
        city: "Testville",
        state: "TX",
        country: "USA",
        phone: "0123456789",
        email: burnerEmail,
        password: fixtureData.validUser.password
      }
    }).then(() => {
      return fixtureData; 
    });
  });
});

Cypress.Commands.add('loginViaApi', () => {
  cy.createMockAccount().then((userData) => {
    cy.request({
      method: 'POST',
      url: 'https://api.practicesoftwaretesting.com/users/login',
      failOnStatusCode: false,
      body: {
        email: userData.validUser.email,
        password: userData.validUser.password
      }
    }).then((loginResponse) => {
      window.localStorage.setItem('auth-token', loginResponse.body.access_token);
    });
  });
});

Cypress.Commands.add('navigateUserMenu', (menuItemDataTestId) => {
  cy.getElement('nav-menu').should('be.visible').click();
  cy.getElement(menuItemDataTestId).should('be.visible').click(); 
});

Cypress.Commands.add('clickInvoiceDetails', (invoiceNumber) => {
  cy.contains('tr', invoiceNumber)
    .find('a')
    .contains('Details', { matchCase: false })
    .should('be.visible')
    .click();
});

Cypress.Commands.add('downloadInvoice', (invoiceId) => {
  cy.contains('tr', invoiceId).find('.fa-download, [data-test^="download"]').click();
});

Cypress.Commands.add('loginPresetAccount', () => {
  cy.clearAllLocalStorage();
  cy.request({
    method: 'POST',
    url: 'https://api.practicesoftwaretesting.com/users/login',
    failOnStatusCode: false,
    body: { email: 'customer@practicesoftwaretesting.com', password: 'welcome01' }
  }).then((response) => {
    window.localStorage.setItem('auth-token', response.body.access_token);
  });
  cy.visit('/');
  cy.wait(500);
});

Cypress.Commands.add('getBrands', () => {
  return cy.request('GET', 'https://api.practicesoftwaretesting.com/brands');
});