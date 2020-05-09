import { storiesOf } from '@storybook/vue'

import Index from './edit.vue'

storiesOf('organisms/scheduleDetail', module).add('編集', () => ({
  components: { Index },
  data: () => ({
    itemDetail: {
      id: '1',
      title: '喫茶店',
      kind: 'coffee',
      memo: 'メモ帳もってくる',
      place: '東京都',
      url: 'https://peperomia.app/',
      priority: 1,
    },
  }),
  template:
    '<div style="padding:1rem;"><Index :item-detail="itemDetail" /></div>',
}))
