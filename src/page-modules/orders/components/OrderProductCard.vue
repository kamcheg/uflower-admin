<script setup lang="ts">
import type { IProductInOrder } from '@/shared/types/product'
import { toReadableNumber } from '@/shared/lib/toReadableNumber'

defineProps<{
  data: IProductInOrder
}>()
</script>

<template>
  <div class="product">
    <div class="image-border">
      <img
        :src="data.images[0].url"
        alt=""
      >
    </div>

    <div class="product-info">
      <div class="product-info__item">
        <b>{{ data.name }}</b>
      </div>
      <div class="product-info__item">
        Цена за шт: <b>{{ toReadableNumber(data.price) }} ₽</b>
      </div>
      <div class="product-info__item">
        Количество: <b>{{ data.quantity }}</b>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product {
  display: flex;

  .image-border {
    flex-shrink: 0;
    width: 100px;
    height: 100px;

    img {
      display: block;
      width: 100%;
      border-radius: 8px;
    }
  }

  &-info {
    margin-left: 24px;

    &__item {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
