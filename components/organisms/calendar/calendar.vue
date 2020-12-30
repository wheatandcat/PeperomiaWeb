<template>
  <div>
    <div :style="fontStyle" class="calendar-title">
      {{ dayjs(calendarDate).format('YYYY年MM月') }}
    </div>
    <v-sheet :height="height" :width="width">
      <v-calendar
        :now="dayjs().format('YYYY-MM-DD')"
        :value="dayjs(calendarDate).format('YYYY-MM-DD')"
        locale="ja-jp"
      >
        <template v-slot:day="{ date }">
          <scheduleDay
            v-if="isSchedule(date)"
            :date="date"
            :item-i-d="getSchedule(date).itemId"
            :kind-data="KINDS[getSchedule(date).item.kind]"
            :size="size"
          />
          <day v-else :date="date" :size="size" />
        </template>
      </v-calendar>
    </v-sheet>
  </div>
</template>

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

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { KINDS } from 'peperomia-util'
import day from '~/components/molecules/calendar/day.vue'
import scheduleDay from '~/components/molecules/calendar/scheduleDay.vue'
import { Calendars } from '~/store/calendar.ts'

dayjs.extend(advancedFormat)

type Props = {
  calendars: Calendars
  size: number
  calendarDate: string
}

type Calendar = Calendars[0]

const defaultCalendarItem: Calendar = {
  id: '',
  date: '',
  item: {
    id: '',
    kind: '',
  },
}

export default defineComponent<Props>({
  components: {
    day,
    scheduleDay,
  },
  props: {
    size: { type: Number, default: 1 },
    calendarDate: { type: String, required: true },
    calendars: { type: Array, default: () => [] },
  },
  setup(props) {
    const isSchedule = (date: string): boolean => {
      const item = props.calendars.find(
        (v) => dayjs(v?.date).format('YYYY-MM-DD') === date
      )

      return Boolean(item)
    }

    const getSchedule = (date: string): Calendar => {
      const item = props.calendars.find(
        (v) => dayjs(v?.date).format('YYYY-MM-DD') === date
      )

      return item || defaultCalendarItem
    }

    const height = computed(() => 380 * props.size)
    const width = computed(() => 510 * props.size)
    const fontStyle = computed(() => ({
      fontSize: `${1.5 * props.size}rem`,
      paddingBottom: `${1.5 * props.size}rem`,
    }))

    return {
      height,
      width,
      fontStyle,
      getSchedule,
      isSchedule,
      dayjs,
      KINDS,
    }
  },
})
</script>
