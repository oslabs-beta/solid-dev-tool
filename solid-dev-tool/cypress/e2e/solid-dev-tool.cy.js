/** Before running test:
 *  - run any of the sample applications in playground
 *  - npm run test in solid-dev-tool
 * below are the test cases
*/

// for mor info on Cypress api:
// https://docs.cypress.io/api/commands/get#Syntax

describe('e2e testing of visualizer', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })

  it('displays list by default with closed button', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert there is a class showing a closed button
    cy.get('[data-testid="fab"]').should('not.contain', 'stf closed')
  })

  it('panel should not be open as default', () => {
    cy.get('[data-testid="fab"]').should('not.contain', 'footer')
  })

  it('main action button should open when clicked on', () => {
    cy.get('[data-testid="fab"]').click()
    .should('have.class', 'stf open')
    .get('li.stf-mb_c')
    .find('button')
    .should('have.class', 'stf--mb')
  })

  it('once you click action button panel should display', () => {
    cy.get('[data-testid="fab"]').click()
    .should('have.class', 'stf open')
    .get('li.stf-mb_c')
    .find('button')
    .click({ multiple: true })
    cy.get('footer').should('have.id', 'Panel')
  })



})