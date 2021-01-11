/* eslint-env node */
module.exports = (api) => {
  api.cache.forever();
  return {
    presets: ['@jameslnewell/babel-preset'],
    env: {
      stories: {
        presets: [
          [
            '@jameslnewell/babel-preset',
            {modules: false, useBuiltIns: 'usage', corejs: 3},
          ],
        ],
      },
    },
  };
};
