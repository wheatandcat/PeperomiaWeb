import env from './config/index'

export default {
  mode: 'universal',
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: 'ペペロミア',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/http',
    '@/plugins/composition-api',
    '~/plugins/cookie-storage.js',
  ],

  http: {
    proxy: true,
  },

  proxy: {
    '/api/': 'https://peperomia-196da.appspot.com',
  },
  /*
   ** Nuxt.js dev-modules
   */
  devModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxt/http', '@nuxtjs/firebase', '@nuxtjs/apollo'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    optionsPath: './plugins/vuetify.js',
  },

  apollo: {
    tokenName: 'yourApolloTokenName',
    cookieAttributes: {
      expires: 7,
    },
    includeNodeModules: true,
    clientConfigs: {
      default: '~/plugins/apollo-client.ts',
    },
  },

  firebase: {
    config: {
      ...env.FIREBASE,
    },
    onFirebaseHosting: false,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged',
          ssr: true,
        },
      },
      firestore: true,
    },
  },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [require.resolve('babel-preset-vca-jsx')],
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              targets: isServer ? { node: 'current' } : { ie: '9' },
            },
          ],
        ]
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|tsx|ts)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
  env: {
    ...env,
  },
}
