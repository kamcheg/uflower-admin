<script setup lang="ts">
import MassUpload from '@/shared/components/MassUpload.vue'
import type { INewProduct, IProduct } from '@/shared/types/product'
import AnotherSelect from '@/shared/components/AnotherSelect.vue'
import { useSizeStore } from '@/stores/useSizeStore.ts'
import { useFlowerTypeStore } from '@/stores/useFlowerTypeStore.ts'

withDefaults(defineProps<{
  disabled?: boolean
}>(), {
  disabled: false,
})

const model = defineModel<IProduct | INewProduct>({ required: true })

const sizeStore = useSizeStore()
const flowerTypeStore = useFlowerTypeStore()
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
      label="Размер букета"
    >
      <ElSelect
        v-model="model.size"
        :disabled="disabled"
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
        :disabled="disabled"
        :options="flowerTypeStore.options"
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Получатели"
    >
      <AnotherSelect
        v-model="model.flowerTypes"
        :disabled="disabled"
        :options="[
          { value: 1, label: 'Отец' },
          { value: 2, label: 'Девушка' },
          { value: 3, label: 'Невеста' },
          { value: 4, label: 'Жена' },
          { value: 5, label: 'Дочь' },
          { value: 6, label: 'Бабушка' },
          { value: 7, label: 'Учитель' },
        ]"
      />
    </ElFormItem>

    <ElFormItem
      label-position="top"
      label="Повод"
    >
      <AnotherSelect
        v-model="model.flowerTypes"
        :disabled="disabled"
        :options="[
          { value: 1, label: 'Свадьба' },
          { value: 2, label: 'Свидание' },
          { value: 3, label: 'Извинение' },
          { value: 4, label: 'День рождения' },
          { value: 5, label: 'Рождение ребенка' },
          { value: 6, label: 'Годовщина' },
          { value: 17, label: 'Развод' },
        ]"
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
