<script setup lang="ts">
import type { IOrder } from '@/shared/types/order'
import OrderProductCard from '@/page-modules/orders/components/OrderProductCard.vue'
import { toReadableNumber } from '@/shared/lib/toReadableNumber'

const props = defineProps<{
  data: IOrder | null
}>()
const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  (e: 'close'): void
}>()

const orderInfo = computed<{ label: string, value: string }[]>(() => {
  if (!props.data) {
    return []
  }

  return [
    {
      label: 'Имя заказчика',
      value: props.data.name,
    },
    {
      label: 'Телефон заказчика',
      value: props.data.number,
    },
    {
      label: 'Адрес',
      value: props.data.address,
    },
    {
      label: 'Комментарий к заказу',
      value: props.data.comment,
    },
    {
      label: 'Имя получателя',
      value: props.data.recipient?.name,
    },
    {
      label: 'Телефон получателя',
      value: props.data.recipient?.number,
    },
  ].filter(i => !!i.value)
})
</script>

<template>
  <ElDrawer
    v-model="open"
    size="500px"
    title="Детали заказа"
    @close="emit('close')"
  >
    <div
      v-if="data"
      class="order-info"
    >
      <div
        v-for="(item, ind) of orderInfo"
        :key="ind"
        class="row"
      >
        <div class="row__key">
          {{ item.label }}:
        </div>
        <div class="row__value">
          {{ item.value }}
        </div>
      </div>

      <hr style="margin: 20px 0;">

      <div class="products">
        <OrderProductCard
          v-for="pr of data.products"
          :key="pr.id"
          :data="pr"
          class="products__item"
        />
      </div>

      <h1 class="order-info__total">
        Итого: {{ toReadableNumber(data.total) }} ₽
      </h1>
    </div>
  </ElDrawer>
</template>

<style scoped lang="scss">
.order-info {
  height: 100%;
  display: flex;
  flex-direction: column;

  .row {
    margin-bottom: 24px;

    &__key {
      color: rgb(96, 98, 102);
      width: 50%;
      flex-shrink: 0;
      font-size: 13px;
    }

    &__value {
      margin-top: 4px;
      flex-shrink: 0;
      width: 50%;
      font-weight: 500;
    }
  }

  .products {
    &__item {
      margin-bottom: 12px;
    }
  }

  &__total {
    padding-top: 60px;
    margin-top: auto;
  }
}
</style>
