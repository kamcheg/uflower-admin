<script setup lang="ts">
const model = defineModel<number[]>({required: true})

withDefaults(defineProps<{
  options?: {
    value: number
    label: string
  }[]
}>(), {
  options: () => []
})
</script>

<template>
  <el-select
    v-model="model"
    placeholder=""
    clearable
    multiple
  >
    <template #label="{ label }">
      <span>{{ label }}</span>
    </template>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<style scoped lang="scss">

</style>
