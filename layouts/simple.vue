<template>
  <v-app dark>
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

.content {
  background-color: #eee;
}
</style>
