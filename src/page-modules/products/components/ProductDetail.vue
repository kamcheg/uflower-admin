<script setup lang="ts">
import type { IProduct } from '@/shared/types/product'
import ProductForm from '@/page-modules/products/components/ProductForm.vue'
import { ref, toRaw } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteProduct, updateProduct } from '@/page-modules/products/model/api.ts'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  data: IProduct // TODO null
}>()

const emit = defineEmits<{
  (name: 'close'): void
}>()

const queryClient = useQueryClient()

// region DATA
const isVisibleDeleteModal = ref(false)
const localData = ref<IProduct>(
  JSON.parse(JSON.stringify(toRaw(props.data)))
)
// endregion

const mutationDelete = useMutation({
  mutationFn: deleteProduct,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['catalog-items'] })
    isVisibleDeleteModal.value = false
    ElMessage.success('Товар удален!')
    emit('close')
  },
})

const mutationSave = useMutation({
  mutationFn: updateProduct,
  onSuccess: async () => {
    ElMessage.success('Данные о товаре обновлены!')
    emit('close')
    await queryClient.invalidateQueries({ queryKey: ['catalog-items'] })
  }
})
</script>

<template>
  <ElDrawer
    :model-value="true"
    size="500px"
    :title="data?.name || ''"
    @close="emit('close')"
  >
    <div
      v-if="localData"
      class="pr-drawer"
    >
      <ProductForm
        v-model="localData"
      />

      <div class="pr-drawer__footer">
        <div>
          <ElButton
            type="danger"
            style="width: 100%;"
            @click="isVisibleDeleteModal = true"
          >
            Удалить
          </ElButton>
        </div>

        <div>
          <ElButton
            type="success"
            style="width: 100%; margin-top: 10px;"
            :loading="mutationSave.isPending.value"
            @click="mutationSave.mutate({ id: localData.id, data: localData })"
          >
            Сохранить
          </ElButton>
        </div>
      </div>
    </div>

    <ElDialog
      v-model="isVisibleDeleteModal"
      title="Вы действительно хотите удалить товар?"
      width="350px"
    >
      <div style="display: flex; justify-content:flex-end;">
        <ElButton
          type="danger"
          :loading="mutationDelete.isPending.value"
          @click="mutationDelete.mutate(localData.id)"
        >
          Да
        </ElButton>
        <ElButton @click="isVisibleDeleteModal = false">
          Нет
        </ElButton>
      </div>
    </ElDialog>
  </ElDrawer>
</template>

<style scoped lang="scss">
.pr-drawer {
  height: 100%; display: flex;
  flex-direction: column;

  &__content {
    flex-grow: 1;
    overflow: auto;
  }
  &__footer {
    padding-top: 40px;
    margin-top: auto
  }
}
</style>
