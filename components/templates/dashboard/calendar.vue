<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-sheet height="380" width="510">
          <v-calendar :now="today" :value="today" locale="ja-jp">
            <template v-slot:day="{ date }">
              <day :date="date" />
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

::v-deep .v-calendar-weekly__day-label {
  display: none !important;
}

::v-deep .v-calendar-weekly__head-weekday {
  font-size: 0.9rem !important;
  font-weight: 600;
  border-bottom: 1px solid #e0e0e0;
}
</style>

<script>
import Vue from 'vue'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import day from '~/components/molecules/calendar/day.vue'

dayjs.extend(advancedFormat)

export default Vue.extend({
  components: {
    day,
  },
  data: () => ({
    today: '2020-02-23',
    tracked: {},
    colors: [],
    category: [],
  }),
  computed: {
    dayjs: () => dayjs,
  },
})
</script>
