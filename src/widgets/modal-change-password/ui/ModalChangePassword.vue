<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useMutation } from '@tanstack/vue-query'

const open = defineModel({required: true})

const oldPassword = ref('')
const newPassword = ref('')

const changePasswordMutation = useMutation({
  mutationFn: async () => {
    return axios.post('/auth/change-password', {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    })
  },
  onSuccess: () => {
    ElMessage.success('Пароль изменен!')
    open.value = false
  },
  onError: () => {
    ElMessage.error('Произошла ошибка!')
  }
})
</script>

<template>
  <ElDialog v-model="open">
    <ElForm>
      <ElFormItem
        label-position="top"
        label="Старый пароль"
      >
        <ElInput
          v-model="oldPassword"
          type="password"
        />
      </ElFormItem>

      <ElFormItem
        label-position="top"
        label="Новый пароль"
      >
        <ElInput
          v-model="newPassword"
          type="password"
        />
      </ElFormItem>

      <div style="display: flex; justify-content:center;">
        <ElButton
          type="primary"
          style="width: 200px;"
          :loading="changePasswordMutation.isPending.value"
          @click="changePasswordMutation.mutate()"
        >
          Сменить
        </ElButton>
      </div>
    </ElForm>
  </ElDialog>
</template>

<style scoped lang="scss">

</style>
