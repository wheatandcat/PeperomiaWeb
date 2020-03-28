<script lang="tsx">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
} from '@vue/composition-api'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Calendar from '~/components/organisms/calendar/calendar.vue'
import { CalendarItem } from '~/pages/index.vue'

dayjs.extend(isBetween)
dayjs.extend(advancedFormat)

type Props = {
  calendars: CalendarItem[]
}

type State = {
  large: boolean
  small: boolean
}

export default defineComponent({
  props: {
    calendars: { type: Array, default: () => [] },
  },
  setup(props: Props) {
    const main = ref<any>(null)

    const getDate = (month: number) => {
      return dayjs()
        .add(month, 'month')
        .format('YYYY-MM-01')
    }

    const getMainCalendarSize = () => {
      if (state.large) {
        return 1.2
      }
      if (state.small) {
        return 0.8
      }
      return 1.0
    }

    const getSubCalendarSize = () => {
      if (state.large) {
        return 0.6
      }
      if (state.small) {
        return 0.4
      }
      return 0.5
    }

    const getCalendarByMonth = (month: number) => {
      const startDate = dayjs()
        .add(month, 'month')
        .format('YYYY-MM-01')

      const endDate = dayjs(startDate)
        .add(1, 'month')
        .add(-1, 'day')
        .format('YYYY-MM-DD')

      const items = props.calendars.filter(v =>
        dayjs(v.date).isBetween(startDate, endDate, null, '[)')
      )

      return items
    }

    const onResize = () => {
      state.small = main.value.clientWidth < 560
      state.large = main.value.clientWidth > 780
    }

    const state = reactive<State>({
      large: false,
      small: false,
    })

    onMounted(() => {
      onResize()
      window.addEventListener('resize', onResize, { passive: true })
    })

    onBeforeUnmount(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize)
      }
    })

    return () => (
      <v-container fluid>
        <v-row>
          <v-col ref={main} cols="12" md="6" class="calendar-container">
            <Calendar
              size={getMainCalendarSize()}
              calendars={getCalendarByMonth(0)}
              calendarDate={getDate(0)}
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-container fluid>
              <v-row>
                <v-col cols="6" class="calendar-container">
                  <Calendar
                    size={getSubCalendarSize()}
                    calendars={getCalendarByMonth(1)}
                    calendarDate={getDate(1)}
                  />
                </v-col>
                <v-col cols="6" class="calendar-container">
                  <Calendar
                    size={getSubCalendarSize()}
                    calendars={getCalendarByMonth(2)}
                    calendarDate={getDate(2)}
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="calendar-container">
                  <Calendar
                    size={getSubCalendarSize()}
                    calendars={getCalendarByMonth(-1)}
                    calendarDate={getDate(-1)}
                  />
                </v-col>
                <v-col cols="6" class="calendar-container">
                  <Calendar
                    size={getSubCalendarSize()}
                    calendars={getCalendarByMonth(-2)}
                    calendarDate={getDate(-2)}
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    )
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
