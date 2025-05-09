<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { useTemplateRef } from 'vue'
import axios from 'axios'

const fileInput = useTemplateRef('file-input')

const emit = defineEmits<{
  (e: 'onUpload', url: string): void
}>()

// METHODS
async function onUpload(event: Event) {
  const target = event.target as HTMLInputElement

  const files = target.files;
  if (!files || files.length === 0) return;

  const file = files[0];

  // // Проверка веса изображения
  // const file = files[0];
  // const maxSizeMB = 2;
  // const maxSizeBytes = maxSizeMB * 1024 * 1024; // 2 МБ в байтах
  //
  // // Проверка размера
  // if (file.size > maxSizeBytes) {
  //   error.value = `Файл слишком большой (максимум ${maxSizeMB} МБ)`;
  //   target.value = ""; // Сброс выбора файла
  //   return;
  // }

  try {
    const formData = new FormData()
    formData.append('file', file)

    const url = await axios.post<{url: string}>('/upload-image', formData)
      .then(res => res.data.url)

    emit('onUpload', url)
  } catch {
    console.log('err')
  }
}
</script>

<template>
  <div
    class="upload"
    @click="fileInput?.click()"
  >
    <ElIcon><Plus /></ElIcon>
    <input hidden ref="file-input" type="file" accept="image/*" @change="onUpload">
  </div>
</template>

<style scoped lang="scss">
.upload {
  height: 90px;
  border-radius: 8px;
  border: 1px dashed #d9d9d9;
  color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  transition: .2s;
  cursor: pointer;

  &:hover {
    border-color: #348fbf;
    color: #348fbf;
  }
}
</style>
