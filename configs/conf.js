exports.config = {
    directConnect: true,
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine',
    capabilities: {
        browserName: 'firefox',
    },
    specs: ['../testing/tests.js']
};