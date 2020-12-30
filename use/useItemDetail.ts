import { reactive, SetupContext, toRefs } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import query from '~/queries/itemDetail.gql'
import updateItemDetailQuery from '~/queries/updateItemDetail.gql'
import {
  ItemDetailQuery,
  ItemDetailQueryVariables,
  UpdateItemDetailMutation,
  UpdateItemDetailMutationVariables,
} from '~/queries/types'

dayjs.extend(advancedFormat)

export type ItemDetail = ItemDetailQuery['itemDetail'] | null

type UseFetchItemDetailState = {
  itemDetail: ItemDetail
  loading: boolean
}

const useItemDetail = (ctx: SetupContext) => {
  const state = reactive<UseFetchItemDetailState>({
    itemDetail: null,
    loading: true,
  })

  const fetchItemDetail = async (
    date: string,
    itemId: string,
    itemDetailId: string
  ) => {
    state.loading = true
    const res = await ctx.root.$apollo.query<
      ItemDetailQuery,
      ItemDetailQueryVariables
    >({
      query,
      fetchPolicy: 'network-only',
      variables: {
        date: dayjs(date).format('YYYY-MM-DDT00:00:00'),
        itemId,
        itemDetailId,
      },
    })

    state.itemDetail = res.data.itemDetail
    state.loading = false
  }

  const updateItemDetail = async (
    date: string,
    itemId: string,
    itemDetail: ItemDetail
  ) => {
    const variables: UpdateItemDetailMutationVariables = {
      itemDetail: {
        date: dayjs(date).format('YYYY-MM-DDT00:00:00'),
        itemId,
        id: itemDetail?.id || '',
        kind: itemDetail?.kind || '',
        title: itemDetail?.title || '',
        url: itemDetail?.url || '',
        memo: itemDetail?.memo || '',
        place: itemDetail?.place || '',
        priority: itemDetail?.priority || 0,
      },
    }

    const res = await ctx.root.$apollo.mutate<
      UpdateItemDetailMutation,
      UpdateItemDetailMutationVariables
    >({
      mutation: updateItemDetailQuery,
      variables,
    })

    return res
  }

  return {
    ...toRefs(state),
    fetchItemDetail,
    updateItemDetail,
  }
}

export default useItemDetail
