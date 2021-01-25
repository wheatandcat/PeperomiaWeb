<template>
  <div v-if="!loading" class="root">
    <div>
      <ScheduleCard :calendar="calendar" :loading="loading" />
    </div>
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

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.root {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
