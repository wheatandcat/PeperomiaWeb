<template>
  <v-container fluid>
    <v-row>
      <v-col ref="main" cols="12" md="6" class="calendar-container">
        <calendar
          :size="getMainCalendarSize"
          :calendars="getCalendarByMonth(0)"
          :calendar-date="getDate(0)"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-container fluid>
          <v-row>
            <v-col cols="6" class="calendar-container">
              <calendar
                :size="getSubCalendarSize"
                :calendars="getCalendarByMonth(1)"
                :calendar-date="getDate(1)"
              />
            </v-col>
            <v-col cols="6" class="calendar-container">
              <calendar
                :size="getSubCalendarSize"
                :calendars="getCalendarByMonth(2)"
                :calendar-date="getDate(2)"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" class="calendar-container">
              <calendar
                :size="getSubCalendarSize"
                :calendars="getCalendarByMonth(-1)"
                :calendar-date="getDate(-1)"
              />
            </v-col>
            <v-col cols="6" class="calendar-container">
              <calendar
                :size="getSubCalendarSize"
                :calendar="getCalendarByMonth(-2)"
                :calendar-date="getDate(-2)"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import Vue from 'vue'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import calendar from '~/components/organisms/calendar/calendar.vue'

dayjs.extend(isBetween)
dayjs.extend(advancedFormat)

export default Vue.extend({
  components: {
    calendar,
  },
  props: {
    calendars: { type: Array, default: () => [] },
  },
  data: () => ({
    large: false,
    small: false,
  }),

  computed: {
    dayjs: () => dayjs,
    getDate: () => {
      return month => {
        return dayjs()
          .add(month, 'month')
          .format('YYYY-MM-01')
      }
    },

    getMainCalendarSize() {
      if (this.large) {
        return 1.2
      }

      if (this.small) {
        return 0.8
      }

      return 1.0
    },

    getSubCalendarSize() {
      if (this.large) {
        return 0.6
      }

      if (this.small) {
        return 0.4
      }

      return 0.5
    },

    getCalendarByMonth(month) {
      const self = this

      return month => {
        const startDate = dayjs()
          .add(month, 'month')
          .format('YYYY-MM-01')
        const endDate = dayjs(startDate)
          .add(1, 'month')
          .add(-1, 'day')
          .format('YYYY-MM-DD')

        const items = self.calendars.filter(v =>
          dayjs(v.date).isBetween(startDate, endDate, null, '[)')
        )

        return items
      }
    },
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },

  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize() {
      this.small = this.$refs.main.clientWidth < 560
      this.large = this.$refs.main.clientWidth > 780
    },
  },
})
</script>
