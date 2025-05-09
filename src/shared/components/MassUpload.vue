<script lang="ts" setup>
import MyUpload from '@/shared/components/MyUpload.vue'
import { FullScreen, Delete } from '@element-plus/icons-vue'

const model = defineModel<string[]>()

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
      v-for="image of model"
      :key="image"
      class="image-wrapper gallery__item"
    >
      <img :src="image" alt="Photo">
      <div class="overlay">
        <div class="buttons">
          <ElButton :icon="FullScreen" circle />
          <ElButton
            :icon="Delete"
            circle
            @click="onDelete(image)"
          />
        </div>
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

    img {
      display: block;
      object-fit: cover;
      height: 100%;
      width: 100%;
      border-radius: 12px;
    }

    .overlay {
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: .2s;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, .5);
      border-radius: 12px;

      .buttons {
        color: #fff;
      }
    }
  }
}
</style>
