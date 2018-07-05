module.exports = {
    automock: false,
    verbose: true,
    snapshotSerializers: ['enzyme-to-json/serializer'],
    transform: {
        '.tsx?': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    testPathIgnorePatterns: ['/node_modules/', '/lib/'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    moduleNameMapper: {
        '^.+\\.s?css$': 'identity-obj-proxy',
        '^~/test/(.*)$': '<rootDir>/__test__/$1',
        '^~/(.*)$': '<rootDir>/src/$1'
    },
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coverageReporters: ['lcov', 'json'],
    coveragePathIgnorePatterns: ['/*.d.ts$', 'lambda-src', 'webpack', 'testUtils', '__test__.ts'],
    setupTestFrameworkScriptFile: '<rootDir>/src/testUtils/setup.ts'
};
