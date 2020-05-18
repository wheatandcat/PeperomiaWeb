<template>
  <v-dialog v-model="openDialog" width="500">
    <div>
      <v-sheet v-if="state.loading" elevation="4" width="500" height="200">
        <div class="loading-container">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </v-sheet>
      <div v-if="state.mode === 'loading'" />
      <editItem
        v-else-if="state.mode === 'editItem'"
        :loading="state.apiLoading"
        :item="state.item"
        :on-cancel="onCancel"
        :on-save="onSaveItem"
      />
      <editItemDetail
        v-else-if="state.mode === 'editItemDetail'"
        :loading="state.apiLoading"
        :item-detail="state.selectedItemDetail"
        :on-cancel="onCancel"
        :on-save="onSaveItemDetail"
      />
      <itemDialog
        v-else
        :loading="state.loading"
        :api-loading="state.apiLoading"
        :item="state.item"
        :item-details="state.itemDetails"
        :calendar="state.calendar"
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
  SetupContext,
  computed,
  reactive,
} from '@vue/composition-api'
import {
  findByID as findItemByID,
  Item,
} from 'peperomia-util/build/firestore/item'
import {
  findByItemID as findItemDetailByItemID,
  ItemDetail,
} from 'peperomia-util/build/firestore/itemDetail'
import {
  findByItemID as findCalendarByItemID,
  Calendar,
} from 'peperomia-util/build/firestore/calendar'
import itemDialog from './index.vue'
import editItem from './edit.vue'
import editItemDetail from '~/components/organisms/scheduleDetail/edit.vue'
import { post } from '~/modules/fetch.ts'

type State = {
  mode: 'show' | 'editItemDetail' | 'editItem' | 'loading'
  selectedItemDetail: ItemDetail | null | undefined
  loading: boolean
  apiLoading: boolean
  item: Item | null
  itemDetails: ItemDetail[] | null
  calendar: Calendar | null
}

const initState: State = {
  mode: 'loading',
  selectedItemDetail: null,
  loading: true,
  apiLoading: false,
  item: {
    id: '',
    uid: '',
    title: '',
    kind: '',
  },
  itemDetails: [],
  calendar: {
    id: '',
    itemId: '',
    uid: '',
    date: '',
  },
}

export default defineComponent({
  components: {
    itemDialog,
    editItem,
    editItemDetail,
  },

  setup(_, context: SetupContext) {
    const state = reactive<State>(initState)

    const setItemData = async () => {
      state.mode = 'loading'
      state.loading = true

      const itemDialog = context.root.$store.state.itemDialog
      const firestore = context.root.$fireStore
      const uid = context.root.$store.state.authUser?.uid
      const itemID = itemDialog.id

      if (itemID && uid) {
        const item: any = await findItemByID(firestore, uid, itemID)
        const itemDetails = await findItemDetailByItemID(firestore, uid, itemID)
        const calendar = await findCalendarByItemID(firestore, uid, itemID)

        state.item = {
          id: item.id,
          uid: item.uid,
          title: item.title,
          kind: item.kind,
        }

        state.itemDetails = itemDetails

        state.calendar = {
          id: calendar.id,
          itemId: calendar.itemId,
          uid: calendar.uid,
          date: calendar.date,
        }

        state.mode = 'show'
      }

      state.loading = false
    }

    const openDialog = computed({
      get: () => context.root.$store.getters.isOpenItemDialog,
      set: (val) => {
        if (!val) {
          context.root.$store.commit('CLOSE_ITEM_DIALOG')
        }
      },
    })

    watch(openDialog, async (newOpen, oldOpen) => {
      if (newOpen && !oldOpen) {
        await setItemData()
      }
    })

    const onEditItemDetail = (itemDetailId: string) => {
      if (!state.itemDetails) {
        return
      }

      state.selectedItemDetail = state.itemDetails.find(
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
      state.apiLoading = true

      const res = await post(context, 'UpdateItem', {
        item,
      })

      if (res.ok) {
        await setItemData()
        state.mode = 'show'
      }

      state.apiLoading = false
    }

    const onSaveItemDetail = async (itemDetail: ItemDetail) => {
      state.apiLoading = true

      const res = await post(context, 'UpdateItemDetail', {
        itemDetail,
      })

      if (res.ok) {
        await setItemData()
        state.mode = 'show'
      }

      state.apiLoading = false
    }

    const onSaveCalendar = async (calendar: Calendar) => {
      const res = await post(context, 'UpdateCalendar', {
        calendar,
      })

      if (res.ok) {
        await setItemData()
      }

      const authUser = context.root.$store.state?.authUser
      context.root.$store.dispatch('getCalendarData', { authUser })
    }

    return {
      openDialog,
      state,
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
