import axios from 'axios'
import type { INewProduct, IProduct } from '@/shared/types/product.ts'
import { toCreateDto } from '@/page-modules/products/model/adapters.ts'
import type { ProductFromServer } from '@/page-modules/products/model/dtos.ts'

export async function createProduct(event: INewProduct) {
  return await axios.post('/flowers', toCreateDto(event))
}

export async function getProducts(): Promise<IProduct[]> {
  const {data} = await axios.get<ProductFromServer[]>('/flowers')
  return data.map((p): IProduct => ({
    id: p.id,
    name: p.name,
    description: p.description,
    images: p.images,
    price: p.price,
    size: p.size.id,
    flowerTypes: p.flowerTypes.map(p => p.id),
    recipients: p.recipients.map(p => p.id),
    reasons: p.reasons.map(p => p.id),
    isActive: p.isActive
  }))
}

export async function deleteProduct(id: number) {
  await axios.delete('/flowers/' + id)
}
