<script setup>
import { onMounted, ref } from 'vue';

import Weather from './Weather.vue';
import WatchList from './WatchList.vue';

import { useDedup } from '@/store/useDedup.js'


const store = useDedup(),
  fetchData = store.fetchData;

const key = ref(Date.now());

const getLatest = () => {
  fetchData(100);
  key.value = Date.now();
}

onMounted(() => {
  console.log("Dashboard.onMounted is called...");
  fetchData(100);
}) 
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-1">
        <button type="button" class="btn btn-success" @click="getLatest">Get Latest</button>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-8">
        <Weather :key="key"></Weather>
      </div>
      <div class="col-sm-4">
        <WatchList :key="key"></WatchList>
      </div>
    </div>
  </div>
</template>