<script setup lang="ts">
import ProductCard from '@/page-modules/products/components/ProductCard.vue'
import type { IProduct } from '@/shared/types/product'
import ProductDetail from '@/page-modules/products/components/ProductDetail.vue'
import CreateProduct from '@/page-modules/products/components/CreateProduct.vue'
import { computed, ref, toRaw, useTemplateRef, watch } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { updateProduct, deleteProduct, getProducts } from '@/page-modules/products/model/api.ts'
import { ElMessage } from 'element-plus'

// region DEFINED
const refProductDetail = useTemplateRef('refProductDetail')
// endregion DEFINED

const products = ref<IProduct[]>([])
const { data, refetch } = useQuery<IProduct[]>({
  queryKey: ['catalog-items'],
  queryFn: getProducts,
})
watch(data, (newData) => {
  if (newData) {
    products.value = toRaw(newData)
  }
})

const mutationDelete = useMutation({
  mutationFn: deleteProduct,
  onSuccess: async () => {
    await refetch()
    refProductDetail.value!.isVisibleDeleteModal = false
    currentId.value = null
    ElMessage.success('Товар удален!')
  },
})

const mutationSave = useMutation({
  mutationFn: updateProduct,
  onSuccess: async () => {
    await refetch()
    ElMessage.success('Данные о товаре обновлены!')
  }
})

const currentId = ref<null | number>(null)

// region COMPUTED
const currentProduct = computed<IProduct | null>(() => {
  return products.value.find((i) => i.id === currentId.value) || null
})

const isOpenDrawer = computed(() => {
  return currentId.value !== null
})
// endregion
</script>

<template>
  <div class="page-products">
    <CreateProduct />

    <ProductCard
      v-for="product of products"
      :key="product.id"
      :data="product"
      @open="currentId = product.id"
    />

    <ProductDetail
      :key="currentId || undefined"
      ref="refProductDetail"
      :is-open="isOpenDrawer"
      :data="currentProduct!"
      :isDeleteButtonLoading="mutationDelete.isPending.value"
      @close="currentId = null"
      @delete="mutationDelete.mutate(currentId!)"
      @save="mutationSave.mutate({id: currentId!, data: $event})"
    />
  </div>
</template>

<style scoped lang="scss">
.page-products {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 24px;
}
</style>
