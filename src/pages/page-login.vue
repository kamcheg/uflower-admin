<script setup lang="ts">
import axios from "axios";
import { ref } from 'vue'
import { getRawPhoneNumber, phoneMask } from '@/shared/utils/phoneNormalizer.ts'
import { vMaska } from "maska/vue"

const form = ref({
  phone: '',
  password: ''
})

async function onSubmit() {
  try {
    const token = await axios.post('/auth/login', {
      phone: getRawPhoneNumber(form.value.phone),
      password: form.value.password
    }).then(r => r.data.access_token)

    localStorage.setItem('token', token)
    window.location.href = '/'
  } catch (e) {
    console.log(e) // TODO
  }
}
</script>

<template>
  <div class="page-login">
    <ElCard class="card">
      <p class="card__title">Вход</p>
      <ElInput
        v-model="form.phone"
        v-maska="phoneMask"
        style="margin-bottom: 12px;"
        placeholder="Номер телефона"
      />
      <ElInput
        v-model="form.password"
        style="margin-bottom: 12px;"
        placeholder="Пароль"
        type="password"
      />
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
