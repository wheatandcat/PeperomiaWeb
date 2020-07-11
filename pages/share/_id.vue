<template>
  <div v-if="!loading">
    <ScheduleCard
      :item="item"
      :calendar="item.calendar"
      :item-details="item.itemDetails"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from '@vue/composition-api'
import useShareItem from '~/use/useShareItem'
import ScheduleCard from '~/components/organisms/schedule/index.vue'

export default defineComponent({
  layout: 'simple',
  components: {
    ScheduleCard,
  },

  setup(_, ctx: SetupContext) {
    const itemId = String(ctx.root.$route.params.id)
    const { item, loading, fetchShareItem } = useShareItem(ctx)

    onMounted(async () => {
      await fetchShareItem(itemId)
    })

    return {
      item,
      loading,
    }
  },
})
</script>
