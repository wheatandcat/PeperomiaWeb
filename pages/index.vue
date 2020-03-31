<template>
  <div>
    <CalendarView :calendars="state.calendars" />
  </div>
</template>

<script lang="ts">
import firebase from 'firebase'
import {
  defineComponent,
  onMounted,
  reactive,
  SetupContext,
} from '@vue/composition-api'
import {
  findInID as findItemInID,
  Item,
} from 'peperomia-util/build/firestore/item'
import {
  findByUID as findCalendarByUID,
  Calendar,
} from 'peperomia-util/build/firestore/calendar'
import CalendarView from '~/components/templates/dashboard/calendar.vue'

export type CalendarItem = Calendar & Item

const getCalendars = async (
  firestore: firebase.firestore.Firestore,
  uid: string
): Promise<CalendarItem[]> => {
  const calendars = await findCalendarByUID(firestore, uid)
  if (calendars.length === 0) {
    return []
  }

  const ids = calendars.map(calendar => String(calendar.id))

  const items = await findItemInID(firestore, uid, ids)
  const result = calendars.map(calendar => {
    const item = items.find(v => v.id === calendar.id)

    return {
      ...calendar,
      ...item,
    }
  })

  return result as CalendarItem[]
}

type State = {
  calendars: CalendarItem[]
}

export default defineComponent({
  components: {
    CalendarView,
  },
  setup(_, context: SetupContext) {
    const state = reactive<State>({
      calendars: [],
    })

    onMounted(async () => {
      const uid = context.root.$store.state.authUser.uid
      const firestore = context.root.$fireStore
      const result = await getCalendars(firestore, uid)

      state.calendars = result
    })

    return {
      state,
    }
  },
})
</script>
