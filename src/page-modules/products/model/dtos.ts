export type ProductFromServer = {
  "id": number
  "name": string
  "description": string
  "price": number
  "isActive": boolean
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
