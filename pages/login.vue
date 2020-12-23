<template>
  <Login :fb-google-login="fbGoogleLogin" />
</template>

<script lang="ts">
import { defineComponent, SetupContext, watch } from '@vue/composition-api'
import firebase from 'firebase'
import Login from '~/components/templates/login/index.vue'
import { setSession } from '~/modules/auth'

export type LoginType = {
  fbGoogleLogin: () => Promise<void>
}

export default defineComponent({
  layout: 'simple',
  components: {
    Login,
  },
  setup(_, ctx: SetupContext) {
    const fbGoogleLogin = async () => {
      console.log('fbGoogleLogin')

      try {
        const googleProvider = new firebase.auth.GoogleAuthProvider()

        await ctx.root.$fire.auth.signInWithPopup(googleProvider)

        ctx.root.$fire.auth.onAuthStateChanged(async () => {
          await setSession(ctx, true)
          const authUser = ctx.root.$fire.auth.currentUser
          ctx.root.$store.dispatch('onAuthStateChanged', { authUser })
        })
      } catch (e) {
        console.log(e)
      }
    }

    watch(
      () => ctx.root.$store.getters.isLoggedIn,
      (value) => {
        if (value) {
          setSession(ctx, true)
          ctx.root.$router.push('/')
        }
      }
    )

    return {
      fbGoogleLogin,
    }
  },
})
</script>
