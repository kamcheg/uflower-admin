<script setup lang="ts">
import AppSchedule from '@/shared/components/AppSchedule.vue'
import {Delete} from "@element-plus/icons-vue";
import type {IStore} from "@/shared/types/info";
import ModalConfirm from "@/shared/components/ModalConfirm.vue";
import { ref } from 'vue'
import { vMaska } from "maska/vue"
import { phoneMask } from '@/shared/utils/phoneNormalizer.ts'

const props = withDefaults(defineProps<{
  store?: IStore
  mode?: 'update' | 'create'
  isSaveButtonLoading?: boolean
  isDeleteButtonLoading?: boolean
}>(), {
  store: () => ({
    id: 0,
    address: '',
    phone: '',
    workTime: {
      from: '',
      to: '',
      isAlwaysOpen: false,
    },
    coords: null
  }),
  mode: 'update',
  isSaveButtonLoading: false,
  isDeleteButtonLoading: false
})

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'save', event: IStore): void
}>()

// DATA
const formData = ref<IStore>(props.store)
const isOpenModalDelete = ref(false)

// METHODS
function onSave() {
  emit('save', formData.value)
}

function onDelete() {
  emit('delete')
}
</script>

<template>
  <el-card class="card">
    <template v-if="mode === 'update'" #header>
      <div class="card-header">
        <p>Магазин: {{ formData.address }}</p>
      </div>
    </template>

    <div>
      <ElFormItem
        label-position="top"
        label="Адрес магазина"
      >
        <ElInput v-model="formData.address" />
      </ElFormItem>

      <ElFormItem
        label-position="top"
        label="Номер телефона магазина"
      >
        <ElInput v-model="formData.phone" v-maska="phoneMask" />
      </ElFormItem>

      <AppSchedule
        v-model:is-always-open="formData.workTime.isAlwaysOpen"
        v-model:from="formData.workTime.from"
        v-model:to="formData.workTime.to"
        title="График работы магазина"
        style="margin-bottom: 0;"
      />
    </div>

    <template #footer>
      <div class="footer">
        <ElButton type="primary" :loading="isSaveButtonLoading" @click="onSave">
          Сохранить
        </ElButton>

        <ElButton
          v-if="mode === 'update'"
          type="danger"
          :icon="Delete"
          @click="isOpenModalDelete = true"
        />
      </div>
    </template>

    <ModalConfirm
      v-model="isOpenModalDelete"
      :is-yes-button-loading="isDeleteButtonLoading"
      @yes="onDelete"
    />
  </el-card>
</template>

<style scoped lang="scss">
.card {
  &-header {
    p {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .view {
    &__item {
      &:not(:first-child) {
        margin-top: 12px;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
