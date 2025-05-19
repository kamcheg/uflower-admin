export type ProductFromServer = {
  "id": number
  "priority": number
  "name": string
  "description": string
  "price": number
  "isActive": boolean
  "inStock": boolean
  "width": number
  "height": number
  "images": string[]
  "size": {
    "id": number
    "title": string
    "image": string
  }
  "reasons": {
    "id": number
    "title": string
  }[]
  "recipients": {
    "id": number
    "title": string
  }[]
  "flowerTypes": {
    "id": number
    "title": string
  }[]
}

// export interface updateDto {
//   name: string
//   description: string
//   price: number
//   isActive: boolean
//   width: number
//   height: number
//   sizeId: number
//   reasonIds: number[]
//   recipientIds: number[]
//   flowerTypeIds: number[]
//   images: string[]
// }
