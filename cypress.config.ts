import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://localhost:3000/',
    supportFile: 'cypress/support/e2e.ts',
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    projectId: 'oj4857',
  },
});
