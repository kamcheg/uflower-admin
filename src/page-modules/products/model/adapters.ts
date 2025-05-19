import type { INewProduct, IProduct } from '@/shared/types/product.ts'

export function toCreateDto(event: INewProduct) {
  return {
    name: event.name,
    description: event.description,
    price: event.price,
    isActive: event.isActive,
    inStock: event.inStock,
    width: event.width,
    height: event.height,
    sizeId: event.size,
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
    inStock: event.inStock,
    width: event.width,
    height: event.height,
    sizeId: event.size,
    reasonIds: event.reasons,
    recipientIds: event.recipients,
    flowerTypeIds: event.flowerTypes,
    images: event.images,
  }
}
