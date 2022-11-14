/** Before running test:
 *  - run any of the sample applications in playground
 *  - npm run test in solid-dev-tool
 * below are the test cases
*/

describe('e2e testing of visualizer', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })
  it('displays floating action button by default', () => {

    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert there is a class showing a closed button
    cy.get('[data-testid="fab"]').should('have.class', 'stf closed')


  })


})