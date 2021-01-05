import { configure, addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import VueCompositionApi from '@vue/composition-api'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import theme from '../plugins/vuetify.ts'

Vue.use(Vuex)
Vue.use(VueCompositionApi)

const vuetifyConfig = new Vuetify(theme)

Vue.use(Vuetify, {
  confont: 'mdi',
  theme,
})

addDecorator(() => ({
  vuetify: vuetifyConfig,
  template: '<v-app><story/></v-app>',
}))

const req = require.context('../components', true, /.stories.js$/)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
