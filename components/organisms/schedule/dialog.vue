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
        :item="item"
        :item-details="itemDetails"
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
import { Item } from 'peperomia-util/build/firestore/item'
import { ItemDetail } from 'peperomia-util/build/firestore/itemDetail'
import { Calendar } from 'peperomia-util/build/firestore/calendar'
import itemDialog from './index.vue'
import editItem from './edit.vue'
import editItemDetail from '~/components/organisms/scheduleDetail/edit.vue'
import useFetchItem from '~/use/item.ts'

type State = {
  mode: 'show' | 'editItemDetail' | 'editItem' | 'loading'
  selectedItemDetail: ItemDetail | null | undefined
}

const initState: State = {
  mode: 'loading',
  selectedItemDetail: null,
}

export default defineComponent({
  components: {
    itemDialog,
    editItem,
    editItemDetail,
  },

  setup(_, ctx: SetupContext) {
    const state = reactive<State>(initState)
    const {
      item,
      itemDetails,
      calendar,
      loading,
      postLoading,
      fetchItem,
      saveItem,
      saveItemDetail,
      saveCalendar,
    } = useFetchItem(ctx)

    const setItemData = async () => {
      state.mode = 'loading'

      const itemID = ctx.root.$store.state.itemDialog.id

      if (itemID) {
        await fetchItem(itemID)
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
      if (!itemDetails.value) {
        return
      }

      state.selectedItemDetail = itemDetails.value.find(
        (v) => v.id === itemDetailId
      )

      if (state.selectedItemDetail?.id) {
        state.mode = 'editItemDetail'
      }
    }

    const onEditItem = () => {
      state.mode = 'editItem'
    }

    const onCancel = () => {
      state.mode = 'show'
    }

    const onSaveItem = async (item: Item) => {
      const ok = await saveItem(item)

      if (ok) {
        await setItemData()
        state.mode = 'show'
      }
    }

    const onSaveItemDetail = async (itemDetail: ItemDetail) => {
      const ok = await saveItemDetail(itemDetail)

      if (ok) {
        await setItemData()
        state.mode = 'show'
      }
    }

    const onSaveCalendar = async (calendar: Calendar) => {
      const ok = await saveCalendar(calendar)

      if (ok) {
        await setItemData()
      }

      const authUser = ctx.root.$store.state?.authUser
      ctx.root.$store.dispatch('getCalendarData', { authUser })
    }

    return {
      ...toRefs(state),
      item,
      itemDetails,
      calendar,
      loading,
      postLoading,
      openDialog,
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
