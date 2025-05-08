<script setup lang="ts">
import {BrandInfo} from "@/widgets/brand-info";
import {StoreInfo} from "@/widgets/store-info";
</script>

<template>
  <div class="page-info">
    <div class="page-info__container">
      <BrandInfo />

      <StoreInfo />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-info {
  &__container {
    max-width: 700px;
    margin: 0 auto;
  }
}
</style>
