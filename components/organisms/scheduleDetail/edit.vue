<template>
  <v-sheet elevation="4" width="500">
    <div class="header-itme" :style="bg">
      <div class="header-item-title pb-5">
        <div class="img-icon">
          <v-img :src="kindData.src" width="40" height="40" />
        </div>
        <div class="item-title pt-3">
          <v-text-field v-model="state.title" single-line />
        </div>
      </div>
      <div class="px-6">
        <div>
          <v-text-field
            v-model="state.place"
            label="場所"
            prepend-icon="mdi-map-marker-outline"
            color="themeLightGreen"
            single-line
          />
        </div>
        <div>
          <v-text-field
            v-model="state.url"
            label="URL"
            prepend-icon="mdi-link"
            color="themeLightGreen"
            single-line
          />
        </div>
        <div>
          <v-textarea
            v-model="state.memo"
            label="メモ"
            prepend-icon="mdi-view-list"
            color="themeLightGreen"
            single-line
            auto-grow
          />
        </div>
      </div>
      <div class="edit-action">
        <v-btn color="error" class="edit-button" text @click="props.onCancel">
          キャンセル
        </v-btn>
        <v-btn
          color="primary"
          class="edit-button"
          :loading="props.loading"
          :disabled="props.loading"
          @click="onSaveItemDetail"
        >
          保存
        </v-btn>
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
  padding-top: 0.175rem;
}

.header-itme {
  background: lightgray;
  padding: 0.5rem 0rem;

  .header-item-title {
    position: relative;
    text-align: center;

    .item-title {
      position: relative;
      font-size: 1.5rem;
      font-weight: 600;

      color: $darkGray;

      ::v-deep input {
        color: $darkGray !important;
        font-weight: bold;
        font-size: 1.3rem;
        text-align: center;
      }
    }

    .img-icon {
      position: absolute;
      right: 1rem;
      top: 1.1rem;
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
import { defineComponent, computed, reactive } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { KINDS } from 'peperomia-util'
import { ItemDetail } from 'peperomia-util/build/firestore/itemDetail'

type State = {
  title: string
  kind: string
  memo: string
  place: string
  url: string
}

type Props = {
  loading: boolean
  itemDetail: ItemDetail
  onCancel: () => void
  onSave: (itemDetail: ItemDetail) => Promise<void>
}

dayjs.extend(advancedFormat)

export default defineComponent({
  props: {
    loading: { type: Boolean, default: false },
    itemDetail: { type: Object, default: () => {} },
    onCancel: { type: Function, default: () => {} },
    onSave: { type: Function, default: () => {} },
  },
  setup(props: Props) {
    const state = reactive<State>({
      title: props.itemDetail.title,
      kind: props.itemDetail.kind,
      memo: props.itemDetail.memo,
      place: props.itemDetail.place,
      url: props.itemDetail.url,
    })

    const kindData = KINDS[props.itemDetail?.kind]
    const bg = computed(() => {
      return {
        backgroundColor: kindData.backgroundColor,
      }
    })

    const onSaveItemDetail = () => {
      const param = { ...props.itemDetail, ...state }

      props.onSave(param)
    }

    return {
      props,
      state,
      kindData,
      bg,
      onSaveItemDetail,
    }
  },
})
</script>
