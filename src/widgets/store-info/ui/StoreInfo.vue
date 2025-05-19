<script setup lang="ts">
import StoreCard from '@/widgets/store-info/ui/StoreCard.vue'
import type { IStore } from '@/shared/types/info'
import { fetchStores } from '@/widgets/store-info/api/api'
import ModalCreate from '@/widgets/store-info/ui/ModalCreate.vue'
import { ref, toRaw, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'

// DATA
const isModalCreateVisible = ref(false)

const stores = ref<IStore[]>([])
const { data, isPending, isError, refetch } = useQuery<IStore[]>({
  queryKey: ['stores'],
  queryFn: fetchStores,
})
watch(data, (newData) => {
  if (newData) { stores.value = toRaw(newData) }
})
</script>

<template>
  <h1 v-if="isPending">Загрузка...</h1>
  <h1 v-else-if="isError">Не удалось загрузить список магазинов!</h1>
  <template v-else>
    <StoreCard
      v-for="store of stores"
      :key="store.id"
      :store="store"
      style="margin-top: 20px"
      @refetch="refetch"
    />

    <div style="display: flex; justify-content: flex-end">
      <ElButton type="success" style="margin-top: 24px" @click="isModalCreateVisible = true">
        Добавить магазин
      </ElButton>
    </div>

    <ModalCreate
      v-model="isModalCreateVisible"
      @create="async () => {
        await refetch()
        isModalCreateVisible = false
      }"
    />
  </template>
</template>

<style scoped lang="scss"></style>
