/* eslint-disable camelcase */
type VariablesType = {
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

declare module '~/assets/variables.scss' {
  export function theme()
  function theme(): VariablesType
  export default theme()
}
