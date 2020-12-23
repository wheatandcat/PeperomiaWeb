import { ActionTree } from 'vuex'
import { State } from './state'
import { getCalendars } from '~/modules/calendar.ts'

const actions: ActionTree<State, State> = {
  async nuxtServerInit({ dispatch }, ctx) {
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },

  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      try {
        const idToken = await authUser.getIdToken(true)
        console.info('idToken', idToken)
      } catch (e) {
        console.error(e)
      }
    }
    commit('SET_AUTH_USER', { authUser })
  },
  async getCalendarData({ commit }, { authUser }) {
    const uid = authUser?.uid
    const firestore = this.$fire.firestore

    if (uid) {
      const result = await getCalendars(firestore, uid)
      commit('SET_CALENDARS', { calendars: result })
    }
  },
}

export default actions
