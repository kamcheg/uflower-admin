<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const state = ref('')

const querySearchAsync = async (query: string, cb: (arg: any) => void) => {
  const token = "58c32a9a6700723589530251df0175b4cb16a540"; // TODO env

  try {
    const res = await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', { query: query }, {
      headers: {
        Authorization: "Token " + token
      }
    })
    console.log('res', res.data)
  } catch (e) {
    console.log(e)
  }


  setTimeout(() => {
    cb([{ value: 'kama' }])
  }, 3000)
}

function handleSelect(item: any) {
  console.log(item)
}
</script>

<template>
  <ElAutocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="Please input"
    @select="handleSelect"
  >
    <!--        <template #default="{ item }">-->
    <!--          <div class="value">{{ item.value }}</div>-->
    <!--          <span class="link">{{ item.link }}</span>-->
    <!--        </template>-->

    <template #loading>
      Loading...
    </template>
  </ElAutocomplete>
</template>

<style scoped lang="scss">

</style>
