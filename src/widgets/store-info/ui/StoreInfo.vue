<script setup lang="ts">
import StoreCard from "@/widgets/store-info/ui/StoreCard.vue";
import axios from "axios";
import type {IStore} from "@/shared/types/info";
import {fetchStores} from "@/widgets/store-info/api/api";
import {getBodyForServer} from "../api/adapters";
import ModalCreate from "@/widgets/store-info/ui/ModalCreate.vue";
import { onMounted, ref } from 'vue'

// DATA
const stores = ref<IStore[]>([])
const isModalCreateVisible = ref(false)

// METHODS
async function onCreateStore(event: IStore) {
  try {
    await axios.post('/shops', getBodyForServer(event))
    isModalCreateVisible.value = false
    await init()
  } catch (e) {
    console.log(e) // TODO
  }
}

async function onDeleteStore(id: number) {
  try {
    await axios.delete('/shops/' + id)
    stores.value = stores.value.filter(i => i.id !== id)
  } catch (e) {
    console.log(e) // TODO
  }
}

function onUpdateStore(event: IStore) {
  try {
    axios.patch('/shops/' + event.id, getBodyForServer(event))
  } catch (e) {
    console.log(e) // TODO
  }
}

async function init() {
  stores.value = await fetchStores()
}

onMounted(init)
</script>

<template>
  <StoreCard
    v-for="store of stores"
    :key="store.id"
    :store="store"
    style="margin-top: 20px;"
    @delete="onDeleteStore(store.id)"
    @save="onUpdateStore"
  />

  <div style="display: flex; justify-content:flex-end;">
    <ElButton
      type="success"
      style="margin-top: 24px;"
      @click="isModalCreateVisible = true"
    >
      Добавить магазин
    </ElButton>
  </div>

  <ModalCreate
    v-model="isModalCreateVisible"
    @create="onCreateStore"
  />
</template>

<style scoped lang="scss">

</style>
