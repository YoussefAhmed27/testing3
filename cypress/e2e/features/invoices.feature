Feature: Account - Invoices Module

  Background:
    Given I am logged in and on the home page

  Scenario: 1. Empty invoices state displays correctly
    When I navigate to my invoices
    Then I should see an empty invoices table

  Scenario: 2. Invoice table renders with data
    When I navigate to my invoices with basic mock data
    Then the invoice table should render successfully

  Scenario: 3. Invoice table cell data is correct
    When I navigate to my invoices with detailed mock data
    Then the invoice table should display the correct cell data

  Scenario: 4. Invoices list is sorted newest first
    When I navigate to my invoices with sorted mock data
    Then the invoices list should be sorted newest first