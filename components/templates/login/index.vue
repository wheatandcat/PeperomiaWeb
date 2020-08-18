<template>
  <div class="root">
    <div class="icon">
      <v-img src="/logo.png" alt="logo" width="50px" height="50px" contain />
    </div>
    <v-sheet
      tile
      class="mx-auto"
      height="300"
      width="100%"
      max-width="480"
      elevation="2"
    >
      <div class="form-container">
        <div class="title">新規会員登録</div>
        <v-divider class="divider" />

        <div class="button-container">
          <v-btn
            x-large
            class="text-transform-none"
            block
            outlined
            @click.prevent="fbGoogleLogin"
          >
            <v-icon left color="secondary">mdi-google-plus</v-icon>
            Googleで登録する
          </v-btn>
        </div>
        <div class="guide">
          <div class="link">
            <v-btn
              x-small
              class="text-transform-none"
              text
              color="primary"
              href="https://amazing-hawking-a280c3.netlify.com/general/account/"
              target="_blank"
            >
              会員登録するとできること
              <v-icon small left>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-sheet>
    <div class="links">
      <v-btn
        x-small
        class="text-transform-none"
        text
        href="https://peperomia.app/tos"
        target="_blank"
      >
        利用規約
      </v-btn>
      |
      <v-btn
        x-small
        class="text-transform-none"
        text
        href="https://peperomia.app/policy"
        target="_blank"
      >
        プライバシーポリシー
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.root {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.form-container {
  display: flex;
  justify-content: center;
  flex-direction: column;

  .title {
    text-align: center;
    padding-top: 15px;
  }

  .divider {
    margin: 15px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 25px 60px;
    width: 100%;
  }

  .guide {
    position: relative;
    height: 100px;

    .link {
      position: absolute;
      left: 35%;
      bottom: 0;
    }
  }
}

.links {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 12px;
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { LoginType } from '~/pages/login.vue'

type Props = LoginType

export default defineComponent<Props>({
  props: {
    fbGoogleLogin: { type: Function, required: true },
  },
})
</script>
