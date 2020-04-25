<template>
  <v-sheet elevation="4" width="500" height="500">
    <div class="header-itme" :style="bg">
      <div class="date">2020年2月1日</div>

      <div class="header-item-title">
        <div class="pr-3 py-3">
          <v-img :src="kindData.src" width="60" height="60" />
        </div>
        <div class="item-title pl-5 pt-8">
          {{ props.item.title }}
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.header-itme {
  background: lightgray;
  padding: 0.5rem 1rem;

  .date {
    font-size: 0.8rem;
    color: $darkGray;
  }

  .header-item-title {
    display: flex;
    align-item: center;

    .item-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: $darkGray;

      vertical-align: middle; /* 上下中央に寄せる */
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { KINDS } from 'peperomia-util'
import { Item } from 'peperomia-util/build/firestore/item'

type Props = {
  item: Item
}

dayjs.extend(advancedFormat)

export default defineComponent({
  props: {
    item: { type: Object, required: true },
  },
  setup(props: Props) {
    const kindData = KINDS[props.item.kind]

    console.log(kindData.src)

    const bg = computed(() => {
      return {
        backgroundColor: kindData.backgroundColor,
      }
    })

    return {
      props,
      kindData,
      bg,
    }
  },
})
</script>
