<template>
  <el-upload
    v-if="!disabled"
    v-model:file-list="fileList"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    :limit="4"
    :on-remove="handleRemove"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <div
    v-else
    class="gallery"
  >
    <div
      v-for="img of images"
      :key="img.id"
    >
      <img
        :src="img.url"
        alt=""
        style="display: block; width: 100%;"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'

interface IImage {
  id: number
  url: string
}

const props = withDefaults(defineProps<{
  disabled?: boolean
  images: IImage[]
}>(), {
  disabled: false,
})

const fileList = ref<UploadUserFile[]>(props.images.map(i => ({ ...i, name: '' })))

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
</script>

<style lang="scss" scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 6px;
}
</style>
