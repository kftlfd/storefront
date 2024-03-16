/** @type {import('prettier').Config} */
export default {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',

  overrides: [
    {
      files: ['.eslintrc.cjs'],
      options: { quoteProps: 'preserve' },
    },
  ],
};
