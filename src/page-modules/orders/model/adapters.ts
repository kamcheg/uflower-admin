import type { IProductInOrder } from '@/shared/types/product.ts'
import type { IOrderFromServer } from '@/page-modules/orders/model/dtos.ts'

export function transformServerOrderToClient(item: IOrderFromServer) {
  return {
    id: item.id,
    name: item.customerName,
    number: item.customerPhone,
    address: item.address,
    comment: item.comment,
    products: (item.orderFlowers || []).map((o): IProductInOrder => ({
      id: o.flower?.id,
      name: o.flower?.name,
      description: o.flower?.description,
      images: o.flower?.images,
      price: o.flower.price,
      size: null, // TODO
      flowerTypes: [], // TODO
      recipients: [], // TODO
      reasons: [], // TODO
      isActive: o.flower?.isActive,
      quantity: o.quantity
    })),
    total: item.total, // TODO
    isMyOrder: item.isDeliverToCustomer,
    recipient: {
      name: item.recipientName,
      number: item.recipientPhone
    }
  }
}
