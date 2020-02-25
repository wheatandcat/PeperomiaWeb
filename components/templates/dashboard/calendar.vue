<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <calendar :size="0.8" />
      </v-col>
      <v-col cols="12" md="6">
        <v-container fluid>
          <v-row>
            <v-col cols="6">
              <calendar :size="0.4" />
            </v-col>
            <v-col cols="6">
              <calendar :size="0.4" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <calendar :size="0.4" />
            </v-col>
            <v-col cols="6">
              <calendar :size="0.4" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';
</style>

<script>
import Vue from 'vue'
import calendar from '~/components/organisms/calendar/calendar.vue'

export default Vue.extend({
  components: {
    calendar,
  },
})
</script>
