import type {TStoresResponse} from "@/widgets/store-info/api/dtos";
import axios from "axios";
import type {IStore} from "@/shared/types/info";

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
      coords: i.coords || []
    }
  })
}
