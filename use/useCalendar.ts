import { reactive, SetupContext, toRefs } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import query from '~/queries/calendar.gql'
import { CalendarQuery, CalendarQueryVariables } from '~/queries/types'

dayjs.extend(advancedFormat)

export type Calendar = CalendarQuery['calendar'] | null

type UseFetchCalendarState = {
  calendar: Calendar
  loading: boolean
}

const useCalendar = (ctx: SetupContext) => {
  const state = reactive<UseFetchCalendarState>({
    calendar: null,
    loading: true,
  })

  const fetchCalendar = async (date: string) => {
    state.loading = true
    const res = await ctx.root.$apollo.query<
      CalendarQuery,
      CalendarQueryVariables
    >({
      query,
      fetchPolicy: 'network-only',
      variables: { date: dayjs(date).format('YYYY-MM-DDT00:00:00') },
    })

    state.calendar = res.data.calendar
    state.loading = false
  }

  return {
    ...toRefs(state),
    fetchCalendar,
  }
}

export default useCalendar
