import type { INewProduct, IProduct } from '@/shared/types/product.ts'

export function toCreateDto(event: INewProduct) {
  return {
    name: event.name,
    description: event.description,
    price: event.price,
    isActive: event.isActive,
    width: 60, // TODO
    height: 110, // TODO
    sizeId: event.size, //
    reasonIds: event.reasons,
    recipientIds: event.recipients,
    flowerTypeIds: event.flowerTypes,
    images: event.images,
  }
}

export function toUpdateDto(event: IProduct) {
  return {
    name: event.name,
    description: event.description,
    price: event.price,
    isActive: event.isActive,
    width: 60, // TODO
    height: 110, // TODO
    sizeId: event.size,
    reasonIds: event.reasons,
    recipientIds: event.recipients,
    flowerTypeIds: event.flowerTypes,
    images: event.images,
  }
}
