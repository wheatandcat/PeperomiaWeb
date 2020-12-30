<script lang="ts">
import {
  defineComponent,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import { post } from '~/modules/fetch.ts'

type State = {
  loading: boolean
  uuid: string
  title: string
  body: string
  urlScheme: string
  valid: boolean
}

const initialState = () => ({
  uuid: '',
  title: '',
  body: '',
  urlScheme: '',
  loading: false,
  valid: false,
})

export default defineComponent({
  setup(_, ctx: SetupContext) {
    const state = reactive<State>(initialState())

    const onPushNotidication = async () => {
      state.loading = true

      await post(ctx, 'admin/SentPushNotifications', {
        uid: state.uuid,
        title: state.title,
        body: state.body,
        urlScheme: state.urlScheme,
      })

      state.loading = false
    }

    const required = (value: string) => !!value || '必須です.'

    return {
      ...toRefs(state),
      required,
      onPushNotidication,
    }
  },
})
</script>

<template>
  <div class="root">
    <v-sheet elevation="4" width="500">
      <v-form v-model="valid" class="form">
        <h3>Push通知送信</h3>
        <v-text-field v-model="uuid" label="uuid" :rules="[required]" />

        <v-text-field v-model="title" label="タイトル" :rules="[required]" />

        <v-textarea
          v-model="body"
          label="本文"
          auto-grow
          rows="1"
          :rules="[required]"
        />

        <v-text-field v-model="urlScheme" label="URLスキーマ" />

        <div class="my-5">
          <v-btn color="primary" large @click="onPushNotidication">
            送信する
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<style lang="scss" scoped>
.root {
  padding: 1rem 2rem;
}

.form {
  padding: 1rem 2rem;
}
</style>
