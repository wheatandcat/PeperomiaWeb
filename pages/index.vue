<template>
  <div>
    <Calendar :calendars="calendars" />
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
import { findInID as findItemInID } from 'peperomia-util/build/firestore/item'
import { findByUID as findCalendarByUID } from 'peperomia-util/build/firestore/calendar'
import Calendar from '~/components/templates/dashboard/calendar.vue'

export default Vue.extend({
  components: {
    Calendar,
  },
  data: () => ({
    calendars: [],
  }),
  async mounted() {
    const uid = this.$store.state.authUser.uid
    const firestore = this.$fireStore

    console.log(this.$store.state.authUser.photoURL)
    console.log(this.$store.state.authUser.email)

    const calendars = await findCalendarByUID(firestore, uid)
    if (calendars.length === 0) {
      return
    }

    const ids = calendars.map(calendar => String(calendar.id))
    const items = await findItemInID(firestore, uid, ids)
    const result = calendars.map(calendar => {
      const item = items.find(v => v.id === calendar.id)

      return {
        ...calendar,
        ...item,
      }
    })

    console.log(result)

    this.calendars = result
  },
})
</script>
