<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
  watch,
} from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { KINDS } from 'peperomia-util'
import { ItemDetail } from '~/use/useItemDetail'

type State = {
  title: string
  kind: string
  memo: string
  place: string
  url: string
}

type Props = {
  loading: boolean
  apiLoading: boolean
  itemDetail: ItemDetail
  onCancel: () => void
  onSave: (itemDetail: ItemDetail) => Promise<void>
}

dayjs.extend(advancedFormat)

const initialState = (props: Props): State => ({
  title: props.itemDetail?.title || '',
  kind: props.itemDetail?.kind || '',
  memo: props.itemDetail?.memo || '',
  place: props.itemDetail?.place || '',
  url: props.itemDetail?.url || '',
})

export default defineComponent<Props>({
  props: {
    apiLoading: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    itemDetail: { type: Object, default: () => {} },
    onCancel: { type: Function, default: () => {} },
    onSave: { type: Function, default: () => {} },
  },
  setup(props) {
    const state = reactive<State>(initialState(props))

    watch(
      () => props.itemDetail?.id,
      (newVal, oldVal) => {
        if (newVal !== oldVal) {
          state.title = props.itemDetail?.title || ''
          state.kind = props.itemDetail?.kind || ''
          state.memo = props.itemDetail?.memo || ''
          state.place = props.itemDetail?.place || ''
          state.url = props.itemDetail?.url || ''
        }
      }
    )

    const kindData = () => {
      return (
        KINDS[props.itemDetail?.kind || ''] || {
          src: '',
          backgroundColor: '',
        }
      )
    }

    const bg = computed(() => {
      return {
        backgroundColor: kindData().backgroundColor,
      }
    })

    const onSaveItemDetail = () => {
      const param: ItemDetail = {
        id: props.itemDetail?.id || '',
        priority: props.itemDetail?.priority || 0,
        ...state,
      }

      props.onSave(param)
    }

    return {
      ...toRefs(state),
      kindData,
      bg,
      onSaveItemDetail,
    }
  },
})
</script>

<template>
  <v-sheet elevation="4" width="500">
    <div v-if="loading" class="loading">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <div v-else class="header-itme" :style="bg">
      <div class="header-item-title pb-5">
        <div class="img-icon">
          <v-img :src="kindData().src" width="40" height="40" />
        </div>
        <div class="item-title pt-3">
          <v-text-field v-model="title" single-line />
        </div>
      </div>
      <div class="px-6">
        <div>
          <v-text-field
            v-model="place"
            label="場所"
            prepend-icon="mdi-map-marker-outline"
            color="secondary"
            single-line
          />
        </div>
        <div>
          <v-text-field
            v-model="url"
            label="URL"
            prepend-icon="mdi-link"
            color="secondary"
            single-line
          />
        </div>
        <div>
          <v-textarea
            v-model="memo"
            label="メモ"
            prepend-icon="mdi-view-list"
            color="secondary"
            single-line
            auto-grow
          />
        </div>
      </div>
      <div class="edit-action">
        <v-btn color="error" class="edit-button" text @click="onCancel">
          キャンセル
        </v-btn>
        <v-btn
          color="primary"
          class="edit-button"
          :loading="apiLoading"
          :disabled="apiLoading"
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
  color: map-get($primary, main) !important;
  font-weight: bold;
}

::v-deep textarea {
  color: map-get($primary, main) !important;
  font-weight: bold;
  padding-top: 0.175rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: map-get($background, main);
  height: 500px;
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

      color: map-get($base, main);

      ::v-deep input {
        color: map-get($base, main) !important;
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
