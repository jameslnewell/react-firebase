const path = require('path');

module.exports = ({config}) => {
  config.resolve.extensions.push('.ts', '.tsx');
  ['app', 'auth', 'firestore', 'storage'].forEach(bundle => {
    config.resolve.alias[
      `@jameslnewell/react-firebase/${bundle}`
    ] = path.resolve(`${__dirname}/../../package/src/${bundle}/`);
  });
  config.module.rules[0].test = /\.(mjs|jsx?|tsx?)$/;
  config.module.rules[0].include = [
    path.resolve(`${__dirname}/../../package/src`),
    path.resolve(`${__dirname}/../src`),
    path.resolve(`${__dirname}/../.config`),
  ];
  return config;
};
