import initialState, { State } from './state'

export default {
  RESET_STORE: (state: State) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state: State, { authUser }: State) => {
    state.authUser = {
      uid: authUser?.uid,
      email: authUser?.email,
      photoURL: authUser?.photoURL,
    }
  },
  OPEN_ITEM_DIALOG: (state: State, itemDialog: State['itemDialog']) => {
    state.itemDialog = itemDialog
  },
  CLOSE_ITEM_DIALOG: (state: State) => {
    state.itemDialog = null
  },
}
