import { CalendarItem } from '~/domain/calendar'

export type State = {
  authUser: {
    uid?: string
    email?: string
    photoURL?: string
  } | null
  itemDialog: {
    date: string | null
  }
  calendars: CalendarItem[]
}

export const initItemData = {}

export default (): State => ({
  authUser: null,
  itemDialog: {
    date: null,
  },
  calendars: [],
})
