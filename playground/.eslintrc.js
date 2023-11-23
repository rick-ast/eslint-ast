module.exports = {
  extends: require.resolve('../react-ahooks'),
  rules: {
    'local-rules/exhaustive-deps-ahooks-req': ['warn', { autoFix: true }],
    'local-rules/no-ahooks-req': ['warn', { autoFix: false }],
  },
}
