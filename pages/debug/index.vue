<template>
  <div class="root">
    <v-sheet elevation="4" width="400">
      <v-form v-model="state.sendCalendarPushNotifications.valid" class="form">
        <h3>カレンダー当日通知</h3>

        <v-date-picker
          v-model="state.sendCalendarPushNotifications.date"
          :rules="[required]"
          :day-format="(date) => new Date(date).getDate()"
          locale="jp-ja"
        />

        <div class="my-5">
          <v-btn color="primary" large @click="onSendCalendarPushNotifications">
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

<script lang="ts">
import { defineComponent, reactive, SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { get } from '~/modules/fetch.ts'

dayjs.extend(advancedFormat)

type State = {
  loading: boolean
  sendCalendarPushNotifications: {
    valid: boolean
    date: string
  }
}

const initialState = () => ({
  loading: false,
  sendCalendarPushNotifications: {
    valid: false,
    date: dayjs().format('YYYY-MM-DD'),
  },
})

export default defineComponent({
  setup(_, ctx: SetupContext) {
    const state = reactive<State>(initialState())

    const onSendCalendarPushNotifications = async () => {
      state.loading = true

      console.log(state.sendCalendarPushNotifications.date)

      await get(
        ctx,
        `cron/SendCalendarPushNotifications?date=${state.sendCalendarPushNotifications.date}T00:00:00`
      )

      state.loading = false
    }

    const required = (value: string) => !!value || '必須です.'

    return {
      state,
      required,
      onSendCalendarPushNotifications,
    }
  },
})
</script>
