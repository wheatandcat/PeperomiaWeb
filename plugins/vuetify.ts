import Vue from 'vue'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import variables from '~/assets/variables.scss'

/* eslint-disable camelcase */
type VariablesType = {
  primary: string
  error: string
  accent1_dark: string
  accent1_light: string
  accent1_main: string
  accent1_pale: string
  accent2_dark: string
  accent2_light: string
  accent2_main: string
  accent2_pale: string
  error_dark: string
  error_light: string
  error_main: string
  error_pale: string
  background_dark: string
  background_light: string
  background_main: string
  base_dark: string
  base_light: string
  base_main: string
  base_pale: string
  primary_dark: string
  primary_light: string
  primary_main: string
  primary_pale: string
  secondary_dark: string
  secondary_light: string
  secondary_main: string
  secondary_pale: string
}
/* eslint-enable */

const theme = (): VariablesType => ({
  ...variables,
  primary: variables.brand_main,
  error: variables.error_main,
})

export default {
  customVariables: ['~/assets/variables.scss'],
  theme: {
    themes: {
      dark: {
        primary: theme().primary_main,
        secondary: theme().secondary_main,
        error: theme().error_main,
        themePrimaryPale: theme().primary_pale,
        themePrimaryLight: theme().primary_light,
        themePrimaryMain: theme().primary_main,
        themePrimaryDark: theme().primary_dark,
        themeSecondaryPale: theme().secondary_pale,
        themeSecondaryLight: theme().secondary_light,
        themeSecondaryMain: theme().secondary_main,
        themeSecondaryDark: theme().secondary_dark,
        themeBasePale: theme().base_pale,
        themeBaseLight: theme().base_light,
        themeBaseMain: theme().base_main,
        themeBaseDark: theme().base_dark,
        themeAccent1Pale: theme().accent1_pale,
        themeAccent1Light: theme().accent1_light,
        themeAccent1Main: theme().accent1_main,
        themeAccent1Dark: theme().accent1_dark,
        themeAccent2Pale: theme().accent2_pale,
        themeAccent2Light: theme().accent2_light,
        themeAccent2Main: theme().accent2_main,
        themeAccent2Dark: theme().accent2_dark,
        themeErrorPale: theme().error_pale,
        themeErrorLight: theme().error_light,
        themeErrorMain: theme().error_main,
        themeErrorDark: theme().error_dark,
        themeBackgroundLight: theme().background_light,
        themeBackgroundMain: theme().background_main,
        themeBackgroundDark: theme().background_dark,
      },
      light: {
        primary: theme().primary_main,
        secondary: theme().secondary_main,
        error: theme().error_main,
        themePrimaryPale: theme().primary_pale,
        themePrimaryLight: theme().primary_light,
        themePrimaryMain: theme().primary_main,
        themePrimaryDark: theme().primary_dark,
        themeSecondaryPale: theme().secondary_pale,
        themeSecondaryLight: theme().secondary_light,
        themeSecondaryMain: theme().secondary_main,
        themeSecondaryDark: theme().secondary_dark,
        themeBasePale: theme().base_pale,
        themeBaseLight: theme().base_light,
        themeBaseMain: theme().base_main,
        themeBaseDark: theme().base_dark,
        themeAccent1Pale: theme().accent1_pale,
        themeAccent1Light: theme().accent1_light,
        themeAccent1Main: theme().accent1_main,
        themeAccent1Dark: theme().accent1_dark,
        themeAccent2Pale: theme().accent2_pale,
        themeAccent2Light: theme().accent2_light,
        themeAccent2Main: theme().accent2_main,
        themeAccent2Dark: theme().accent2_dark,
        themeErrorPale: theme().error_pale,
        themeErrorLight: theme().error_light,
        themeErrorMain: theme().error_main,
        themeErrorDark: theme().error_dark,
        themeBackgroundLight: theme().background_light,
        themeBackgroundMain: theme().background_main,
        themeBackgroundDark: theme().background_dark,
      },
    },
  },
}

Vue.use(Vuetify, {
  iconfont: 'mdi',
})
