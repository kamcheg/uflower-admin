<script setup lang="ts">
import { toReadableNumber } from '@/shared/lib/toReadableNumber'
import type { IProduct } from '@/shared/types/product'

defineProps<{
  data: IProduct
}>()

const emit = defineEmits<{
  (e: 'open'): void
}>()
</script>

<template>
  <div class="product-card">
    <div class="image-place">
      <div class="image-place__inner">
        <img
          :src="data.images[data.mainImageIndex] || data.images[0]"
          alt=""
        >
      </div>
    </div>

    <div
      class="title"
      :title="data.name"
    >
      {{ data.name }}
    </div>

    <div class="price">
      {{ toReadableNumber(data.price) }} ₽
    </div>

    <ElButton
      style="width: 100%; margin-top: 16px;"
      @click="emit('open')"
    >
      Открыть
    </ElButton>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  .image-place {
    width: 100%;
    padding-bottom: 100%;
    position: relative;

    &__inner {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: 8px;
      height: 100%;
      width: 100%;

      img {
        display: block;
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
  }

  .title {
    margin-top: 16px;
    max-width: 100%;
    white-space: nowrap; /* Запрещает перенос текста */
    overflow: hidden; /* Скрывает лишний текст */
    text-overflow: ellipsis; /* Добавляет троеточие */
  }

  .price {
    font-size: 18px;
    font-weight: 600;
    margin-top: 16px;
  }

  .btns {
    margin-top: 16px;
    display: flex;

    &__item {
      flex-grow: 1;
    }
  }
}
</style>
