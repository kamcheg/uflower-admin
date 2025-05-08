<script setup lang="ts">
</script>

<template>
  <div class="header">
    <div class="left">
      <RouterLink
        to="/"
        class="logo-place"
      >
        Left
      </RouterLink>
    </div>

    <div class="center">
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
          v-if="false"
          href="/filters"
          class="nav__item"
        >
          Фильтры
        </ElLink>
      </div>
    </div>

    <div class="right">
      <ElLink
        href="/profile"
        class="nav__item"
      >
        Профиль
      </ElLink>
    </div>
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

  .center {
    .nav {
      margin-left: 120px;

      &__item {
        font-weight: 500;

        &:not(:first-child) {
          margin-left: 40px;
        }
      }
    }
  }

  .left {
    .logo-place {
      display: block;
      font-size: 30px;
      font-weight: 700;
    }
  }

  .right {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
}
</style>
