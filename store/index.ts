type State = {
  authUser: {
    uid: string | null
    email: string | null
    photoURL: string | null
  }
}

export const state = (): State => ({
  authUser: {
    uid: null,
    email: null,
    photoURL: null,
  },
})
