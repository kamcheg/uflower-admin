<script setup lang="ts">
import type { IOrder } from '@/shared/types/order'
import OrderDetails from '@/page-modules/orders/components/OrderDetails.vue'
import { computed, ref, toRaw, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getAllOrders } from '@/page-modules/orders/model/api.ts'

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
        size: 1,
        flowerTypes: [],
        reasons: [],
        recipients: [],
        isActive: true,
        images: ['https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/4c0/l5ft2a17cefn413vq1qwtpen62qx0w3d.jpeg&w=312&h=312'],
        quantity: 3,
      },
      {
        id: 47,
        name: 'Микс гиацинтов с мимозой в коробке',
        price: 19200,
        description: '',
        size: 1,
        flowerTypes: [],
        reasons: [],
        recipients: [],
        isActive: true,
        images: ['https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/356/26ptsypgbdce8qia72o004blfb0h09f9.jpg&w=312&h=312'],
        quantity: 2,
      },
    ],
    total: 20360,
  },
])
const { data } = useQuery<IOrder[]>({
  queryKey: ['orders'],
  queryFn: getAllOrders,
})
watch(data, (newData) => {
  if (newData) {
    tableData.value = toRaw(newData)
  }
})

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
            @click="currentRowId = scope.row.id"
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
