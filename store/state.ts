export type State = {
  authUser: {
    uid?: string
    email?: string
    photoURL?: string
  } | null
  itemDialog: {
    id?: string
  } | null
}

export const initItemData = {}

export default (): State => ({
  authUser: null,
  itemDialog: null,
})
