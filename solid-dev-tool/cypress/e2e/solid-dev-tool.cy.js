/** Before running test:
 *  - run any of the sample applications in playground
 *  - npm run test in solid-dev-tool
 * below are the test cases
*/

// for mor info on Cypress api:
// https://docs.cypress.io/api/commands/get#Syntax

describe('testing action buttons', () => {
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


  it('Floating action button should close the panel when clicked on twice', () => {
    cy.get('[data-testid="fab"]')
    .click({ multiple: true })
    .get('li.stf-mb_c')
    .find('button')
    .click({ multiple: true })
    .get('[data-testid="fab"]')
    .click({ multiple: true })
    .find('li.stf-mb_c')
    .find('button')
    .click({ multiple: true })
    .get('[data-testid="fab"]')
    .should('have.class', 'stf closed')
    cy.get('[data-testid="fab"]').should('not.contain', 'footer')
  })
})

describe('testing panel where reactive graph is displayed', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit('/')
    cy.get('[data-testid="fab"]').click()
    .should('have.class', 'stf open')
    .get('li.stf-mb_c')
    .find('button')
    .click({ multiple: true })
  })

  it('Once you click action button panel should display', () => {
    cy.get('footer').should('have.id', 'Panel')
  })

  it('Panel should have a border that can be dragged', () => {
    cy.get('footer')
    .get('.inside-panel').should('have.css', 'height', '300px')
    .find('.top-border-panel')
    .trigger('mousedown', { which : 0})
    .trigger('mousemove', { clientX: 200, clientY: 300 })
    .trigger('mouseup')
  })

})

