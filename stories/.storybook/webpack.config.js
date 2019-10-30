const path = require('path');

module.exports = ({config}) => {
	config.resolve.extensions.push('.ts', '.tsx');
  config.module.rules[0].test = /\.(mjs|jsx?|tsx?)$/;
  config.module.rules[0].include = [path.resolve(`${__dirname}/../../package/src`), path.resolve(`${__dirname}/../src`), path.resolve(`${__dirname}/../.config`)];
	return config;
};
