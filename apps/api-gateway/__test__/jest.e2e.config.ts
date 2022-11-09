/* eslint-disable */
export default {
  displayName: 'checkout',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.e2e.json',
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(e2e).[jt]s?(x)'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
}
