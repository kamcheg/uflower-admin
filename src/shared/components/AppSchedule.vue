<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'График работы',
})

const from = defineModel<string>('from', {
  required: true,
})

const to = defineModel<string>('to', {
  required: true,
})

const isAlwaysOpen = defineModel<boolean>('isAlwaysOpen', {
  required: true,
})
</script>

<template>
  <ElFormItem
    label-position="top"
    :label="title"
  >
    <div
      v-if="!isAlwaysOpen"
      style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 20px; width: 100%;"
    >
      <el-time-select
        v-model="from"
        :max-time="to"
        class="mr-4"
        placeholder="Начало"
        start="00:00"
        step="00:30"
        end="24:00"
      />

      <el-time-select
        v-model="to"
        :min-time="from"
        placeholder="Конец"
        start="00:00"
        step="00:30"
        end="24:00"
      />
    </div>

    <ElCheckbox v-model="isAlwaysOpen">
      Круглосуточно
    </ElCheckbox>
  </ElFormItem>
</template>

<style scoped lang="scss">

</style>
