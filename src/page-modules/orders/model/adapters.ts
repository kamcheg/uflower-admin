import type { IMyOrder, IOrderBase, IRecipientOrder } from '@/shared/types/order.ts'
import type { IProductInOrder } from '@/shared/types/product.ts'
import type { IOrderFromServer } from '@/page-modules/orders/model/dtos.ts'

export function transformServerOrderToClient(item: IOrderFromServer) {
  const baseOrder: IOrderBase = {
    id: item.id,
    name: item.customerName,
    number: item.customerPhone,
    address: item.address,
    comment: item.comment,
    products: item.orderFlowers.map((o): IProductInOrder => ({
      id: o.flower.id,
      name: o.flower.name,
      description: o.flower.description,
      images: o.flower.images,
      price: 1000, // TODO
      size: null, // TODO
      flowerTypes: [],
      recipients: [],
      reasons: [],
      isActive: o.flower.isActive,
      quantity: o.quantity
    })),
    total: 10000000, // TODO
  }

  if (item.isDeliverToCustomer) {
    const result: IMyOrder = {
      ...baseOrder,
      isMyOrder: true,
      recipient: null
    }

    return result
  } else {
    const result: IRecipientOrder = {
      ...baseOrder,
      isMyOrder: false,
      recipient: {
        name: item.recipientName,
        number: item.recipientPhone
      }
    }

    return result
  }
}
