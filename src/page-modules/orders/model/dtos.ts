export interface IOrderFromServer {
  "id": number
  "createdAt": string
  "updatedAt": string
  "customerName": string
  "customerPhone": string
  "address": string
  "isDeliverToCustomer": boolean
  "recipientName": string
  "recipientPhone": string
  "comment": string
  "orderFlowers": {
    "id": number
    "createdAt": string
    "updatedAt": string
    "price": string
    "quantity": number
    "flower": {
      "id": number
      "createdAt": string
      "updatedAt": string
      "name": string
      "description": string
      "price": number
      "isActive": boolean
      "width": number
      "height": number
      "images": string[]
    }
  }[]
}
