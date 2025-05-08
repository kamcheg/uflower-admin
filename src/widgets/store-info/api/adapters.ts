import type {IStore} from "@/shared/types/info";

export function getBodyForServer(data: IStore) {
  return {
    phone: data.phone,
    address: data.address,
    schedule: {
      from: data.workTime.from,
      to: data.workTime.to,
      isAlwaysOpened: data.workTime.isAlwaysOpen
    },
    coords: data.coords || [0, 0] // TODO
  }
}
