module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue-scoped-css/recommended',
    'plugin:prettier/recommended',
    'prettier/vue',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      plugins: ['@typescript-eslint'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
      },
    },
    {
      files: ['*.gql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      parserOptions: {
        operations: ['./queries/**/*.gql'],
        schema: './schema.json',
      },
      rules: {
        'prettier/prettier': 0,
        '@graphql-eslint/require-id-when-available': [
          'error',
          {
            fieldName: 'id',
          },
        ],
        '@graphql-eslint/no-deprecated': 'error',
        '@graphql-eslint/prettier': 'error',
        '@graphql-eslint/no-unused-variables': 'error',
      },
    },
  ],
  plugins: ['vue', 'jest'],
  rules: {
    'no-console': 'off',
    'vue/no-parsing-error': [
      'error',
      {
        'missing-semicolon-after-character-reference': false, // @see https://html.spec.whatwg.org/multipage/parsing.html#parse-errors
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
        },
      },
    ],
    'prettier/prettier': 'error',
    'vue-scoped-css/no-unused-selector': 'error',
    'vue/component-tags-order': [
      'error',
      {
        order: [['script', 'template'], 'style'],
      },
    ],
  },
  globals: {
    context: false, // for jest
  },
}
