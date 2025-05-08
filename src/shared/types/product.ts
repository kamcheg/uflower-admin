export interface IProduct {
  id: number
  name: string
  description: string
  images: {
    id: number
    url: string
  }[]
  price: number
  size: number | null
  flowerTypes: number[]
  recipients: number[]
  reasons: number[]
  isActive: boolean
}

export interface INewProduct extends Omit<IProduct, 'id' | 'price'> {
  price: '' | number
}

export interface IProductInOrder extends IProduct {
  quantity: number
}
