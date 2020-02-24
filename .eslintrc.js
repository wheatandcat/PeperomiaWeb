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
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier/vue',
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