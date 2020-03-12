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

  handleSuccessfulAuthentication({ commit }, { authUser }) {
    if (process.browser && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-auth-sw.js', { scope: '/' })
    }

    commit('SET_AUTH_USER', { authUser })
  },

  async logoutUser({ commit }) {
    try {
      await this.$fireAuth.signOut()
    } catch (e) {
      // Do nothing, not properly signed in anyway.
      console.error(e)
    } finally {
      // Reset store
      commit('RESET_STORE')
    }
  },
}
