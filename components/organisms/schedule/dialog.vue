<template>
  <v-dialog v-model="openDialog" width="500">
    <div>
      <v-sheet v-if="loading" elevation="4" width="500" height="200">
        <div class="loading-container">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </v-sheet>
      <div v-if="mode === 'loading'" />
      <editItem
        v-else-if="mode === 'editItem'"
        :loading="postLoading"
        :item="item"
        :on-cancel="onCancel"
        :on-save="onSaveItem"
      />
      <editItemDetail
        v-else-if="mode === 'editItemDetail'"
        :loading="postLoading"
        :item-detail="selectedItemDetail"
        :on-cancel="onCancel"
        :on-save="onSaveItemDetail"
      />
      <itemDialog
        v-else
        edit
        :loading="loading"
        :api-loading="postLoading"
        :calendar="calendar"
        :on-edit-item="onEditItem"
        :on-edit-item-detail="onEditItemDetail"
        :on-save-calendar="onSaveCalendar"
      />
    </div>
  </v-dialog>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script lang="ts">
import {
  defineComponent,
  watch,
  computed,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import itemDialog from './index.vue'
import editItem from './edit.vue'
import editItemDetail from '~/components/organisms/scheduleDetail/edit.vue'
import useCalendar from '~/use/useCalendar'
import useItemDetail, { ItemDetail } from '~/use/useItemDetail'

type State = {
  mode: 'show' | 'editItemDetail' | 'editItem' | 'loading'
}

const initialState = (): State => ({
  mode: 'loading',
})

export default defineComponent({
  components: {
    itemDialog,
    editItem,
    editItemDetail,
  },

  setup(_, ctx: SetupContext) {
    const state = reactive<State>(initialState())
    const { loading, calendar, fetchCalendar } = useCalendar(ctx)
    const useItemDetailData = useItemDetail(ctx)

    const setItemData = async () => {
      state.mode = 'loading'

      if (ctx.root.$store.state.itemDialog.date) {
        await fetchCalendar(ctx.root.$store.state.itemDialog.date)
        state.mode = 'show'
      }
    }

    const openDialog = computed({
      get: () => ctx.root.$store.getters.isOpenItemDialog,
      set: (val) => {
        if (!val) {
          ctx.root.$store.commit('CLOSE_ITEM_DIALOG')
        }
      },
    })

    watch(openDialog, async (newOpen, oldOpen) => {
      if (newOpen && !oldOpen) {
        await setItemData()
      }
    })

    const onEditItemDetail = (itemDetailId: string) => {
      useItemDetailData.fetchItemDetail(
        ctx.root.$store.state.itemDialog.date,
        calendar.value?.item?.id || '',
        itemDetailId
      )

      state.mode = 'editItemDetail'
    }

    const onEditItem = () => {
      state.mode = 'editItem'
    }

    const onCancel = () => {
      state.mode = 'show'
    }

    const onSaveItem = async () => {}

    const onSaveItemDetail = async (itemDetail: ItemDetail) => {
      const res = await useItemDetailData.updateItemDetail(
        ctx.root.$store.state.itemDialog.date,
        calendar.value?.item?.id || '',
        itemDetail
      )

      if (res.errors) {
        return
      }

      await setItemData()
      state.mode = 'show'
    }

    const onSaveCalendar = async () => {}

    return {
      ...toRefs(state),
      calendar,
      loading,
      openDialog,
      selectedItemDetail: useItemDetailData.itemDetail,
      onEditItem,
      onEditItemDetail,
      onCancel,
      onSaveItem,
      onSaveItemDetail,
      onSaveCalendar,
    }
  },
})
</script>
