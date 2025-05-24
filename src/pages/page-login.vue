<script setup lang="ts">
import axios from 'axios'
import { computed, ref } from 'vue'
import { getRawPhoneNumber, phoneMask } from '@/shared/utils/phoneNormalizer.ts'
import { vMaska } from "maska/vue"
import { ElMessage } from 'element-plus'
import { useVuelidate } from '@vuelidate/core'
import { helpers, minLength, required } from '@vuelidate/validators'
import { validationErrors } from '@/shared/lib/validate/errors.ts'
import { phoneValidator } from '@/shared/lib/validate/validators.ts'

const form = ref({
  phone: '',
  password: ''
})

/* VUELIDATE */
const v$ = useVuelidate(computed(() => {
  return {
    phone: {
      required: helpers.withMessage(validationErrors.required, required),
      correctPhone: helpers.withMessage(validationErrors.phone, phoneValidator)
    },
    password: {
      required: helpers.withMessage(validationErrors.required, required),
      minLength: helpers.withMessage(validationErrors.minLength(8), minLength(8))
    }
  }
}), form)

async function onSubmit() {
  v$.value.$touch()
  if (v$.value.$invalid) { return }

  try {
    const token = await axios.post('/auth/login', {
      phone: getRawPhoneNumber(form.value.phone),
      password: form.value.password
    }).then(r => r.data.access_token)

    localStorage.setItem('token', token)
    window.location.href = '/'
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.status === 401) {
      ElMessage.error(err.response?.data?.message || 'Неизвестная ошибка!')
    } else {
      ElMessage.error('Неизвестная ошибка!')
    }
  }
}
</script>

<template>
  <div class="page-login">
    <ElCard class="card">
      <p class="card__title">Вход</p>
      <ElFormItem
        :error="v$.phone.$errors.length ? String(v$.phone.$errors[0].$message) : undefined"
      >
        <ElInput
          v-model="form.phone"
          v-maska="phoneMask"
          placeholder="Номер телефона"
        />
      </ElFormItem>

      <ElFormItem
        :error="v$.password.$errors.length ? String(v$.password.$errors[0].$message) : undefined"
      >
        <ElInput
          v-model="form.password"
          placeholder="Пароль"
          type="password"
        />
      </ElFormItem>

      <div class="card__btn-wrapper">
        <ElButton
          type="primary"
          class="card__btn"
          @click="onSubmit"
        >
          Войти
        </ElButton>
      </div>
    </ElCard>
  </div>
</template>

<style scoped lang="scss">
.page-login {
  padding: 20px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    width: 100%;
    max-width: 500px;

    &__title {
      font-size: 28px;
      text-align: center;
      margin-bottom: 14px;
      font-weight: 500;
    }

    &__btn-wrapper {
      display: flex;
      justify-content: center;
    }

    &__btn {
      width: 100%;
      max-width: 200px;
    }
  }
}
</style>
