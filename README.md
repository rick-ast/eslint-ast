# eslint-config-ast [![npm](https://img.shields.io/npm/v/eslint-config-ast.svg)](https://www.npmjs.com/package/eslint-config-ast)

ESLint Configurations

### Installation

```sh
npm i -D eslint-config-ast
```

### Usage (`.eslintrc`)

- Next.js

```jsonc
{
  "extends": ["ast/next", "next/core-web-vitals", ...]
}
```

- React

```jsonc
{
  "extends": ["ast/react", ...]
}
```

- React Native

```json
{
  "extends": "ast/react-native"
}
```

- NestJS / Node.js

```jsonc
{
  "extends": ["ast", ...]
}
```

### Recommended prettier config (`.prettierrc`)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "endOfLine": "auto"
}
```
