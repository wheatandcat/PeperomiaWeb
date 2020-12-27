<template>
  <div>
    <CalendarView :calendars="calendars" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import firebase from 'firebase'
import CalendarView from '~/components/templates/dashboard/calendar.vue'
import { CalendarStore } from '~/store/calendar'

dayjs.extend(advancedFormat)

export default defineComponent({
  components: {
    CalendarView,
  },
  setup() {
    const calendarStore = inject<CalendarStore>('CalendarStore')
    if (!calendarStore) {
      throw new Error(`CalendarStore is not provided`)
    }

    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          calendarStore.fetchCalendars({
            startDate: dayjs().add(-2, 'month').format('YYYY-MM-DDT00:00:00'),
            endDate: dayjs()
              .add(2, 'month')
              .endOf('month')
              .format('YYYY-MM-DDT23:59:59'),
          })
        }
      })
    })

    return {
      loading: calendarStore.loading,
      calendars: calendarStore.calendars,
    }
  },
})
</script>
