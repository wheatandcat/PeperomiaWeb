<template>
  <v-app dark>
    <v-dialog v-model="state.dialog" width="500">
      <v-sheet elevation="4" width="500" height="500">aaaa</v-sheet>
    </v-dialog>
    <v-navigation-drawer
      v-model="state.drawer"
      :mini-variant="state.miniVariant"
      :clipped="state.clipped"
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
    <v-app-bar :clipped-left="state.clipped" fixed app color="primary">
      <v-app-bar-nav-icon @click.stop="state.drawer = !state.drawer" />
      <img src="/logo.png" alt="logp" class="logo" />
      <v-spacer />
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="text-transform-none" color="#eee" text v-on="on">
            <v-img
              v-if="getPhotoURL"
              :src="getPhotoURL"
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

<script lang="ts">
import Vue from 'vue'
import {
  defineComponent,
  reactive,
  computed,
  SetupContext,
} from '@vue/composition-api'

const ignoreWarnMessage =
  'The .native modifier for v-on is only valid on components but it was used on <div>.'
Vue.config.warnHandler = function(msg) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    return null
  }
}

type State = {
  clipped: boolean
  drawer: boolean
  miniVariant: boolean
  dialog: boolean
}

const initState = {
  clipped: false,
  drawer: false,
  miniVariant: false,
  dialog: true,
}

export default defineComponent({
  middleware: 'authenticated',

  setup(_, context: SetupContext) {
    const state = reactive<State>(initState)

    const getPhotoURL = computed(() => {
      return context.root.$store?.state?.authUser?.photoURL || null
    })

    const getName = computed(() => {
      const email = context.root.$store?.state?.authUser?.email || ''

      const name = email.split('@')[0]

      return name
    })

    const logout = async () => {
      try {
        await context.root.$fireAuth.signOut()
        await context.root.$store.commit('RESET_STORE')
        context.root.$router.push('/login')
      } catch (e) {
        alert(e)
      }
    }

    const items = [
      {
        icon: 'mdi-apps',
        title: 'ダッシュボード',
        to: '/',
      },
    ]

    return {
      state,
      items,
      getPhotoURL,
      getName,
      logout,
    }
  },
})
</script>
