module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    },
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts']
};