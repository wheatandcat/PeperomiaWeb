import firebase from 'firebase'
import { findByUID as findCalendarByUID } from 'peperomia-util/build/firestore/calendar'
import { findInID as findItemInID } from 'peperomia-util/build/firestore/item'
import { CalendarItem } from '~/domain/calendar'

export const getCalendars = async (
  firestore: firebase.firestore.Firestore,
  uid: string
): Promise<CalendarItem[]> => {
  const calendars = await findCalendarByUID(firestore, uid)
  if (calendars.length === 0) {
    return []
  }

  const ids = calendars.map((calendar) => String(calendar.itemId))

  const items = await findItemInID(firestore, uid, ids)

  const result: any = calendars.map((calendar) => {
    const item = items.find((v) => v.id === calendar.itemId)

    return {
      ...calendar,
      ...item,
    }
  })

  return result.filter((v: CalendarItem) => !!v.kind) as CalendarItem[]
}
