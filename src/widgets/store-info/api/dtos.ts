export type TStoresResponse = {
  "id": number
  "phone": string
  "address": string
  "schedule": {
    "from": string
    "to": string
    "isAlwaysOpened": boolean
  }
  "coords": [number, number]
}[]
