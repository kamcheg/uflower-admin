import type { IProductInOrder } from '@/shared/types/product.ts'
import type { IOrderFromServer } from '@/page-modules/orders/model/dtos.ts'
import { toPrettyPhone } from '@/shared/utils/phoneNormalizer.ts'
import type { IOrder } from '@/shared/types/order.ts'
import moment from '@/shared/utils/moment'

export function transformServerOrderToClient(item: IOrderFromServer): IOrder {
  return {
    id: item.id,
    name: item.customerName,
    number: toPrettyPhone(item.customerPhone),
    address: item.address,
    comment: item.comment,
    createdAt: moment(item.createdAt).format('llll'),
    products: (item.orderFlowers || []).map((o): IProductInOrder => ({
      id: o.flower?.id,
      name: o.flower?.name,
      description: o.flower?.description,
      images: o.flower?.images,
      price: o.flower?.price,
      quantity: o.quantity,
    })),
    total: item.total,
    isMyOrder: item.isDeliverToCustomer,
    recipient: {
      name: item.recipientName,
      number: toPrettyPhone(item.recipientPhone)
    }
  }
}
