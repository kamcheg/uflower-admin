<script setup lang="ts">
const emit = defineEmits<{
  (e: 'yes'): void
  (e: 'no'): void
}>()

const model = defineModel<boolean>({required: true})

function onYes() {
  emit('yes');
  model.value = false
}
function onNo() {
  emit('no');
  model.value = false
}
</script>

<template>
  <ElDialog v-model="model" title="Вы уверены?" width="300">
    <div style="display: flex; justify-content:flex-end;">
      <ElButton type="danger" @click="onYes">
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
