import { reactive, SetupContext, toRefs } from '@vue/composition-api'
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
import { post } from '~/modules/fetch.ts'

type useFetchItem = {
  item: Item | null
  itemDetails: ItemDetail[]
  calendar: Calendar | null
  loading: boolean
  postLoading: boolean
}

const useFetchItem = (ctx: SetupContext) => {
  const firestore = ctx.root.$fire.firestore
  const uid = ctx.root.$store.state.authUser?.uid

  const state = reactive<useFetchItem>({
    item: null,
    itemDetails: [],
    calendar: null,
    loading: true,
    postLoading: false,
  })

  const fetchItem = async (itemID: string) => {
    state.loading = true
    state.item = await findItemByID(firestore, uid, itemID)
    state.itemDetails = await findItemDetailByItemID(firestore, uid, itemID)
    state.calendar = await findCalendarByItemID(firestore, uid, itemID)

    state.loading = false
  }

  const saveItem = async (item: Item): Promise<boolean> => {
    state.postLoading = true
    const res = await post(ctx, 'UpdateItem', {
      item,
    })

    state.postLoading = false
    return res.ok
  }

  const saveItemDetail = async (itemDetail: ItemDetail): Promise<boolean> => {
    state.postLoading = true
    const res = await post(ctx, 'UpdateItemDetail', {
      itemDetail,
    })

    state.postLoading = false
    return res.ok
  }

  const saveCalendar = async (calendar: Calendar): Promise<boolean> => {
    const res = await post(ctx, 'UpdateCalendar', {
      calendar,
    })

    return res.ok
  }

  return {
    ...toRefs(state),
    fetchItem,
    saveItem,
    saveItemDetail,
    saveCalendar,
  }
}

export default useFetchItem
