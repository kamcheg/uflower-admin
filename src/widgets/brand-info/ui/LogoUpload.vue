<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import axios from "axios";
import { ref, useTemplateRef, watch } from 'vue'

const props = defineProps<{
  image: string | null
}>()

const fileInput = useTemplateRef('file-input')

// DATA
const imageUrl = ref<string | null>(null)
watch(() => props.image, (n) => {
  imageUrl.value = n
}, { immediate: true })

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

    const newLogo = await axios.post<{url: string}>('/upload-image', formData)
      .then(res => res.data.url)
    await axios.post('/brands/change-logo', {
      logo: newLogo
    })

    imageUrl.value = newLogo
  } catch {
    console.log('err')
  }
}

async function onRemove() {
  try {
    await axios.post('/brands/change-logo', {
      logo: ''
    })
    imageUrl.value = null
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div v-if="imageUrl">
    <ElDropdown placement="bottom-start">
      <img :src="imageUrl" alt="logo" class="logo-image">
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem @click="fileInput?.click()">
            Обновить лого
          </ElDropdownItem>
          <ElDropdownItem @click="onRemove">
            Удалить лого
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>

  <div
    v-else
    class="empty-upload"
    @click="fileInput?.click()"
  >
    <ElIcon><Plus /></ElIcon>
  </div>

  <input hidden ref="file-input" type="file" accept="image/*" @change="onUpload">
</template>

<style lang="scss" scoped>
.logo-image {
  max-height: 70px;
  max-width: 100px;
}

.empty-upload {
  width: 170px;
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
