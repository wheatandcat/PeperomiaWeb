<script lang="tsx">
import Vue from 'vue'
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  computed,
  ref,
  reactive,
} from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { KINDS } from 'peperomia-util'
import Day from '~/components/molecules/calendar/day.vue'
import ScheduleDay from '~/components/molecules/calendar/scheduleDay.vue'
import { CalendarItem } from '~/pages/index.vue'

dayjs.extend(advancedFormat)

type Props = {
  calendars: CalendarItem[]
  size: number
  calendarDate: string
}

export default defineComponent({
  props: {
    size: { type: Number, default: 1 },
    calendarDate: { type: String, required: true },
    calendars: { type: Array, default: () => [] },
  },
  setup(props: Props, context) {
    const getSchedule = (date: string) => {
      const item = props.calendars.find(v => v.date === date)
      return item
    }

    const height = computed(() => 380 * props.size)
    const width = computed(() => 510 * props.size)
    const fontStyle = computed(() => ({
      fontSize: `${1.5 * props.size}rem`,
      paddingBottom: `${1.5 * props.size}rem`,
    }))

    return () => (
      <div>
        <div>
          <div style={fontStyle} class="calendar-title">
            {dayjs(props.calendarDate).format('YYYY年MM月')}
          </div>
          <v-sheet height={height.value} width={width.value}>
            <v-calendar
              now={dayjs().format('YYYY-MM-DD')}
              value={dayjs(props.calendarDate).format('YYYY-MM-DD')}
              locale="ja-jp"
              scopedSlots={{
                day: ({ date }: { date: string }) => {
                  const item = getSchedule(date)

                  if (item) {
                    return (
                      <ScheduleDay
                        date={date}
                        kindData={KINDS[item.kind]}
                        size={props.size}
                      />
                    )
                  }

                  return <Day v-else date={date} size={props.size} />
                },
              }}
            ></v-calendar>
          </v-sheet>
        </div>
      </div>
    )
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

::v-deep .v-calendar-weekly__day-label {
  display: none !important;
}

::v-deep .v-calendar-weekly__head-weekday {
  font-weight: 600;
  border-bottom: 1px solid #e0e0e0;
}

.calendar-title {
  font-weight: 600;
  text-align: center;
}
</style>
