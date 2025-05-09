<script setup lang="ts">
import MassUpload from '@/shared/components/MassUpload.vue'
import type { INewProduct, IProduct } from '@/shared/types/product'
import AnotherSelect from '@/shared/components/AnotherSelect.vue'
import { useSizeStore } from '@/stores/useSizeStore.ts'
import { useFlowerTypeStore } from '@/stores/useFlowerTypeStore.ts'
import { useRecipientStore } from '@/stores/useRecipientStore.ts'
import { useReasonStore } from '@/stores/useReasonStore.ts'

const model = defineModel<IProduct | INewProduct>({ required: true })

const sizeStore = useSizeStore()
const flowerTypeStore = useFlowerTypeStore()
const recipientStore = useRecipientStore()
const reasonStore = useReasonStore()
</script>

<template>
  <div class="pr-drawer__content">
    <ElFormItem
      label-position="top"
      label="Наименование товара"
    >
      <ElInput
        v-model="model.name"
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Описание товара"
    >
      <ElInput
        v-model="model.description"
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
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Размер букета"
    >
      <ElSelect
        v-model="model.size"
        placeholder=""
        clearable
      >
        <el-option
          v-for="item in sizeStore.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Состав букета"
    >
      <AnotherSelect
        v-model="model.flowerTypes"
        :options="flowerTypeStore.options"
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Получатели"
    >
      <AnotherSelect
        v-model="model.recipients"
        :options="recipientStore.options"
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Повод"
    >
      <AnotherSelect
        v-model="model.reasons"
        :options="reasonStore.options"
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Статус"
    >
      <el-radio-group
        v-model="model.isActive"
      >
        <el-radio-button
          label="Активен"
          :value="true"
        />
        <el-radio-button
          label="В архиве"
          :value="false"
        />
      </el-radio-group>
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Фото"
    >
      <MassUpload
        v-model="model.images"
      />
    </ElFormItem>
  </div>
</template>

<style scoped lang="scss">

</style>
