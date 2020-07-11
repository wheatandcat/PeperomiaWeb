<template>
  <div>
    aaa
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  // SetupContext,
  onServerPrefetch,
  toRefs,
} from '@vue/composition-api'

type State = {}

export default defineComponent({
  layout: 'simple',
  setup() {
    const state = reactive<State>({})

    onServerPrefetch(() => {
      console.log('aaaa')
    })

    onMounted(() => {})

    return {
      ...toRefs(state),
    }
  },
})
</script>
