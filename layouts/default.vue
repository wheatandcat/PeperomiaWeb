<template>
  <v-app dark>
    <scheduleDialog />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in getItems()"
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
      <v-app-bar-nav-icon @click.stop="onDrawer" />
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
  onMounted,
  watch,
  toRefs,
  provide,
} from '@vue/composition-api'
import { findByUID } from 'peperomia-util/build/firestore/user'
import scheduleDialog from '~/components/organisms/schedule/dialog.vue'
import calendarStore from '~/store/calendar'

const ignoreWarnMessage =
  'The .native modifier for v-on is only valid on components but it was used on <div>.'
Vue.config.warnHandler = function (msg) {
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
  isAdmin: boolean
}

type Item = {
  icon: string
  title: string
  to: string
}

const initState = {
  clipped: false,
  drawer: false,
  miniVariant: false,
  dialog: true,
  isAdmin: false,
}

export default defineComponent({
  middleware: 'authenticated',
  components: {
    scheduleDialog,
  },

  setup(_, ctx: SetupContext) {
    provide('CalendarStore', calendarStore(ctx))
    const state = reactive<State>(initState)

    onMounted(async () => {
      const user = await findByUID(
        ctx.root.$fire.firestore,
        ctx.root.$store.state.authUser.uid
      )

      ctx.root.$store.dispatch('user/setRole', { role: user.role })
    })

    watch('$store.getters["user/isAdmin"]' as any, () => {
      state.isAdmin = ctx.root.$store.getters['user/isAdmin']
    })

    const getPhotoURL = computed(() => {
      return ctx.root.$store?.state?.authUser?.photoURL || null
    })

    const getName = computed(() => {
      const email = ctx.root.$store?.state?.authUser?.email || ''

      const name = email.split('@')[0]

      return name
    })

    const logout = async () => {
      try {
        await ctx.root.$fire.auth.signOut()
        await ctx.root.$store.commit('RESET_STORE')
        ctx.root.$router.push('/login')
      } catch (e) {
        alert(e)
      }
    }

    const onDrawer = () => {
      state.drawer = !state.drawer
    }

    const getItems = () => {
      let items: Item[] = [
        {
          icon: 'mdi-apps',
          title: 'ダッシュボード',
          to: '/',
        },
      ]

      if (state.isAdmin) {
        items = [
          ...items,
          {
            icon: 'mdi-bell',
            title: 'ユーザー通知',
            to: '/notifications',
          },
          {
            icon: 'mdi-dev-to',
            title: 'デバッグ機能',
            to: '/debug',
          },
        ]
      }

      return items
    }

    return {
      ...toRefs(state),
      getItems,
      getPhotoURL,
      getName,
      logout,
      onDrawer,
    }
  },
})
</script>
