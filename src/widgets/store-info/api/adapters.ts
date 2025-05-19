import type {IStore} from "@/shared/types/info";
import { getRawPhoneNumber } from '@/shared/utils/phoneNormalizer.ts'

export function getBodyForServer(data: IStore) {
  return {
    phone: getRawPhoneNumber(data.phone),
    address: data.address,
    schedule: {
      from: data.workTime.from,
      to: data.workTime.to,
      isAlwaysOpened: data.workTime.isAlwaysOpen
    },
    coords: [
      data.coords.lng,
      data.coords.lat,
    ]
  }
}
