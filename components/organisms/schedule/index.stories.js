import { storiesOf } from '@storybook/vue'

import Index from './index.vue'

storiesOf('templates', module).add('スケジュール', () => ({
  components: { Index },
  data: () => ({
    item: {
      id: 'test',
      uid: 'test',
      title: '葛西臨海公園',
      kind: 'park',
    },
  }),
  template: '<div style="padding:1rem;"><Index :item="item" /></div>',
}))
