<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query'
import AppSchedule from "@/shared/components/AppSchedule.vue";
import { fetchBrand, update } from '../api/api'
import type { IBrandInfo } from '@/shared/types/info'
import LogoUpload from "@/widgets/brand-info/ui/LogoUpload.vue";
import { ref, toRaw, watch } from 'vue'
import { vMaska } from "maska/vue"
import { phoneMask } from '@/shared/utils/phoneNormalizer.ts'

const formData = ref<IBrandInfo>({
  id: 0,
  logo: '',
  name: '',
  phone: '',
  email: '',
  workTime: {
    from: '',
    to: '',
    isAlwaysOpen: false
  }
})
const { data, isPending, isError, refetch } = useQuery<IBrandInfo>({
  queryKey: ['brand-data'],
  queryFn: fetchBrand,
})
watch(data, (newData) => {
  if (newData) { formData.value = toRaw(newData) }
})

const mutation = useMutation({
  mutationFn: update,
  onSuccess: () => refetch()
})
</script>

<template>
  <h1 v-if="isError">Произошла ошибка! Не удалось загрузить данные!</h1>
  <el-card v-else v-loading="isPending" class="card">
    <template #header>
      <div class="card-header">
        <p>Общая информация</p>
      </div>
    </template>

    <div class="card-content">
      <ElFormItem
        label-position="top"
        label="Логотип"
      >
        <LogoUpload :image="formData.logo" />
      </ElFormItem>

      <ElFormItem
        label-position="top"
        label="Название бренда"
      >
        <ElInput v-model="formData.name" />
      </ElFormItem>

      <ElFormItem
        label-position="top"
        label="Номер телефона"
      >
        <ElInput v-model="formData.phone" v-maska="phoneMask" />
      </ElFormItem>

      <ElFormItem
        label-position="top"
        label="Email"
      >
        <ElInput v-model="formData.email" />
      </ElFormItem>

      <AppSchedule
        v-model:is-always-open="formData.workTime.isAlwaysOpen"
        v-model:from="formData.workTime.from"
        v-model:to="formData.workTime.to"
        title="График работы сайта"
        style="margin-bottom: 0;"
      />
    </div>

    <template #footer>
      <div style="display: flex; justify-content: flex-end;">
        <ElButton
          type="primary"
          @click="mutation.mutate(formData)"
        >
          Сохранить
        </ElButton>
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
.card {
  &-header {
    p {
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
