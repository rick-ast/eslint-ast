// @ts-check
module.exports = {
  rules: {
    'exhaustive-deps-ahooks-req': require('./lib/rules/exhaustive-deps-ahooks-req'),
    'no-ahooks-req': require('./lib/rules/no-ahooks-req'),
  },
  configs: {
    recommended: {
      plugins: ['ast'],
      rules: {
        'ast/exhaustive-deps-ahooks-req': ['warn', { autoFix: false }],
        'ast/no-ahooks-req': ['off', { autoFix: false }],
      },
    },
  },
}
