module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-new': 'off',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'warn',
    'function-paren-newline': 'off',
    'object-curly-newline': 'off',
  },
};
