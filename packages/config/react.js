module.exports = {
  extends: [
    require.resolve('.'),
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: '.',
      },
    },
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',
    'react/prop-types': 'off',
  },
}
