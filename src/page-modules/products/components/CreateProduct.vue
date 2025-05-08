<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import ProductForm from '@/page-modules/products/components/ProductForm.vue'
import type { INewProduct } from '@/shared/types/product'
import { ref } from 'vue'

// region DATA
const open = ref(false)
const data = ref<INewProduct>({
  name: '',
  description: '',
  images: [],
  price: '',
  size: null,
  flowerTypes: []
})
// endregion
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
