module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',
    specPattern: "**/*.feature",
    chromeWebSecurity: false,
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,

    retries: {
      runMode: 2,
      openMode: 0
    },

    async setupNodeEvents(on, config) {
      await preprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );
      
      return config;
    },
  },
});