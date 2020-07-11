<template>
  <v-app dark>
    <v-app-bar color="primary" fixed app>
      <img src="/logo.png" alt="logp" class="logo" />

      <v-spacer />

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item href="https://peperomia.app/" target="_blank">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>ペペロミア</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
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

.content {
  background-color: #eee;
}

.logo {
  width: 30px;
  height: 30px;
}
</style>
