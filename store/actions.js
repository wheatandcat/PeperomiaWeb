export default {
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
}
