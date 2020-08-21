const { resolve } = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    document: true,
    window: true,
    $: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'import',
    'import-helpers',
    'react-hooks',
    'jest',
    'prettier',
    'react',
    'import',
    'jsx-a11y',
  ],
  extends: ['react-app', 'airbnb', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx'],
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        'newlines-between': 'always',
        groups: [
          ['/^react/'],
          ['builtin', 'external', 'internal'],
          '/^@/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'import/no-dynamic-require': 'off',
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-for': 'off',
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': ['error'],
  },
  settings: {
    'import/extensions': ['.js', '.jsx'],
  },
};
