<script setup>
import { onMounted, ref } from 'vue';

import Weather from './Weather.vue';
import WatchList from './WatchList.vue';

import { useWeather } from '@/store/weather/useWeather.js'


const store = useWeather(),
  fetchWeatherData = store.fetchWeatherData;

const key = ref(Date.now());

const getLatest = () => {
  fetchWeatherData();
  key.value = Date.now();
}

onMounted(() => {
  console.log("Dashboard.onMounted is called...");
  fetchWeatherData();
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