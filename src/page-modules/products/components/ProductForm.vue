<script setup lang="ts">
import MassUpload from '@/shared/components/MassUpload.vue'
import type { INewProduct, IProduct } from '@/shared/types/product'

withDefaults(defineProps<{
  disabled?: boolean
}>(), {
  disabled: false,
})

const model = defineModel<IProduct | INewProduct>({ required: true })
</script>

<template>
  <div class="pr-drawer__content">
    <ElFormItem
      label-position="top"
      label="Наименование товара"
    >
      <ElInput
        v-model="model.name"
        :disabled="disabled"
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Описание товара"
    >
      <ElInput
        v-model="model.description"
        :disabled="disabled"
        type="textarea"
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Цена"
    >
      <ElInput
        v-model.number="model.price"
        type="number"
        :disabled="disabled"
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Статус"
    >
      <el-radio-group
        model-value="1"
        :disabled="disabled"
      >
        <el-radio-button
          label="Активен"
          value="1"
        />
        <el-radio-button
          label="В архиве"
          value="2"
        />
      </el-radio-group>
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Фото"
    >
      <MassUpload
        :disabled="disabled"
        :images="model.images"
      />
    </ElFormItem>
  </div>
</template>

<style scoped lang="scss">

</style>
