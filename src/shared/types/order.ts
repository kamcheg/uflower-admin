import type { IProductInOrder } from '@/shared/types/product'

interface IOrderBase {
  id: number
  name: string
  number: string
  address: string
  comment?: string
  products: IProductInOrder[]
  total: number
}

interface IMyOrder extends IOrderBase {
  isMyOrder: true
  recipient: null
}

interface IRecipientOrder extends IOrderBase {
  isMyOrder: false
  recipient: {
    name: string
    number: string
  }
}

export type IOrder = IMyOrder | IRecipientOrder
