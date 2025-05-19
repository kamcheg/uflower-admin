<script setup lang="ts">
import StoreCard from "./StoreCard.vue";

const emit = defineEmits<{
  (e: 'create'): void
}>()

const model = defineModel<boolean>({required: true})
</script>

<template>
  <ElDialog v-model="model" class="my-d">
    <StoreCard
      mode="create"
      @create="emit('create')"
    />
  </ElDialog>
</template>

<style lang="scss">
.my-d {
  padding: 0;

  .el-dialog__header {
    padding: 0;
  }
}
</style>
