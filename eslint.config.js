module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    // Possible Errors
    'no-console': 'warn', // Allow console logs but with a warning
    'no-debugger': 'warn', // Allow debugger but with a warning

    // Best Practices
    eqeqeq: 'error', // Require strict equality
    curly: ['error', 'all'], // Require consistent curly brace use

    // React
    'react/prop-types': 'off', // Disable prop-types since we use TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed in modern React

    // React Hooks
    'react-hooks/rules-of-hooks': 'error', // Checks rules of hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks dependencies of useEffect

    // Import
    'import/no-unresolved': 'error', // Ensure imports are valid
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],

    // Accessibility
    'jsx-a11y/alt-text': 'warn', // Warn about missing alt text for images

    // Prettier
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
