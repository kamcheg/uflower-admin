<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
  axios.get('/orders/customers-summary')
})
</script>

<template>
  <div></div>
</template>

<style scoped lang="scss">

</style>
