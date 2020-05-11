<template>
  <Login :fb-google-login="fbGoogleLogin" />
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
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
  setup(_, context: SetupContext) {
    const fbGoogleLogin = async () => {
      try {
        const googleProvider = new firebase.auth.GoogleAuthProvider()

        await context.root.$fireAuth.signInWithPopup(googleProvider)

        context.root.$fireAuth.onAuthStateChanged(async () => {
          await setSession(context, true)
          window.location.href = `${location.protocol}//${location.host}`
        })
      } catch (e) {
        console.log(e)
      }
    }

    if (context.root.$store.getters.isLoggedIn) {
      setSession(context, true)
      context.root.$router.push('/')
    }

    return {
      fbGoogleLogin,
    }
  },
})
</script>
