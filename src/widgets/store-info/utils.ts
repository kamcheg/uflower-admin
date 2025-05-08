import type {IStore} from "@/shared/types/info";

export function generateStoreData(): IStore {
  return {
    address: '',
    phone: '',
    workTime: {
      isAlwaysOpen: false,
      from: '',
      to: '',
    },
    coords: null,
  }
}
