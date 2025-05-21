import axios from "axios";
import type {IBrandResponse} from "./dtos";
import {getBrandInfo} from "./adapters";
import type {IBrandInfo} from "@/shared/types/info";
import { getRawPhoneNumber } from '@/shared/utils/phoneNormalizer.ts'

export async function fetchBrand(): Promise<IBrandInfo> {
  const {data} = await axios.get<IBrandResponse>('/brands')

  return getBrandInfo(data)
}

export async function update(data: IBrandInfo) {
  await axios.patch('/brands', {
    name: data.name,
    email: data.email,
    sitePhone: getRawPhoneNumber(data.phone),
    schedule: {
      from: data.workTime.from,
      to: data.workTime.to,
      isAlwaysOpened: data.workTime.isAlwaysOpen,
    },
  })
}
