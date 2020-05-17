import { ActionTree } from 'vuex'
import { State } from './state'
import { getCalendars } from '~/modules/calendar.ts'

const actions: ActionTree<State, State> = {
  nuxtServerInit({ commit }, ctx) {
    const ssrVerifiedAuthUser = ctx.res.verifiedFireAuthUser
    const ssrVerifiedAuthUserClaims = ctx.res.verifiedFireAuthUserClaims

    if (ssrVerifiedAuthUser && ssrVerifiedAuthUserClaims) {
      commit('SET_AUTH_USER', {
        authUser: ssrVerifiedAuthUser,
        claims: ssrVerifiedAuthUserClaims,
      })
    }
  },

  onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }

    commit('SET_AUTH_USER', { authUser })
  },
  async getCalendarData({ commit }, { authUser }) {
    const uid = authUser?.uid
    const firestore = this.$fireStore

    if (uid) {
      const result = await getCalendars(firestore, uid)
      commit('SET_CALENDARS', { calendars: result })
    }
  },
}

export default actions
