<script setup lang="ts">
// ДЛЯ КОРРЕКТНОЙ РАБОТЫ КОМПОНЕНТА НУЖНО УКАЗАТЬ :KEY
import type { IProduct } from '@/shared/types/product'
import ProductForm from '@/page-modules/products/components/ProductForm.vue'
import { ref, toRaw } from 'vue'

const props = defineProps<{
  isOpen: boolean
  data: IProduct | null
  isDeleteButtonLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'save', ev: IProduct): void
  (e: 'delete'): void
  (e: 'close'): void
}>()

// region DATA
const isVisibleDeleteModal = ref(false)
const localData = ref<IProduct>(
  JSON.parse(JSON.stringify(toRaw(props.data))), // TODO data can be null
)
// endregion

// region METHODS
function onDeleteProduct() {
  emit('delete')
}

function onSave() {
  emit('save', localData.value)
}
// endregion

defineExpose({
  isVisibleDeleteModal
})
</script>

<template>
  <ElDrawer
    :model-value="isOpen"
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
            @click="onSave"
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
          :loading="isDeleteButtonLoading"
          @click="onDeleteProduct"
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
