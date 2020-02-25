<template>
  <div class="root" :style="bg">
    <div class="event" :style="fontStyle">{{ dayjs(date).format('D') }}</div>
    <div>
      <v-img :src="kindData.src" class="kind-img" :style="imgStyle" />
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
}

.event {
  font-weight: 600;
}

.kind-img {
  opacity: 0.8;
}
</style>

<script>
import Vue from 'vue'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

export default Vue.extend({
  props: {
    date: { type: String, default: '' },
    kindData: { type: Object, default: () => {} },
    size: { type: Number, default: 1 },
  },
  computed: {
    dayjs: () => dayjs,
    bg() {
      return {
        backgroundColor: this.kindData.backgroundColor,
      }
    },
    imgStyle() {
      return {
        width: `${2 * this.size}rem`,
        height: `${2 * this.size}rem`,
      }
    },
    fontStyle() {
      return {
        fontSize: `${0.9 * this.size}rem`,
      }
    },
  },
})
</script>
