<template>
  <div>
    <div>2020年 2月</div>
    <v-sheet :height="height" :width="width">
      <v-calendar :now="today" :value="today" locale="ja-jp">
        <template v-slot:day="{ date }">
          <scheduleDay
            v-if="getSchedule(date)"
            :date="date"
            :kind-data="KINDS[getSchedule(date).kind]"
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
</style>

<script>
import Vue from 'vue'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { KINDS } from 'peperomia-util'
import day from '~/components/molecules/calendar/day.vue'
import scheduleDay from '~/components/molecules/calendar/scheduleDay.vue'

dayjs.extend(advancedFormat)

export default Vue.extend({
  components: {
    day,
    scheduleDay,
  },
  props: {
    size: { type: Number, default: 1 },
  },
  data: () => ({
    today: '2020-02-23',
    calendars: [{ date: '2020-02-05', kind: 'park' }],
  }),
  computed: {
    KINDS: () => KINDS,
    dayjs: () => dayjs,
    getSchedule() {
      return function(date) {
        const item = this.calendars.find(v => v.date === date)

        return item
      }
    },
    height() {
      return 380 * this.size
    },
    width() {
      return 510 * this.size
    },
  },
})
</script>
