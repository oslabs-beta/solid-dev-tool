/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })
  it('Checking if default names render', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert there is a class showing a closed button
    cy.get('form').should('have.class', 'admin')
  })
})
