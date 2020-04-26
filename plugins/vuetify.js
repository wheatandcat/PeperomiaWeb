import Vue from 'vue'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/es5/util/colors'
import variables from '~/assets/variables.scss'

export default {
  customVariables: ['~/assets/variables.scss'],
  theme: {
    themes: {
      dark: {
        primary: variables.main,
        accent: colors.grey.darken3,
        secondary: variables.red,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
        themeRed: variables.red,
        themeGray: variables.gray,
        themeLightRed: variables.lightRed,
        themeLightGray: variables.lightGray,
        themeLightGreen: variables.lightGreen,
      },
      light: {
        primary: variables.main,
        accent: colors.grey.darken3,
        secondary: variables.red,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
        themeRed: variables.red,
        themeGray: variables.gray,
        themeLightRed: variables.lightRed,
        themeLightGray: variables.lightGray,
        themeLightGreen: variables.lightGreen,
      },
    },
  },
}

Vue.use(Vuetify, {
  iconfont: 'mdi',
})
