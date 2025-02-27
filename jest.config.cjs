module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],
    "^@testing-library/react$": "<rootDir>/node_modules/@testing-library/react",
    setupFiles: ['<rootDir>/jest.setup.js'],
}