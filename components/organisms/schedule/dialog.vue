<template>
  <v-dialog v-model="openDialog" width="500">
    <div>
      <v-sheet v-if="state.loading" elevation="4" width="500" height="200">
        <div class="loading-container">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </v-sheet>
      <itemDialog
        v-else
        :loading="state.loading"
        :item="state.item"
        :item-details="state.itemDetails"
        :calendar="state.calendar"
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

type State = {
  loading: boolean
  item: Item | null
  itemDetails: ItemDetail[] | null
  calendar: Calendar | null
}

const initState: State = {
  loading: true,
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
  },

  setup(_, context: SetupContext) {
    const state = reactive<State>(initState)

    const setItemData = async () => {
      state.loading = true

      const itemDialog = context.root.$store.state.itemDialog
      const firestore = context.root.$fireStore
      const uid = context.root.$store.state.authUser.uid
      const itemID = itemDialog.id

      if (itemID) {
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
      }

      state.loading = false
    }

    const openDialog = computed({
      get: () => context.root.$store.getters.isOpenItemDialog,
      set: val => {
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

    return {
      openDialog,
      state,
    }
  },
})
</script>
