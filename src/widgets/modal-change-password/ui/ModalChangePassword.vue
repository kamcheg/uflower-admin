<script setup lang="ts">
import { ref } from 'vue'

const open = defineModel({required: true})

const oldPassword = ref('')
const newPassword = ref('')
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
        >
          Сменить
        </ElButton>
      </div>
    </ElForm>
  </ElDialog>
</template>

<style scoped lang="scss">

</style>
