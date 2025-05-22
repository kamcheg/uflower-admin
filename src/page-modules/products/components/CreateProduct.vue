<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import ProductForm from '@/page-modules/products/components/ProductForm.vue'
import type { INewProduct } from '@/shared/types/product'
import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createProduct } from '@/page-modules/products/model/api.ts'
import { ElMessage } from 'element-plus'

const queryClient = useQueryClient()

const initialData: INewProduct = {
  name: '',
  description: '',
  images: [],
  price: '',
  size: null,
  flowerTypes: [],
  recipients: [],
  reasons: [],
  isActive: true,
  inStock: false,
  width: 0,
  height: 0,
  priority: 0,
  ingredients: []
}

// region DATA
const open = ref(false)
const data = ref<INewProduct>(JSON.parse(JSON.stringify(initialData)))
// endregion

const createMutation = useMutation({
  mutationFn: createProduct,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['catalog-items'] })
    ElMessage.success('Карточка товара создана!')
    data.value = JSON.parse(JSON.stringify(initialData))
    open.value = false
  }
})
</script>

<template>
  <div
    class="create-product"
    @click="open = true"
  >
    <ElIcon
      class="create-product__add"
    >
      <Plus />
    </ElIcon>
  </div>

  <ElDrawer
    v-model="open"
    size="500px"
    title="Новый продукт"
  >
    <div class="pr-drawer">
      <ProductForm
        v-model="data"
      />

      <div class="pr-drawer__footer">
        <div>
          <ElButton
            type="success"
            style="width: 100%;"
            :loading="createMutation.isPending.value"
            @click="() => createMutation.mutate(data)"
          >
            Создать
          </ElButton>
        </div>
      </div>
    </div>
  </ElDrawer>
</template>

<style scoped lang="scss">
.create-product {
  color: #cccccc;
  border-radius: 12px;
  border: 1px dashed #cccccc;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .2s;

  &:hover {
    color: darkseagreen;
    border-color: darkseagreen;
  }

  &__add {
    font-size:50px;
  }
}

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
