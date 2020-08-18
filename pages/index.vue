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
  setup(_, ctx: SetupContext) {
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
    })

    onUnmounted(() => {
      unwatch()
    })

    return toRefs(state)
  },
})
</script>
