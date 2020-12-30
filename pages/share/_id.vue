<template>
  <div v-if="!loading">
    <ScheduleCard :calendar="calendar" :loading="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from '@vue/composition-api'
import useShareCalendar from '~/use/useShareCalendar'
import ScheduleCard from '~/components/organisms/schedule/index.vue'

export default defineComponent({
  components: {
    ScheduleCard,
  },
  layout: 'simple',

  setup(_, ctx: SetupContext) {
    const id = String(ctx.root.$route.params.id)
    const { calendar, loading, fetchShareItem } = useShareCalendar(ctx)

    onMounted(async () => {
      await fetchShareItem(id)
    })

    return {
      calendar,
      loading,
    }
  },
})
</script>
