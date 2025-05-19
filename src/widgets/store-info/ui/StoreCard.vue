<script setup lang="ts">
import AppSchedule from '@/shared/components/AppSchedule.vue'
import { Delete } from '@element-plus/icons-vue'
import type { IStore } from '@/shared/types/info'
import ModalConfirm from '@/shared/components/ModalConfirm.vue'
import { ref } from 'vue'
import { vMaska } from 'maska/vue'
import { phoneMask } from '@/shared/utils/phoneNormalizer.ts'
import { useMutation } from '@tanstack/vue-query'
import { createStore, deleteStore, updateStore } from '@/widgets/store-info/api/api.ts'
import { ElMessage } from 'element-plus'
import AddressAutocomplete from '@/shared/components/AddressAutocomplete.vue'

const props = withDefaults(
  defineProps<{
    store?: IStore
    mode?: 'update' | 'create'
  }>(),
  {
    store: (): IStore => ({
      id: 0,
      address: '',
      phone: '',
      workTime: {
        from: '',
        to: '',
        isAlwaysOpen: false,
      },
      coords: {
        lat: null,
        lng: null
      },
    }),
    mode: 'update',
    isSaveButtonLoading: false,
    isDeleteButtonLoading: false,
  },
)

const emit = defineEmits<{
  (e: 'refetch'): void
  (e: 'create'): void
}>()

// DATA
const formData = ref<IStore>(props.store)
const isOpenModalDelete = ref(false)

// METHODS
function onUpdate() {
  mutationUpdateStore.mutate(formData.value)
}

function onCreate() {
  mutationCreateStore.mutate(formData.value)
}

function onDelete() {
  mutationDeleteStore.mutate(props.store.id)
}

const mutationUpdateStore = useMutation({
  mutationFn: updateStore,
  onSuccess: async () => {
    ElMessage.success('Данные обновлены!')
    emit('refetch')
  },
  onError: () => {
    ElMessage.error('Произошла ошибка! Не удалось обновить данные!')
  },
})

const mutationDeleteStore = useMutation({
  mutationFn: deleteStore,
  onSuccess: async () => {
    ElMessage.success('Магазин удален!')
    emit('refetch')
  },
  onError: () => {
    ElMessage.error('Произошла ошибка! Не удалось удалить магазин!')
  },
})

const mutationCreateStore = useMutation({
  mutationFn: createStore,
  onSuccess: async () => {
    ElMessage.success('Магазин создан!')
    emit('create')
  },
  onError: () => {
    ElMessage.error('Произошла ошибка! Не удалось сохранить магазин!')
  },
})

</script>

<template>
  <el-card class="card">
    <template v-if="mode === 'update'" #header>
      <div class="card-header">
        <p>Магазин: {{ formData.address }}</p>
      </div>
    </template>

    <div>
      <AddressAutocomplete />

      <ElFormItem label-position="top" label="Адрес магазина">
        <ElInput v-model="formData.address" />
      </ElFormItem>

      <ElFormItem label-position="top" label="Номер телефона магазина">
        <ElInput v-model="formData.phone" v-maska="phoneMask" />
      </ElFormItem>

      <AppSchedule
        v-model:is-always-open="formData.workTime.isAlwaysOpen"
        v-model:from="formData.workTime.from"
        v-model:to="formData.workTime.to"
        title="График работы магазина"
        style="margin-bottom: 0"
      />
    </div>

    <template #footer>
      <div class="footer">
        <ElButton
          v-if="mode === 'create'"
          type="primary"
          :loading="mutationCreateStore.isPending.value"
          @click="onCreate"
        >
          Сохранить
        </ElButton>

        <ElButton
          v-if="mode === 'update'"
          type="primary"
          :loading="mutationUpdateStore.isPending.value"
          @click="onUpdate"
        >
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
      :is-yes-button-loading="mutationDeleteStore.isPending.value"
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
