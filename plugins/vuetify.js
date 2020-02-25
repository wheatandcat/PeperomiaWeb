import colors from 'vuetify/es5/util/colors'
import variables from '~/assets/variables.scss'

export default {
  customVariables: ['~/assets/variables.scss'],
  theme: {
    themes: {
      dark: {
        primary: variables.main,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
      light: {
        primary: variables.main,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
    },
  },
}
