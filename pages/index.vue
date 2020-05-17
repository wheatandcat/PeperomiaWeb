<template>
  <div>
    <CalendarView :calendars="state.calendars" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  SetupContext,
} from '@vue/composition-api'
import CalendarView from '~/components/templates/dashboard/calendar.vue'
import { CalendarItem } from '~/domain/calendar'

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
    const unwatch = context.root.$store.watch<CalendarItem[]>(
      (vuexState) => {
        return vuexState.calendars
      },
      (calendars: CalendarItem[]) => {
        state.calendars = calendars
      }
    )

    onMounted(() => {
      const authUser = context.root.$store.state?.authUser
      context.root.$store.dispatch('getCalendarData', { authUser })
    })

    onUnmounted(() => {
      unwatch()
    })

    return {
      state,
    }
  },
})
</script>
