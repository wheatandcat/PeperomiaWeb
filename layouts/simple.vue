<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <img src="/logo.png" alt="logp" class="logo" />
      <v-spacer />
    </v-app-bar>
    <v-content class="content">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.logo {
  width: 30px;
  height: 30px;
}

.content {
  background-color: #eee;
}
</style>
