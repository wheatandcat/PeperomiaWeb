import { reactive, SetupContext, toRefs } from '@vue/composition-api'
import shareItemQuery from '~/queries/shareItem.gql'
import { ShareItemQuery, ShareItemQueryVariables } from '~/queries/types'

type UseFetchShareItemState = {
  item: ShareItemQuery['shareItem'] | null
  loading: boolean
}

const useFetchShareItem = (ctx: SetupContext) => {
  const state = reactive<UseFetchShareItemState>({
    item: null,
    loading: true,
  })

  const fetchShareItem = async (itemId: string) => {
    state.loading = true
    const res = await ctx.root.$apollo.query<
      ShareItemQuery,
      ShareItemQueryVariables
    >({
      query: shareItemQuery,
      fetchPolicy: 'network-only',
      variables: { itemId },
    })

    state.item = res.data.shareItem
    state.loading = false
  }

  return {
    ...toRefs(state),
    fetchShareItem,
  }
}

export default useFetchShareItem
