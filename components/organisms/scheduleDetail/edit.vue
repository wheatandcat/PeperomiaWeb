<template>
  <v-sheet elevation="4" width="500">
    <div class="header-itme" :style="bg">
      <div class="header-item-title pt-1 pb-5">
        <div class="img-icon">
          <v-img :src="kindData.src" width="40" height="40" />
        </div>
        <div class="item-title pt-3">
          {{ props.itemDetail.title }}
        </div>
      </div>
      <div class="px-6">
        <div>
          <v-text-field
            label="場所"
            prepend-icon="mdi-map-marker-outline"
            color="themeLightGreen"
            single-line
          />
        </div>
        <div>
          <v-text-field
            label="URL"
            prepend-icon="mdi-link"
            color="themeLightGreen"
            single-line
          />
        </div>
        <div>
          <v-textarea
            label="メモ"
            prepend-icon="mdi-view-list"
            color="themeLightGreen"
            single-line
            auto-grow
          />
        </div>
      </div>
      <div class="edit-action">
        <v-btn color="error" class="edit-button" text>キャンセル</v-btn>
        <v-btn color="primary" class="edit-button">保存</v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

::v-deep .v-text-field > .v-input__control > .v-input__slot {
  border-style: none;
}

::v-deep .v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none;
}

::v-deep .v-text-field > .v-input__control > .v-input__slot:after {
  border-style: none;
}

::v-deep input {
  color: $main !important;
  font-weight: bold;
}

::v-deep textarea {
  color: $main !important;
  font-weight: bold;
}

.header-itme {
  background: lightgray;
  padding: 0.5rem 0rem;

  .header-item-title {
    position: relative;
    text-align: center;

    .item-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: $darkGray;
    }

    .img-icon {
      position: absolute;
      right: 1rem;
    }
  }

  .edit-action {
    display: flex;
    justify-content: flex-end;
    padding-right: 1rem;

    > .edit-button {
      margin: 0 0.25rem;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { KINDS } from 'peperomia-util'
import { ItemDetail } from 'peperomia-util/build/firestore/itemDetail'

type Props = {
  itemDetail: ItemDetail
}

dayjs.extend(advancedFormat)

export default defineComponent({
  props: {
    itemDetail: { type: Object, default: () => {} },
  },
  setup(props: Props) {
    const kindData = KINDS[props.itemDetail?.kind]
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
