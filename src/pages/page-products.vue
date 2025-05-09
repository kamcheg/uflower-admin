<script setup lang="ts">
import ProductCard from '@/page-modules/products/components/ProductCard.vue'
import type { IProduct } from '@/shared/types/product'
import ProductDetail from '@/page-modules/products/components/ProductDetail.vue'
import CreateProduct from '@/page-modules/products/components/CreateProduct.vue'
import { computed, ref, toRaw, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { getProducts } from '@/page-modules/products/model/api.ts'

// region DATA
const products = ref<IProduct[]>([])
const { data } = useQuery<IProduct[]>({
  queryKey: ['catalog-items'],
  queryFn: getProducts,
})
watch(data, (newData) => {
  if (newData) { products.value = toRaw(newData) }
})

const currentId = ref<null | number>(null)
// endregion

// region COMPUTED
const currentProduct = computed<IProduct | null>(() => {
  return products.value.find(i => i.id === currentId.value) || null
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
      :is-open="isOpenDrawer"
      :data="currentProduct!"
      @close="currentId = null"
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
