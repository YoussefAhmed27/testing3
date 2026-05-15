Feature: Shop - Products & Categories Module

  Background:
    Given I am authenticated on the shop home page

  Scenario: 1. Navigates to a category via dropdown
    When I select the Hand Tools category
    Then I should be navigated to the Hand Tools page with products

  Scenario: 2. Default product grid loads on home page
    Then the default product grid should be visible

  Scenario: 3. Search bar filters products correctly
    When I search for a valid product term
    Then the grid should only display products matching the search term

  Scenario: 4. Brand checkboxes filter products
    When I filter products by the available brands
    Then the grid should update to display the filtered brands

  Scenario: 5. Sort by Price Low to High works
    When I sort the products by price ascending
    Then the grid should display the lowest priced items first

  Scenario: 6. Sort by Name Z to A works
    When I sort the products by name descending
    Then the grid should display items sorted alphabetically in reverse

  Scenario: 7. Pagination navigates to page 2
    When I navigate to the second page of products
    Then I should see the next set of products in the grid

  Scenario: 8. Search reset clears filters and restores grid
    When I search for a reset product term
    And I clear the search filters
    Then the product grid should restore to its default state

  Scenario: 9. Clicking a product navigates to its detail page
    When I click on the first product in the grid
    Then I should be redirected to its product detail page

  Scenario: 10. Empty state shows when no products match search
    When I search for a non-existent product term
    Then I should see an empty state search message

    