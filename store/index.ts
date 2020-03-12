type State = {
  uid: string | null
  email: string | null
}

export const state = () => ({
  uid: null,
  user: null,
})

export const mutations = {
  SET_USER(state: State, data: State) {
    state.uid = data.uid
    state.email = data.email
  },
}
