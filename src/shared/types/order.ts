import type { IProductInOrder } from '@/shared/types/product'

export interface IOrderBase {
  id: number
  name: string
  number: string
  address: string
  comment?: string
  products: IProductInOrder[]
  total: number
}

export interface IMyOrder extends IOrderBase {
  isMyOrder: true
  recipient: null
}

export interface IRecipientOrder extends IOrderBase {
  isMyOrder: false
  recipient: {
    name: string
    number: string
  }
}

export type IOrder = IMyOrder | IRecipientOrder
