<script setup lang="ts">
import axios from 'axios'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'
import { toPrettyPhone } from '@/shared/utils/phoneNormalizer.ts'
import { toReadableNumber } from '@/shared/lib/toReadableNumber.ts'

interface ICustomer {
  name: string
  phone: string
  total: string
  ordersQuantity: number
}

const { data: tableData } = useQuery<ICustomer[]>({
  queryKey: ['customers-summary'],
  queryFn: async () => {
    interface Dto {
      customerPhone: string
      sum: number
      orders: number
    }

    const data = await axios.get<Dto[]>('/orders/customers-summary')
      .then(r => r.data)

    return data.map((item): ICustomer => ({
      name: '',
      phone: toPrettyPhone(item.customerPhone),
      total: `${toReadableNumber(item.sum)} ₽`,
      ordersQuantity: item.orders
    }))
  },
})

const tableHeaders = ref([
  { prop: 'name', label: 'Имя заказчика' },
  { prop: 'phone', label: 'Телефон заказчика' },
  { prop: 'total', label: 'Сумма заказа' },
  { prop: 'ordersQuantity', label: 'Количество заказов' },
])
</script>

<template>
  <div>
    <h1>База клиентов</h1>
    <ElTable
      border
      :data="tableData"
      style="margin-top: 32px;"
    >
      <ElTableColumn
        v-for="(item, index) of tableHeaders"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      />
    </ElTable>
  </div>
</template>

<style scoped lang="scss">
.page-customers {}
</style>
