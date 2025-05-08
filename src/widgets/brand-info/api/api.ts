import axios from "axios";
import type {IBrandResponse} from "./dtos";
import {getBrandInfo} from "./adapters";
import type {IBrandInfo} from "@/shared/types/info";

export async function fetchBrand(): Promise<IBrandInfo> {
  const {data} = await axios.get<IBrandResponse>('/b1rands')

  return getBrandInfo(data)
}
