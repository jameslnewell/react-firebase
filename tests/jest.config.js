module.exports = {
  rootDir: '.',
  testMatch: ['<rootDir>/src/**/*.tests.ts?(x)'],
  moduleNameMapper: {
    '^@jameslnewell/react-firebase/(.*)':
      '<rootDir>/../package/src/$1/index.ts',
  },
};
