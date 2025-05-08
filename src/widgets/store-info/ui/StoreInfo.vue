<script setup lang="ts">
import StoreCard from '@/widgets/store-info/ui/StoreCard.vue'
import type { IStore } from '@/shared/types/info'
import { createStore, deleteStore, fetchStores, updateStore } from '@/widgets/store-info/api/api'
import ModalCreate from '@/widgets/store-info/ui/ModalCreate.vue'
import { ref, toRaw, watch } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { ElMessage } from 'element-plus'

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

const mutationCreateStore = useMutation({
  mutationFn: createStore,
  onSuccess: async () => {
    await refetch()
    isModalCreateVisible.value = false
  },
  onError: () => {
    ElMessage.error('Произошла ошибка! Не удалось сохранить магазин!')
  }
})

const mutationUpdateStore = useMutation({
  mutationFn: updateStore,
  onSuccess: () => refetch(),
  onError: () => {
    ElMessage.error('Произошла ошибка! Не удалось обновить данные!')
  }
})

const mutationDeleteStore = useMutation({
  mutationFn: deleteStore,
  onSuccess: () => refetch(),
  onError: () => {
    ElMessage.error('Произошла ошибка! Не удалось удалить магазин!')
  }
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
      :isSaveButtonLoading="mutationUpdateStore.isPending.value"
      :isDeleteButtonLoading="mutationDeleteStore.isPending.value"
      @delete="mutationDeleteStore.mutate(store.id)"
      @save="mutationUpdateStore.mutate($event)"
    />

    <div style="display: flex; justify-content: flex-end">
      <ElButton type="success" style="margin-top: 24px" @click="isModalCreateVisible = true">
        Добавить магазин
      </ElButton>
    </div>

    <ModalCreate
      v-model="isModalCreateVisible"
      :is-button-loading="mutationCreateStore.isPending.value"
      @create="mutationCreateStore.mutate($event)"
    />
  </template>
</template>

<style scoped lang="scss"></style>
