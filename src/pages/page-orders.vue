<script setup lang="ts">
import 'dayjs/locale/zh-cn'
import type { IOrder } from '@/shared/types/order'
import OrderDetails from '@/page-modules/orders/components/OrderDetails.vue'
import { computed, ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getAllOrders } from '@/page-modules/orders/model/api.ts'

const tableHeaders = ref([
  { prop: 'id', label: 'ID', width: '80px' },
  { prop: 'name', label: 'Имя заказчика' },
  { prop: 'number', label: 'Телефон заказчика' },
  { prop: 'address', label: 'Адрес' },
])

const { data: tableData } = useQuery<IOrder[]>({
  queryKey: ['orders'],
  queryFn: getAllOrders,
})

const currentRowId = ref<null | number>(null)

const isOpenDrawer = computed(() => {
  return currentRowId.value !== null
})

const currentOrder = computed<IOrder | null>(() => {
  return tableData?.value?.find(i => i.id === currentRowId.value) || null
})

const shortcuts = [
  {
    text: 'Сегодня',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24)
      return [start, end]
    },
  },
  {
    text: 'Последняя неделя',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Последний месяц',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Последние 3 месяца',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
const value2 = ref(['', ''])
</script>

<template>
  <h1 v-if="!tableData?.length">
    У вас нет заказов!
  </h1>
  <div v-else>
    <el-date-picker
      v-model="value2"
      type="daterange"
      unlink-panels
      start-placeholder="С"
      end-placeholder="До"
      :shortcuts="shortcuts"
      style="margin-bottom: 24px;"
    />

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
