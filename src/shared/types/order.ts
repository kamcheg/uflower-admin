import type { IProductInOrder } from '@/shared/types/product'

export interface IOrder {
  id: number
  name: string
  number: string
  address: string
  comment?: string
  createdAt: string
  products: IProductInOrder[]
  total: number
  isMyOrder: boolean
  recipient: {
    name: string | null
    number: string | null
  }
}
