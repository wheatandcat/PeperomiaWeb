<template>
  <v-sheet elevation="0" width="210" class="root" :style="bg">
    <div class="header-card">
      <div class="header-card-title">
        <div class="pr-2 py-1">
          <v-img :src="kindData.src" width="30" height="30" />
        </div>
        <div class="card-title pl-3 pt-5">
          {{ props.itemDetail.title }}
        </div>
      </div>
    </div>
    <div>
      <div class="px-2">
        <v-chip
          class="chip-container"
          color="themeLightGray"
          text-color="themeGary"
          x-small
          label
        >
          <v-icon color="themeLightGreen" size="13" class="mr-1" left>
            mdi-map-marker-outline
          </v-icon>
          <div class="label-text">
            場所
          </div>
        </v-chip>
        <div class="label-value">
          東京都
        </div>

        <template v-if="props.itemDetail.url">
          <v-chip
            class="chip-container"
            color="themeLightGray"
            text-color="themeGary"
            x-small
            label
          >
            <v-icon color="themeLightGreen" size="13" class="mr-1" left>
              mdi-link
            </v-icon>
            <div class="label-text">URL</div>
          </v-chip>
          <div class="label-value">
            <a :href="props.itemDetail.url">{{ props.itemDetail.url }}</a>
          </div>
        </template>

        <template v-if="props.itemDetail.memo">
          <v-chip
            class="chip-container"
            color="themeLightGray"
            text-color="themeGary"
            x-small
            label
          >
            <v-icon color="themeLightGreen" size="13" class="mr-1" left>
              mdi-view-list
            </v-icon>
            <div class="label-text">メモ</div>
          </v-chip>
          <div class="label-value">{{ props.itemDetail.memo }}</div>
        </template>
      </div>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.root {
  border-radius: 0;
  padding-bottom: 1rem;
}

.header-card {
  padding: 0.5rem 1rem;

  .header-card-title {
    display: flex;
    align-item: center;

    .card-title {
      font-size: 0.6rem;
      font-weight: 600;
      color: $darkGray;
    }
  }
}

.chip-container {
  .label-text {
    padding-top: 1px;
  }
}

.label-value {
  color: $darkGray;
  font-size: 0.6rem;
  padding-left: 0.2rem;
}
</style>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { KINDS } from 'peperomia-util'
import { ItemDetail } from 'peperomia-util/build/firestore/itemDetail'

type Props = {
  itemDetail: ItemDetail
}

export default defineComponent({
  props: {
    itemDetail: { type: Object, required: true },
  },
  setup(props: Props) {
    const kindData = KINDS[props.itemDetail.kind]

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
