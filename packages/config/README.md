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

- NestJS / Node.js

```jsonc
{
  "extends": ["ast", ...]
}
```

### Prettier config (`.prettierrc`)

```json
{
  "semi": false,
  "singleQuote": true,
  "endOfLine": "auto"
}
```
