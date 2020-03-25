<template>
  <Login :fb-google-login="fbGoogleLogin" />
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase'
import { defineComponent } from '@vue/composition-api'
import Login from '~/components/templates/login/index.vue'

export default defineComponent({
  layout: 'simple',
  components: {
    Login,
  },

  setup(_, context) {
    const fbGoogleLogin = async () => {
      try {
        const googleProvider = new firebase.auth.GoogleAuthProvider()

        await context.root.$fireAuth.signInWithPopup(googleProvider)

        context.root.$fireAuth.onAuthStateChanged(user => {
          context.root.$router.push('/')
        })
      } catch (e) {
        console.log(e)
      }
    }

    return {
      fbGoogleLogin,
    }
  },
})
</script>
