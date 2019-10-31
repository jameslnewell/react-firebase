#!/usr/bin/env node

require = require('esm')(module);
require('ts-node').register({transpileOnly: true});
require('./src/index.ts');
