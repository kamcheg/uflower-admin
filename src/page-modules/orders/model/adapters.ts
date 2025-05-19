import type { IProductInOrder } from '@/shared/types/product.ts'
import type { IOrderFromServer } from '@/page-modules/orders/model/dtos.ts'
import { toPrettyPhone } from '@/shared/utils/phoneNormalizer.ts'

export function transformServerOrderToClient(item: IOrderFromServer) {
  return {
    id: item.id,
    name: item.customerName,
    number: toPrettyPhone(item.customerPhone),
    address: item.address,
    comment: item.comment,
    // TODO
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
      quantity: o.quantity,
      priority: 0,
      height: 0,
      width: 0,
      inStock: false,
    })),
    total: item.total,
    isMyOrder: item.isDeliverToCustomer,
    recipient: {
      name: item.recipientName,
      number: toPrettyPhone(item.recipientPhone)
    }
  }
}
