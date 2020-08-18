<template>
  <v-sheet elevation="4" max-width="500">
    <div v-if="!loading">
      <div class="header-itme" :style="bg">
        <v-menu
          v-if="edit"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <div class="date cursor" v-on="on">
              {{ itemDate }}
            </div>
          </template>
          <v-date-picker
            v-model="date"
            locale="jp-ja"
            :day-format="(date) => new Date(date).getDate()"
          >
            <v-spacer />
            <v-btn text color="error" @click="menu = false">キャンセル</v-btn>
            <v-btn
              color="primary"
              :loading="apiLoading"
              :disabled="apiLoading"
              @click="onSaveCalendarData"
            >
              保存
            </v-btn>
          </v-date-picker>
        </v-menu>
        <div v-else class="date">
          {{ itemDate }}
        </div>
        <div class="header-item-title">
          <div class="pr-3 py-3">
            <v-img :src="kindData.src" width="60" height="60" />
          </div>
          <div class="item-title pl-5 pt-8" @click="onEditItem">
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="item-body">
        <div
          v-for="itemDetail in itemDetails"
          :key="itemDetail.id"
          class="pa-3"
        >
          <card
            :item-detail="itemDetail"
            :on-edit-item-detail="onEditItemDetail"
          />
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
@import '~/assets/variables.scss';

.header-itme {
  background: lightgray;
  padding: 0.5rem 1rem;

  .cursor {
    cursor: pointer;
  }

  .date {
    font-size: 0.8rem;
    color: $darkGray;
  }

  .header-item-title {
    display: flex;
    align-item: center;

    .item-title {
      cursor: pointer;
      font-size: 1.3rem;
      font-weight: 600;
      color: $darkGray;
      vertical-align: middle;
    }
  }
}

.item-body {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.6rem;
  background-color: $lightGray;

  @media (max-width: 767px) {
    justify-content: center;
  }
}
</style>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { KINDS } from 'peperomia-util'
import { Item } from 'peperomia-util/build/firestore/item'
import { ItemDetail } from 'peperomia-util/build/firestore/itemDetail'
import { Calendar } from 'peperomia-util/build/firestore/calendar'
import card from './card.vue'

type Props = {
  loading: boolean
  apiLoading: boolean
  item: Item
  itemDetails: ItemDetail[]
  calendar: Calendar
  onEditItem: () => void
  onEditItemDetail: (itemDetailId: string) => void
  onSaveCalendar: (calendar: Calendar) => Promise<void>
}

dayjs.extend(advancedFormat)

export default defineComponent<Props>({
  components: {
    card,
  },
  props: {
    loading: { type: Boolean, default: false },
    apiLoading: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
    item: { type: Object, default: () => {} },
    itemDetails: { type: Array, default: () => [] },
    calendar: { type: Object, default: () => {} },
    onEditItem: { type: Function, default: () => {} },
    onEditItemDetail: { type: Function, default: () => {} },
    onSaveCalendar: { type: Function, default: () => {} },
  },
  setup(props) {
    const menu = ref<boolean>(false)
    const date = ref<string>(props.calendar.date)

    const kindData = KINDS[props.item?.kind] || {
      src: '',
      backgroundColor: '',
    }

    const bg = computed(() => {
      return {
        backgroundColor: kindData?.backgroundColor,
      }
    })

    const itemDate = dayjs(props.calendar.date).format('YYYY年MM月DD日')

    const onSaveCalendarData = () => {
      props.onSaveCalendar({
        ...props.calendar,
        date: dayjs(date.value).format('YYYY-MM-DDT00:00:00Z'),
      })
      menu.value = false
    }

    return {
      kindData,
      bg,
      dayjs,
      itemDate,
      menu,
      date,
      onSaveCalendarData,
    }
  },
})
</script>
