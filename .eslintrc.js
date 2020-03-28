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
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  // required to lint *.vue files
  plugins: ['vue', 'jest'],
  // add your custom rules here
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
  },
  globals: {
    context: false, // for jest
  },
}
