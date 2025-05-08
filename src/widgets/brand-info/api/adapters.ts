import type {IBrandResponse} from "./dtos";
import type {IBrandInfo} from "@/shared/types/info";

export function getBrandInfo(data: IBrandResponse): IBrandInfo {
  return {
    id: data.id,
    logo: data.logo,
    name: data.name,
    phone: data.sitePhone,
    email: data.email,
    workTime: {
      from: data.schedule.from,
      to: data.schedule.to,
      isAlwaysOpen: data.schedule.isAlwaysOpened
    },
  }
}
