<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

type Props = {
  date: string
  size: number
}

export default defineComponent<Props>({
  props: {
    date: { type: String, default: '' },
    size: { type: Number, default: 1 },
  },
  setup(props) {
    const fontStyle = computed(() => {
      return {
        fontSize: `${1.2 * props.size}rem`,
      }
    })

    return {
      fontStyle,
      dayjs,
    }
  },
})
</script>

<template>
  <div class="root">
    <div class="no-event" :style="fontStyle">
      {{ dayjs(date).format('D') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.root {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $darkGray;
}

.no-event {
  font-weight: 600;
}
</style>
