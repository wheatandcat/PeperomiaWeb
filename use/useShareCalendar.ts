import { reactive, SetupContext, toRefs } from '@vue/composition-api'
import shareItemQuery from '~/queries/shareItem.gql'
import { ShareItemQuery, ShareItemQueryVariables } from '~/queries/types'

type UseFetchShareItemState = {
  calendar: ShareItemQuery['shareItem'] | null
  loading: boolean
}

const useFetchShareItem = (ctx: SetupContext) => {
  const state = reactive<UseFetchShareItemState>({
    calendar: null,
    loading: true,
  })

  const fetchShareItem = async (id: string) => {
    state.loading = true
    const res = await ctx.root.$apollo.query<
      ShareItemQuery,
      ShareItemQueryVariables
    >({
      query: shareItemQuery,
      fetchPolicy: 'network-only',
      variables: { id },
      client: 'publicClient',
    })

    state.calendar = res.data.shareItem
    state.loading = false
  }

  return {
    ...toRefs(state),
    fetchShareItem,
  }
}

export default useFetchShareItem
