<template>
  <v-dialog v-model="openDialog" width="500">
    <div>
      <v-sheet v-if="loading" elevation="4" width="500" height="200">
        <div class="loading-container">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </v-sheet>
      <div v-if="mode === 'loading'" />
      <editItemDetail
        v-else-if="mode === 'editItemDetail'"
        :api-loading="postLoading"
        :loading="itemDetailLoading"
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
  inject,
} from '@vue/composition-api'
import itemDialog from './index.vue'
import editItemDetail from '~/components/organisms/scheduleDetail/edit.vue'
import useCalendar from '~/use/useCalendar'
import useItemDetail, { ItemDetail } from '~/use/useItemDetail'
import { CalendarStore } from '~/store/calendar'

type State = {
  mode: 'show' | 'editItemDetail' | 'editItem' | 'loading'
}

const initialState = (): State => ({
  mode: 'loading',
})

export default defineComponent({
  components: {
    itemDialog,
    editItemDetail,
  },

  setup(_, ctx: SetupContext) {
    const calendarStore = inject<CalendarStore>('CalendarStore')
    if (!calendarStore) {
      throw new Error(`CalendarStore is not provided`)
    }

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

    const onEditItem = () => {
      const itemDetail = (calendar?.value?.item?.itemDetails || []).find(
        (v) => v?.priority === 1
      )

      if (itemDetail) {
        onEditItemDetail(itemDetail.id)
      }
    }

    const onEditItemDetail = (itemDetailId: string) => {
      useItemDetailData.fetchItemDetail(
        ctx.root.$store.state.itemDialog.date,
        calendar.value?.item?.id || '',
        itemDetailId
      )

      state.mode = 'editItemDetail'
    }

    const onCancel = () => {
      state.mode = 'show'
    }

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

      if (itemDetail?.priority === 1) {
        await calendarStore.refetchCalendars()
      }

      state.mode = 'show'
    }

    const onSaveCalendar = async () => {}

    return {
      ...toRefs(state),
      calendar,
      loading,
      openDialog,
      selectedItemDetail: useItemDetailData.itemDetail,
      itemDetailLoading: useItemDetailData.loading,
      onEditItemDetail,
      onEditItem,
      onCancel,
      onSaveItemDetail,
      onSaveCalendar,
    }
  },
})
</script>
