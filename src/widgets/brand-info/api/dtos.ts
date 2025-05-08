export interface IBrandResponse {
  "id": number
  "name": string
  "slug": string
  "email": string
  "schedule": {
    "from": string
    "to": string
    "isAlwaysOpened": boolean
  },
  "sitePhone": string
  "logo": string
}
