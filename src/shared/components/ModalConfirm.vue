<script setup lang="ts">
import { watch } from 'vue'

const props = withDefaults(defineProps<{
  isYesButtonLoading?: boolean
}>(), {
  isYesButtonLoading: false
})

const emit = defineEmits<{
  (e: 'yes'): void
  (e: 'no'): void
}>()

const model = defineModel<boolean>({required: true})

function onYes() {
  emit('yes');
  if (props.isYesButtonLoading) {
    model.value = false
  }
}
function onNo() {
  emit('no');
  model.value = false
}

watch(() => props.isYesButtonLoading, (value) => {
  if (!value) {
    model.value = false
  }
})
</script>

<template>
  <ElDialog v-model="model" title="Вы уверены?" width="300">
    <div style="display: flex; justify-content:flex-end;">
      <ElButton type="danger" :loading="isYesButtonLoading" @click="onYes">
        Да
      </ElButton>
      <ElButton @click="onNo">
        Нет
      </ElButton>
    </div>
  </ElDialog>
</template>

<style scoped lang="scss">

</style>
