Feature: Visitors and users view About and FAQ pages
    Visitors of IS Kolibri servers should be able to view the About and FAQ pages even when not signed in on the platform

  Background:
    Given that I am on any of the top level Kolibri pages 

    Scenario: View the About page
      When I open the sidebar menu
        And I click the *About* option
      Then I am on the the *About* page

    Scenario: View the FAQ page
      Given that I am on the the *About* page
        When I click the *More information* button
        Then I am on the the *FAQ* page
        When I click the *Back to About* button
        Then I am on the the *About* page again

    Scenario: View *Back to top* button on FAQ page
      Given that I am on the the *FAQ* page
        And I scroll down
      Then I see the *Back to top* button in the lower right corner
      When I click the *Back to top* button
      Then I see the top of the *FAQ* page again