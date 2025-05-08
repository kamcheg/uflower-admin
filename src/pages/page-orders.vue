<script setup lang="ts">
import type { IOrder } from '@/shared/types/order'
import OrderDetails from '@/page-modules/orders/components/OrderDetails.vue'

// region DATA
const tableHeaders = ref([
  { prop: 'id', label: 'ID', width: '80px' },
  { prop: 'name', label: 'Имя заказчика' },
  { prop: 'number', label: 'Телефон заказчика' },
  { prop: '', label: 'Статус' },
])

// statuses
// Не обработан
// Отложен
// Отменен
// Доставлен
// Возврат

const tableData = ref<IOrder[]>([
  {
    id: 1,
    name: 'Иван Иванов',
    number: '+7 900 123-45-67',
    address: 'Москва, ул. Ленина, д. 10',
    isMyOrder: true,
    recipient: null,
    comment: 'Позвонить за 30 минут до доставки',
    products: [
      {
        id: 46,
        name: 'Великая княжна',
        price: 20300,
        description: '',
        images: [
          {
            id: 348957,
            url: 'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/4c0/l5ft2a17cefn413vq1qwtpen62qx0w3d.jpeg&w=312&h=312',
          },
        ],
        quantity: 3,
      },
      {
        id: 47,
        name: 'Микс гиацинтов с мимозой в коробке',
        price: 19200,
        description: '',
        images: [
          {
            id: 12341,
            url: 'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/356/26ptsypgbdce8qia72o004blfb0h09f9.jpg&w=312&h=312',
          },
        ],
        quantity: 2,
      },
    ],
    total: 20360,
  },
  {
    id: 2,
    name: 'Петр Петров',
    number: '+7 900 765-43-21',
    address: 'Санкт-Петербург, Невский проспект, д. 20',
    isMyOrder: false,
    recipient: {
      name: 'Ольга Смирнова',
      number: '+7 901 234-56-78',
    },
    comment: '',
    products: [],
    total: 20360,
  },
  {
    id: 3,
    name: 'Мария Соколова',
    number: '+7 902 345-67-89',
    address: 'Казань, ул. Баумана, д. 5',
    isMyOrder: true,
    recipient: null,
    products: [],
    total: 20360,
  },
  {
    id: 4,
    name: 'Алексей Кузнецов',
    number: '+7 903 456-78-90',
    address: 'Екатеринбург, ул. Мира, д. 15',
    isMyOrder: false,
    recipient: {
      name: 'Дмитрий Фёдоров',
      number: '+7 904 567-89-01',
    },
    products: [],
    total: 20360,
  },
  {
    id: 5,
    name: 'Анна Морозова',
    number: '+7 905 678-90-12',
    address: 'Новосибирск, Красный проспект, д. 25',
    isMyOrder: true,
    recipient: null,
    comment: 'Оставить на ресепшене',
    products: [],
    total: 20360,
  },
  {
    id: 6,
    name: 'Денис Волков',
    number: '+7 906 789-01-23',
    address: 'Самара, ул. Молодогвардейская, д. 30',
    isMyOrder: false,
    recipient: {
      name: 'Ирина Лебедева',
      number: '+7 907 890-12-34',
    },
    products: [],
    total: 20360,
  },
  {
    id: 7,
    name: 'Екатерина Никитина',
    number: '+7 908 901-23-45',
    address: 'Ростов-на-Дону, проспект Ворошиловский, д. 40',
    isMyOrder: true,
    recipient: null,
    products: [],
    total: 20360,
  },
  {
    id: 8,
    name: 'Максим Белоусов',
    number: '+7 909 012-34-56',
    address: 'Уфа, проспект Октября, д. 50',
    isMyOrder: false,
    recipient: {
      name: 'Светлана Орлова',
      number: '+7 910 123-45-67',
    },
    products: [],
    total: 20360,
  },
  {
    id: 9,
    name: 'Алена Сергеева',
    number: '+7 911 234-56-78',
    address: 'Волгоград, ул. Советская, д. 60',
    isMyOrder: true,
    recipient: null,
    comment: '',
    products: [],
    total: 20360,
  },
  {
    id: 10,
    name: 'Никита Захаров',
    number: '+7 912 345-67-89',
    address: 'Пермь, ул. Ленина, д. 70',
    isMyOrder: false,
    recipient: {
      name: 'Татьяна Крылова',
      number: '+7 913 456-78-90',
    },
    products: [],
    total: 20360,
  },
])

const currentRowId = ref<null | number>(null)
// endregion

// region COMPUTED
const isOpenDrawer = computed(() => {
  return currentRowId.value !== null
})

const currentOrder = computed<IOrder | null>(() => {
  return tableData.value.find(i => i.id === currentRowId.value) || null
})
// endregion

// region METHODS
function onShowMore(e: IOrder) {
  currentRowId.value = e.id
}
// endregion
</script>

<template>
  <h1 v-if="!tableData.length">
    У вас нет заказов!
  </h1>
  <div v-else>
    <el-table
      border
      :data="tableData"
    >
      <el-table-column
        prop="more"
        label=""
        width="120"
      >
        <template #default="scope">
          <ElButton
            link
            type="primary"
            @click="onShowMore(scope.row)"
          >
            Подробнее
          </ElButton>
        </template>
      </el-table-column>

      <el-table-column
        v-for="(item, index) of tableHeaders"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || undefined"
      />
    </el-table>

    <OrderDetails
      v-model:open="isOpenDrawer"
      :data="currentOrder"
      @close="() => currentRowId = null"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
