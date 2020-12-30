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
  ],
  // required to lint *.vue files
  plugins: ['vue', 'jest', 'graphql'],
  // add your custom rules here
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./schema.json'),
      },
    ],
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
