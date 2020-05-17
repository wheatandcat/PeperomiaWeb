import { CalendarItem } from '~/domain/calendar'

export type State = {
  authUser: {
    uid?: string
    email?: string
    photoURL?: string
  } | null
  itemDialog: {
    id?: string
  } | null
  calendars: CalendarItem[]
}

export const initItemData = {}

export default (): State => ({
  authUser: null,
  itemDialog: null,
  calendars: [],
})
