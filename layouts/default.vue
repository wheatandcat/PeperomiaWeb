<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <img src="/logo.png" alt="logp" class="logo" />
      <v-spacer />
    </v-app-bar>
    <v-content>
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
</style>

<script>
import Vue from 'vue'
const ignoreWarnMessage =
  'The .native modifier for v-on is only valid on components but it was used on <div>.'
Vue.config.warnHandler = function(msg) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    return
  }
}

export default Vue.extend({
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
    }
  },
})
</script>
