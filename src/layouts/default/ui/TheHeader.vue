<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import ModalChangePassword from '@/widgets/modal-change-password/ui/ModalChangePassword.vue'
import { ref } from 'vue'
import axios from 'axios'

const isChangePasswordModalVisible = ref(false)

function onLogout() {
  localStorage.removeItem('token')
  location.href = '/login'
}

async function onTelegram() {
  try {
    const { data: token } = await axios.post('/users/generate-telegram-token')
    const url = 'https://t.me/uflowertest_bot?start=' + token
    window.open(url, '_blank') // откроется в новой вкладке или окне
  } catch {
    console.log('err')
  }
}
</script>

<template>
  <div class="header">
    <div class="menu">
      <div class="nav">
        <ElLink
          href="/"
          class="nav__item"
        >
          О компании
        </ElLink>

        <ElLink
          href="/products"
          class="nav__item"
        >
          Товары
        </ElLink>

        <ElLink
          href="/orders"
          class="nav__item"
        >
          Заказы
        </ElLink>

        <ElLink
          href="/todo"
          class="nav__item"
        >
          База клиентов
        </ElLink>
      </div>
    </div>

    <div class="right">
      <ElDropdown placement="bottom-start">
        <ElButton size="large" circle>
          <ElIcon><UserFilled /></ElIcon>
        </ElButton>

        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem @click="isChangePasswordModalVisible = true">
              Сменить пароль
            </ElDropdownItem>

            <ElDropdownItem @click="onTelegram">
              Привязать телеграм
            </ElDropdownItem>

            <ElDropdownItem @click="onLogout">
              Выйти
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>

    <ModalChangePassword v-model="isChangePasswordModalVisible" />
  </div>
</template>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid #eee;
  background: #fff;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .menu {
    .nav {
      &__item {
        font-weight: 500;

        &:not(:first-child) {
          margin-left: 40px;
        }
      }
    }
  }

  .right {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
}
</style>
