<script setup lang="ts">
import {Delete, EditPen} from "@element-plus/icons-vue";
import {useUpdate} from "@/page-modules/filters/model/useUpdate";
import {useCreate} from "@/page-modules/filters/model/useCreate";
import type {IFilterItem} from "@/page-modules/filters/model/types";

// region HOOKS
const {
  isModalVisible: isUpdateModalVisible,
  value: updateValue,
  onOpenModal: onOpenUpdateModal
} = useUpdate()

const {
  isModalVisible: isCreateModalVisible,
  value: createValue,
  onOpenModal: onOpenCreateModal
} = useCreate()
// endregion HOOKS

// region DATA
const filters = ref<IFilterItem[]>([{ id: 1, name: 'Розы'}])
// endregion DATA

// region METHODS
function onDelete(e: IFilterItem) {
  console.log('delete', e.id)
}
function onCreate() {
  console.log('create', createValue.value)
}

function onUpdate() {
  console.log('update', updateValue.value)
}
// endregion METHODS
</script>

<template>
  <div class="filter">
    <h1 class="filter__title">Фильтр: Цветы</h1>

    <div class="filter__list">
      <div v-for="filter of filters" :key="filter.id" class="filter-item">
        <span class="filter-item__name">{{filter.name}}</span>

        <el-button
          type="primary"
          :icon="EditPen"
          size="small"
          circle
          @click="onOpenUpdateModal(filter)"
        />

        <el-button
          type="danger"
          :icon="Delete"
          size="small"
          circle
          @click="onDelete(filter)"
        />
      </div>
    </div>

    <ElButton @click="onOpenCreateModal">
      Добавить
    </ElButton>

    <ElDialog
      v-model="isUpdateModalVisible"
      width="370px"
      title="Изменить"
    >
      <ElInput v-model="updateValue.name" />
      <ElButton
        style="width: 100%; margin-top: 12px;"
        type="primary"
        @click="onUpdate"
      >
        Изменить
      </ElButton>
    </ElDialog>

    <ElDialog
      v-model="isCreateModalVisible"
      width="370px"
      title="Создать"
    >
      <ElInput v-model="createValue" />
      <ElButton
        style="width: 100%; margin-top: 12px;"
        type="primary"
        @click="onCreate"
      >
        Создать
      </ElButton>
    </ElDialog>
  </div>
</template>

<style scoped lang="scss">
.filter {
  &__list {
    margin: 32px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .filter-item {
    flex: 0 1 auto; /* ширина по содержимому */
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 8px 20px;

    &__name {
      margin-right: 20px;
    }
  }
}
</style>
