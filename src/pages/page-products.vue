<script setup lang="ts">
import ProductCard from '@/page-modules/products/components/ProductCard.vue'
import type { IProduct } from '@/shared/types/product'
import ProductDetail from '@/page-modules/products/components/ProductDetail.vue'
import CreateProduct from '@/page-modules/products/components/CreateProduct.vue'
import axios from "axios";
import { computed, onMounted, ref } from 'vue'

// region DATA
const products = ref<IProduct[]>([
  {
    id: 46,
    name: 'Великая княжна',
    price: 20300,
    description: '',
    images: [
      {
        id: 348957,
        url: 'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/4c0/l5ft2a17cefn413vq1qwtpen62qx0w3d.jpeg&w=312&h=312',
      },
    ],
    flowerTypes: []
  },
  {
    id: 47,
    name: 'Микс гиацинтов с мимозой в коробке',
    price: 19200,
    description: '',
    images: [
      {
        id: 12341,
        url: 'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/356/26ptsypgbdce8qia72o004blfb0h09f9.jpg&w=312&h=312',
      },
    ],
    flowerTypes: []
  },
  {
    id: 48,
    name: 'Миром правит любовь',
    price: 8700,
    description: '',
    images: [
      {
        id: 358724,
        url: 'https://uflor.ru/api-v2/thumbnail/?src=/upload/iblock/92f/8yae0t8zo4c6lkfm78bg33xc7gfjz15u.jpeg&w=312&h=312',
      },
    ],
    flowerTypes: []
  },
])

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

onMounted(async () => {
  await axios.get('/flowers')
})
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
