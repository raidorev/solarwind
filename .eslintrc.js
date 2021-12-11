module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:regexp/recommended',
    'plugin:promise/recommended',
    'plugin:jest/recommended',
    'plugin:lodash/recommended',
    'prettier',
  ],
  plugins: ['import'],
  settings: {
    'import/internal-regex': '^solarwind/',
  },
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],
    'lodash/chaining': ['error', 'never'],
    'lodash/import-scope': ['error', 'member'],
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        ignore: ['e2e', /props?/i, /^\.?env/],
      },
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
    {
      files: ['**/*.vue'],
      extends: ['plugin:vue/vue3-essential'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'vue/component-definition-name-casing': ['error', 'kebab-case'],
      },
    },
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports' },
        ],
        '@typescript-eslint/no-empty-interface': 'off',
      },
    },
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
}
