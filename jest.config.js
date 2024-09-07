export default {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: [
    'ts', 
    'tsx', 
    'js', 
    'jsx'
  ],
  testEnvironment: 'jsdom',
  setupFiles: [
    'dotenv/config'
  ],
  roots: ['.'],
  preset: 'ts-jest',
  clearMocks: true,
  resetMocks: true,
  testMatch: [
    '<rootDir>/**/*.test.{ts,tsx,js,jsx}'
  ],
  testPathIgnorePatterns: [
    '/node_modules/', 
    '/dist/'
  ],
  verbose: true,
};
