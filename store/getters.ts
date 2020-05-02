import { State } from './state'

export default {
  isLoggedIn: (state: State) => {
    try {
      return state?.authUser?.uid !== null
    } catch {
      return false
    }
  },
  isOpenItemDialog: (state: State) => {
    return !!state.itemDialog?.id
  },
}
