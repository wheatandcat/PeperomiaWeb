<template>
  <div class="root" :style="bg" @click="onOenItemDialog(props.itemID)">
    <div class="event" :style="fontStyle">
      {{ dayjs(props.date).format('D') }}
    </div>
    <div>
      <v-img :src="props.kindData.src" class="kind-img" :style="imgStyle" />
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
  flex-direction: column;
  color: $darkGray;
  cursor: pointer;
}

.event {
  font-weight: 600;
}

.kind-img {
  opacity: 0.8;
}
</style>

<script lang="ts">
import { defineComponent, computed, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Kind } from 'peperomia-util/build/getKind'

dayjs.extend(advancedFormat)

type Props = {
  date: string
  kindData: Kind
  size: number
}

export default defineComponent({
  props: {
    date: { type: String, default: '' },
    itemID: { type: String, default: '' },
    kindData: { type: Object, default: () => {} },
    size: { type: Number, default: 1 },
  },
  setup(props: Props, context: SetupContext) {
    const bg = computed(() => {
      return {
        backgroundColor: props.kindData.backgroundColor || '#FFF',
      }
    })
    const imgStyle = computed(() => {
      return {
        width: `${2 * props.size}rem`,
        height: `${2 * props.size}rem`,
      }
    })
    const fontStyle = computed(() => {
      return {
        fontSize: `${0.9 * props.size}rem`,
      }
    })

    const onOenItemDialog = (id: string) => {
      context.root.$store.commit('OPEN_ITEM_DIALOG', {
        id,
      })
    }

    return {
      bg,
      imgStyle,
      fontStyle,
      dayjs,
      props,
      onOenItemDialog,
    }
  },
})
</script>
