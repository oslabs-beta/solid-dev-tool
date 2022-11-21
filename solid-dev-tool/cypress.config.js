const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false
  }
})