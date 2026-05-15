import { BeforeAll, After } from '@badeball/cypress-cucumber-preprocessor';

BeforeAll(() => {
  cy.createMockAccount().then((fixtureData) => {
    globalThis.testUser = fixtureData; 
  });
});

After(() => {
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
  cy.clearAllCookies();
});