<script setup lang="ts">
import StoreCard from "./StoreCard.vue";
import type {IStore} from "@/shared/types/info";

withDefaults(defineProps<{
  isButtonLoading?: boolean
}>(), {
  isButtonLoading: false
})

const emit = defineEmits<{
  (e: 'create', event: IStore): void
}>()

const model = defineModel<boolean>({required: true})
</script>

<template>
  <ElDialog v-model="model" class="my-d">
    <StoreCard
      mode="create"
      :isSaveButtonLoading="isButtonLoading"
      @save="emit('create', $event)"
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
