module.exports = {
  extends: [require.resolve('./react')],
  plugins: ['eslint-plugin-local-rules'],
  rules: {
    'local-rules/exhaustive-deps-req': 'warn',
    'local-rules/no-ahooks-req': 'warn',
  },
}
