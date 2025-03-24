module.exports = {
  testEnvironment: "jsdom",
  verbose: true,
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/**/*.d.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
