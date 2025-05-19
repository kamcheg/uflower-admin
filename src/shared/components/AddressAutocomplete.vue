<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

interface IDtoItem {
  value: string
  data: {
    geo_lat: string
    geo_lon: string
  }
}

interface IItem {
  value: string
  coords: {
    lat: number | null
    lng: number | null
  }
}

const emit = defineEmits<{
  (name: 'select', event: IItem): void
}>()

const query = ref('')

const querySearchAsync = async (query: string, cb: (arg: IItem[]) => void) => {
  const token = "58c32a9a6700723589530251df0175b4cb16a540"; // TODO env

  try {
    const res = await axios.post<{suggestions: IDtoItem[]}>('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', { query: query }, {
      headers: {
        Authorization: "Token " + token
      }
    })

    const suggestions = res.data.suggestions || []

    const items = suggestions.map((item): IItem => ({
      value: item.value,
      coords: {
        lat: +item.data.geo_lat || null,
        lng: +item.data.geo_lon || null
      }
    }))
    cb(items)
  } catch (e) {
    console.log(e)
  }
}

function handleSelect(item: IItem) {
  emit('select', item)
}

function onInput() {
  emit('select', {
    value: query,
    coords: {
      lat: null,
      lng: null,
    }
  })
}
</script>

<template>
  <ElAutocomplete
    v-model="query"
    :fetch-suggestions="querySearchAsync"
    @select="handleSelect"
    @input="onInput"
  >
    <template #loading>
      Loading...
    </template>
  </ElAutocomplete>
</template>

<style scoped lang="scss">

</style>
