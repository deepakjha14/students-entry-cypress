import { defineConfig } from "cypress";

import * as utils from "./src/cypress-util/cypress-util";

export default defineConfig({
  retries: 3,
  viewportHeight: 800,
  viewportWidth: 1200,
  defaultCommandTimeout: 12000,
  env: {
    prodUrl: "https://prod-url.com",
    uatUrl: "https://uat-url.com",
    userName: "Deepak@Jha.com"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        // implement task here
        csvToJson(data: any) {
          return utils.csvToJson(data);
        }
      })
    },
    baseUrl: "http://localhost:4200",
  },
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
