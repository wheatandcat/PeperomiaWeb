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
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="text-transform-none" color="#eee" text v-on="on">
            <v-img
              :src="getStore.authUser.photoURL"
              contain
              max-width="28px"
              max-height="28px"
              class="user-photo"
            />
            <span class="my-page">
              {{ getName }}
            </span>
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>
              <span class="logout">ログアウト</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <nuxt />
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

.logout {
  color: $red;
  font-size: 12px;
}

.my-page {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}

.user-photo {
  border-radius: 20px;
  width: 28px;
  margin-right: 7px;
}
</style>

<script>
import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'

const ignoreWarnMessage =
  'The .native modifier for v-on is only valid on components but it was used on <div>.'
Vue.config.warnHandler = function(msg) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    return null
  }
}

export default Vue.extend({
  middleware: 'authenticated',
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'ダッシュボード',
          to: '/',
        },
      ],
      miniVariant: false,
    }
  },
  computed: {
    getStore() {
      return this.$store.state
    },
    getName() {
      const email = this.$store.state.authUser.email

      const name = email.split('@')[0]

      return name
    },
  },
  methods: {
    ...mapActions({
      logoutUser: 'logoutUser',
    }),
    async logout() {
      try {
        await this.logoutUser()
        this.$router.push('/login')
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>
