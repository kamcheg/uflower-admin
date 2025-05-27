<script lang="ts" setup>
import MyUpload from '@/shared/components/MyUpload.vue'
import { Star, Delete, StarFilled } from '@element-plus/icons-vue'

const modelFavorite = defineModel<number>('favorite', { required: true })
const model = defineModel<string[]>({required: true})

function onDelete(image: string) {
  model.value = model.value.filter(i => i !== image)
}
</script>

<template>
  <div class="gallery">
    <MyUpload
      class="gallery__item"
      @on-upload="model.unshift($event)"
    />

    <div
      v-for="(image, index) of model"
      :key="image"
      class="image-wrapper gallery__item"
    >
      <img :src="image" alt="Photo">
      <div class="image-wrapper__buttons">
        <ElButton
          circle
          @click="modelFavorite = index"
        >
          <ElIcon size="18px">
            <StarFilled
              v-if="modelFavorite === index"
              style="color: darkorange;"
            />
            <Star v-else />
          </ElIcon>
        </ElButton>

        <ElButton
          :icon="Delete"
          circle
          @click="onDelete(image)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gallery {
  display: flex;
  grid-gap: 4px;
  flex-wrap: wrap;

  &__item {
    width: 150px;
    height: 150px;
  }

  .image-wrapper {
    position: relative;

    &:hover .overlay{
      opacity: 1;
    }

    &__buttons {
      position: absolute;
      top: 8px;
      right: 8px;
    }

    img {
      display: block;
      object-fit: cover;
      height: 100%;
      width: 100%;
      border-radius: 12px;
    }
  }
}
</style>
