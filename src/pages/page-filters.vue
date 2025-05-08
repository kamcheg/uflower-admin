<script setup lang="ts">
import FilterSimple from "@/page-modules/filters/ui/FilterSimple.vue";
</script>

<template>
  <div class="page-filters">
    <FilterSimple
      class="page-filters__item"
    />
  </div>
</template>

<style scoped lang="scss">
.page-filters {
  &__item {
    &:not(:first-child) {
      margin-top: 40px;
    }
  }
}
</style>
