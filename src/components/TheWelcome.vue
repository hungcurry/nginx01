<script setup>
import { onMounted } from 'vue';
import  { useApiServer  } from "@/composables/useApiServer.js"
const { data , FetchInit } = useApiServer();
const { VITE_VARIABLES } = import.meta.env

onMounted( async() => {
  await FetchInit('/users')
  console.log(data.value) // 資料
})
</script>

<template>
  <div>
    <h2 class="text-center">Welcome to the VueDB</h2>

    <p v-if="data" class="red text-center">API資料:{{ data[0]?.name }} / {{ data[0]?.age }}</p>
    <p v-else class="text-center">尚無資料</p>

    <p class="text-center"> 環境變數: {{ VITE_VARIABLES }}</p>
    <p>dev 02</p>
  </div>
</template>

<style>
.text-center{
  text-align: center;
}
.red{
  color: red;
}
</style>
