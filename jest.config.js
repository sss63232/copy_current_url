module.exports = {
  setupFiles: [
    'jest-webextension-mock'
  ],
  transform: {
    '.*': '<rootDir>/node_modules/babel-jest'
  }
}
