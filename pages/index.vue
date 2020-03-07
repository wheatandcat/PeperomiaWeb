<template>
  <div>
    <Calendar />
  </div>
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
import Calendar from '~/components/templates/dashboard/calendar.vue'

export default Vue.extend({
  components: {
    Calendar,
  },
})
</script>
