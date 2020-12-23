<template>
  <div>
    <CalendarView :calendars="calendars" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  SetupContext,
  toRefs,
  inject,
} from '@vue/composition-api'
import CalendarView from '~/components/templates/dashboard/calendar.vue'
import { CalendarItem } from '~/domain/calendar'
import { CalendarStore } from '~/store/calendar'

type State = {
  calendars: CalendarItem[]
}

export default defineComponent({
  components: {
    CalendarView,
  },
  setup(_, ctx: SetupContext) {
    const calendarStore = inject<CalendarStore>('CalendarStore')
    if (!calendarStore) {
      throw new Error(`CalendarStore is not provided`)
    }

    const state = reactive<State>({
      calendars: [],
    })

    const unwatch = ctx.root.$store.watch<CalendarItem[]>(
      (vuexState) => {
        return vuexState.calendars
      },
      (calendars: CalendarItem[]) => {
        state.calendars = calendars
      }
    )

    onMounted(() => {
      const authUser = ctx.root.$store.state?.authUser
      ctx.root.$store.dispatch('getCalendarData', { authUser })

      calendarStore.fetchCalendars({
        startDate: '2020-12-01T00:00:00',
        endDate: '2020-12-31T00:00:00',
      })
    })

    onUnmounted(() => {
      unwatch()
    })

    return toRefs(state)
  },
})
</script>
