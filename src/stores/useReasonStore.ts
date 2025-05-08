import { defineStore } from 'pinia'
import type { IOption } from '@/shared/types/common.ts'
import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

type TGetAllDto = {
  id: number
  title: string
}[]

export const useReasonStore = defineStore('reason', () => {
  const {data} = useQuery<IOption[]>({
    queryKey: ['reasons'],
    queryFn: async () => {
      const { data } = await axios.get<TGetAllDto>('/reasons')
      return data.map(d => ({
        value: d.id,
        label: d.title
      }))
    }
  })

  return {
    options: data
  }
})
