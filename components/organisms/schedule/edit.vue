<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
} from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { KINDS } from 'peperomia-util'
import { Item } from 'peperomia-util/build/firestore/item'

type State = {
  title: string
}

type Props = {
  loading: boolean
  item: Item
  onCancel: () => void
  onSave: (item: Item) => Promise<void>
}

dayjs.extend(advancedFormat)

export default defineComponent<Props>({
  props: {
    loading: { type: Boolean, default: false },
    item: { type: Object, default: () => {} },
    onCancel: { type: Function, default: () => {} },
    onSave: { type: Function, default: () => {} },
  },
  setup(props) {
    const state = reactive<State>({
      title: props.item.title,
    })

    const kindData = KINDS[props.item?.kind] || {
      src: '',
      backgroundColor: '',
    }

    const bg = computed(() => {
      return {
        backgroundColor: kindData.backgroundColor,
      }
    })

    const onSaveItem = () => {
      const param = { ...props.item, ...state }

      props.onSave(param)
    }

    return {
      ...toRefs(state),
      kindData,
      bg,
      onSaveItem,
    }
  },
})
</script>

<template>
  <v-sheet elevation="4" width="500" height="350">
    <div class="header-itme" :style="bg">
      <div class="header-item-title pb-5">
        <div class="img-icon">
          <v-img :src="kindData.src" width="40" height="40" />
        </div>
      </div>
      <div class="inner pt-4">
        <div>
          <v-text-field
            v-model="title"
            label="タイトル"
            single-line
            autofocus
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
          :loading="loading"
          :disabled="loading"
          @click="onSaveItem"
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
  font-size: 1.4rem;
  text-align: center;
  width: 500px;
}

::v-deep .v-label {
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  width: 100%;
}

.header-itme {
  height: 100%;
  background: lightgray;
  padding: 0.5rem 0rem;

  .header-item-title {
    position: relative;
    text-align: center;

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

.inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}
</style>
