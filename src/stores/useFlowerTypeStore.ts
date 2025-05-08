import { defineStore } from 'pinia'
import { useQuery } from '@tanstack/vue-query'
import type { IOption } from '@/shared/types/common.ts'
import axios from 'axios'

type TGetAllFlowerTypes = {
  id: number
  title: string
}[]

export const useFlowerTypeStore = defineStore('flower-types', () => {
  const {data} = useQuery<IOption[]>({
    queryKey: ['flower-types'],
    queryFn: async () => {
      const { data } = await axios.get<TGetAllFlowerTypes>('/flower-types')
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
