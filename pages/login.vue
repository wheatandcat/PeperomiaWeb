<template>
  <div class="pa-10">
    <v-sheet
      tile
      class="mx-auto"
      height="400"
      width="100%"
      max-width="480"
      elevation="2"
    >
      <v-sheet color="primary" width="60" height="60">
        <img src="/logo.png" alt="logp" />
      </v-sheet>
      <div class="form-container">
        <v-btn
          color="secondary"
          large
          class="text-transform-none"
          @click.prevent="fbGoogleLogin"
        >
          <v-icon left>mdi-google-plus</v-icon>
          Googleでログイン
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>

<script>
import Vue from 'vue'
import firebase from 'firebase'

export default Vue.extend({
  layout: 'simple',

  methods: {
    async fbGoogleLogin() {
      const googleProvider = new firebase.auth.GoogleAuthProvider()

      await this.$fireAuth.signInWithPopup(googleProvider)

      this.$fireAuth.onAuthStateChanged(() => {
        this.$router.push('/')
      })
    },
  },
})
</script>
