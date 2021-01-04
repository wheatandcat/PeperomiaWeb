import { storiesOf } from '@storybook/vue'

import Index from './index.vue'
import Edit from './edit.vue'

storiesOf('organisms/schedule', module)
  .add('スケジュール', () => ({
    components: { Index },
    data: () => ({
      calendar: {
        id: 'test',
        date: '2019-02-10',
        public: true,
        item: {
          id: 'test',
          uid: 'test',
          title: '葛西臨海公園',
          kind: 'park',
          itemDetails: [
            {
              id: '1',
              title: '喫茶店',
              kind: 'coffee',
              memo: '',
              place: '',
              url: '',
              priority: 1,
            },
            {
              id: '2',
              title: '新宿駅',
              kind: 'train',
              memo: '弁当持参',
              place: '東京都',
              url: 'https://peperomia.info/',
              priority: 2,
            },
            {
              id: '3',
              title: 'お花見',
              kind: 'cherry_blossom',
              memo: '',
              place: '',
              url: '',
              priority: 3,
            },
          ],
        },
      },
    }),
    template:
      '<div style="padding:1rem;"><Index :item="item" :calendar="calendar" :item-details="itemDetails" /></div>',
  }))
  .add('タイトル編集', () => ({
    components: { Edit },
    data: () => ({
      item: {
        id: 'test',
        uid: 'test',
        title: '葛西臨海公園',
        kind: 'park',
      },
    }),
    template: '<div style="padding:1rem;"><Edit :item="item"  /></div>',
  }))
