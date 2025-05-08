<script setup lang="ts">
import AppSchedule from "@/shared/components/AppSchedule.vue";
import {fetchBrand} from "../api/api";
import type {IBrandInfo} from "@/shared/types/info";
import axios from "axios";
import LogoUpload from "@/widgets/brand-info/ui/LogoUpload.vue";
import { onMounted, ref } from 'vue'

const formData = ref<IBrandInfo | null>(null)

onMounted(async () => {
  try {
    formData.value = await fetchBrand()
  } catch (e) {
    console.log(e) // TODO
  }
})

function onUpdate() {
  if (!formData.value) { return }

  try {
    axios.patch('/brands', {
      name: formData.value.name,
      email: formData.value.email,
      sitePhone: formData.value.phone,
      schedule: {
        from: formData.value.workTime.from,
        to: formData.value.workTime.to,
        isAlwaysOpened: formData.value.workTime.isAlwaysOpen,
      },
    })
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <el-card v-if="formData" class="card">
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
        <img
          hidden
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgoTrixXnwZ_-w8TTKIo8lFJIcJ000QFqhUQ&s"
          alt=""
        >
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
        <ElInput v-model="formData.phone" />
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
          @click="onUpdate"
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
