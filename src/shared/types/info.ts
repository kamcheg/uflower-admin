export interface IWorkTime {
  isAlwaysOpen: boolean
  from: string
  to: string
}

export interface IBrandInfo {
  id: number
  logo: string
  name: string
  phone: string
  email: string
  workTime: IWorkTime,
}

export interface IStore {
  id: number
  address: string
  phone: string
  workTime: IWorkTime
  coords: [number, number] | null
}
