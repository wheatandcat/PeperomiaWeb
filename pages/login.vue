<script lang="tsx">
import { defineComponent, SetupContext } from '@vue/composition-api'
import firebase from 'firebase'
import Login from '~/components/templates/login/index.vue'

export type LoginType = {
  fbGoogleLogin: () => Promise<void>
}

export default defineComponent({
  layout: 'simple',
  setup(_, context: SetupContext) {
    const fbGoogleLogin = async () => {
      try {
        const googleProvider = new firebase.auth.GoogleAuthProvider()

        await context.root.$fireAuth.signInWithPopup(googleProvider)

        context.root.$fireAuth.onAuthStateChanged(() => {
          context.root.$router.push('/')
        })
      } catch (e) {
        console.log(e)
      }
    }

    return () => (
      <div>
        <Login fbGoogleLogin={fbGoogleLogin} />
      </div>
    )
  },
})
</script>
