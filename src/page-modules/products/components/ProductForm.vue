<script setup lang="ts">
import MassUpload from '@/shared/components/MassUpload.vue'
import type { INewProduct, IProduct } from '@/shared/types/product'
import AnotherSelect from '@/shared/components/AnotherSelect.vue'
import { useSizeStore } from '@/stores/useSizeStore.ts'
import { useFlowerTypeStore } from '@/stores/useFlowerTypeStore.ts'
import { useRecipientStore } from '@/stores/useRecipientStore.ts'
import { useReasonStore } from '@/stores/useReasonStore.ts'
import { Delete } from '@element-plus/icons-vue'

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
      label="Короткое описание товара"
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
      label="Ширина/высота"
    >
      <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; grid-gap: 20px;">
        <ElInput
          v-model.number="model.width"
          placeholder="Ширина"
        />
        <ElInput
          v-model.number="model.height"
          placeholder="Высота"
        />
      </div>
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
        v-model:favorite="model.mainImageIndex"
      />
      <p style="font-size: 12px; line-height: 1; margin-top: 6px; color: #a1a1a1;">*
        ⭐ Главное фото — отображается в списке товаров.
      </p>
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Приоритет"
    >
      <ElInputNumber
        v-model.number="model.priority"
        :min="-100000"
        :max="100000"
        style="width: 100%"
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Состав"
    >
      <div
        v-for="(ingredient, index) of model.ingredients"
        :key="index"
        style="width: 100%; grid-gap: 10px; margin-bottom: 6px; display: flex;"
      >
        <ElInput v-model="ingredient.value" />
        <ElInput v-model.number="ingredient.quantity" />
        <ElButton
          v-if="model.ingredients.length > 1"
          :icon="Delete"
          circle
          type="danger"
          @click="model.ingredients = model.ingredients.filter((_, y) => index !== y)"
        />
      </div>
      <ElButton @click="model.ingredients.push({ value: '', quantity: 0 })">
        Добавить
      </ElButton>
    </ElFormItem>

    <ElCheckbox v-model="model.inStock">
      Букет уже собран
    </ElCheckbox>
  </div>
</template>

<style scoped lang="scss">

</style>
