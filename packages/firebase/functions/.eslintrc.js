
module.exports = {
  globals: {
    document: true,
    window: true,
    $: true,
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
    'jquery'
  ],
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
  }
};
