<template>
  <div>
    <Calendar />
  </div>
</template>

<script>
import Vue from 'vue'
import Calendar from '~/components/templates/dashboard/calendar.vue'

export default Vue.extend({
  components: {
    Calendar,
  },
})
</script>
