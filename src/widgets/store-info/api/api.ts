import type {TStoresResponse} from "@/widgets/store-info/api/dtos";
import axios from "axios";
import type {IStore} from "@/shared/types/info";
import { getBodyForServer } from '@/widgets/store-info/api/adapters.ts'

export async function fetchStores(): Promise<IStore[]> {
  const { data } = await axios.get<TStoresResponse>('/shops')

  return data.map((i): IStore => {
    return {
      id: i.id,
      address: i.address,
      phone: i.phone,
      workTime: {
        from: i.schedule.from,
        to: i.schedule.to,
        isAlwaysOpen: i.schedule.isAlwaysOpened
      },
      coords: {
        lat: i.coords[1],
        lng: i.coords[0],
      }
    }
  })
}

export async function createStore(event: IStore) {
  await axios.post('/shops', getBodyForServer(event))
}

export async function deleteStore(id: number) {
  await axios.delete('/shops/' + id)
}

export async function updateStore(event: IStore) {
  await axios.patch('/shops/' + event.id, getBodyForServer(event))
}
