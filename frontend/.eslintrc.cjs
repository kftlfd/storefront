/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  env: { es2022: true, browser: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['node_modules', 'dist', '!.prettierrc.js'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],

  plugins: ['import', 'simple-import-sort'],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    'simple-import-sort/imports': [
      'error',
      { groups: [['^react', '^(?!(@/|\\.))'], ['^@/'], ['^\\.']] },
    ],
  },
};
