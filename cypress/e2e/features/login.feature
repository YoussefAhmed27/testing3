Feature: Practice Software Testing - Login Module

  Background:
    Given I navigate to the login page

  Scenario: 1. Login page loads correctly
    Then the login page should render correctly

  Scenario: 2. Successful login with valid credentials
    When I login with valid credentials
    Then I should be redirected to the dashboard with an active session

  Scenario: 3. Login fails with incorrect password
    When I login with an incorrect password
    Then I should see an authentication error
    And the email field should retain the valid email

  Scenario: 4. Login fails with unregistered email
    When I login with an unregistered email
    Then I should see an authentication error
    And the email field should retain the invalid email

  Scenario: 5. Empty form submission validation
    When I submit an empty login form
    Then the input fields should show validation errors

  Scenario: 6. Invalid email format validation
    When I enter an invalid email format
    Then the email field should show a format validation error

  Scenario: 7. Password field masking behavior
    When I enter a password
    Then the password field should be masked

  Scenario: 8. Session persists after refresh
    When I login with valid credentials
    Then I should be redirected to the dashboard with an active session
    When I refresh the page
    Then my session should persist

  Scenario: 9. Forgot password navigation works
    When I click the forgot password link
    Then I should be redirected to the forgot password page

  Scenario: 10. Register navigation works
    When I click the register link
    Then I should be redirected to the register page

  Scenario: 11. Account locks out after multiple failed login attempts
    When I attempt to login with invalid credentials 4 times
    Then I should see a lockout error message