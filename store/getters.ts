import { State } from './state'

export default {
  isLoggedIn: (state: State) => {
    try {
      return Boolean(state?.authUser?.uid)
    } catch {
      return false
    }
  },
  isOpenItemDialog: (state: State) => {
    return !!state.itemDialog?.id
  },
}
