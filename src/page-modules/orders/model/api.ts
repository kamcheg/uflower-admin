import axios from 'axios'
import type { IOrderFromServer } from '@/page-modules/orders/model/dtos.ts'
import type { IOrder } from '@/shared/types/order.ts'
import { transformServerOrderToClient } from '@/page-modules/orders/model/adapters.ts'

export async function getAllOrders(): Promise<IOrder[]> {
  const {data} = await axios.get<IOrderFromServer[]>('/orders')
  return data.map(item => transformServerOrderToClient(item))
}
