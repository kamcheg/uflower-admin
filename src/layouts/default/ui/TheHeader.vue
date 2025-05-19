<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import ModalChangePassword from '@/widgets/modal-change-password/ui/ModalChangePassword.vue'
import { ref } from 'vue'

const isChangePasswordModalVisible = ref(false)
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
      </div>
    </div>

    <div class="right">
      <ElDropdown placement="bottom-start">
        <ElButton circle>
          <ElIcon><UserFilled /></ElIcon>
        </ElButton>

        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem @click="isChangePasswordModalVisible = true">
              Сменить пароль
            </ElDropdownItem>
            <ElDropdownItem>Привязать телеграм</ElDropdownItem>
            <ElDropdownItem>Выйти</ElDropdownItem>
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
