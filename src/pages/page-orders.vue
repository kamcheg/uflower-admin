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

const tableData = ref<IOrder[]>([])
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
