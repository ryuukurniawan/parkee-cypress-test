const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/mocha', 
      overwrite: false,
      html: true,
      json: true,
      charts: true, 
      embeddedScreenshots: true, 
      inlineAssets: true 
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
