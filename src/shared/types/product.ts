export interface IProduct {
  id: number
  name: string
  description: string
  images: string[]
  mainImageIndex: number
  price: number
  size: number | null
  flowerTypes: number[]
  recipients: number[]
  reasons: number[]
  isActive: boolean
  inStock: boolean
  height: number
  width: number
  priority: number
  ingredients: {
    value: string,
    quantity: number
  }[]
}

export interface INewProduct extends Omit<IProduct, 'id' | 'price'> {
  price: '' | number
}

export interface IProductInOrder extends Pick<IProduct, 'id' | 'name' | 'description' | 'images' | 'price'> {
  quantity: number
}
