import { reactive, SetupContext, toRefs } from '@vue/composition-api'
import { CalendarsQuery, CalendarsQueryVariables } from '~/queries/types'
import query from '~/queries/calendars.gql'

export type Calendars = NonNullable<CalendarsQuery['calendars']>

type State = {
  calendars: Calendars
  loading: boolean
}

const initialState = (): State => ({
  calendars: [],
  loading: false,
})

export type CalendarStore = ReturnType<typeof calendarStore>

export default function calendarStore(ctx: SetupContext) {
  const state = reactive<State>(initialState())

  const fetchCalendars = async (variables: CalendarsQueryVariables) => {
    state.loading = true

    const res = await ctx.root.$apollo.query<
      CalendarsQuery,
      CalendarsQueryVariables
    >({
      query,
      fetchPolicy: 'network-only',
      variables,
    })

    state.calendars = res.data.calendars || []
    state.loading = false
  }

  return { ...toRefs(state), fetchCalendars }
}
