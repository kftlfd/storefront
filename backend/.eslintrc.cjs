/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  env: { node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['node_modules', 'dist', '!.prettierrc.js'],

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked', 'prettier'],
};
