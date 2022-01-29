<script setup>
import { useWeather } from '@/store/weather/useWeather.js'
import { onMounted } from 'vue';

const store = useWeather(),
  fetchWeatherData = store.fetchWeatherData;

onMounted(() => {
  console.log("WatchList.onMounted is called...");
  fetchWeatherData();
})
</script>

<template>
  <div>
    <h2>Watch List</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature (°C)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="city in store.cities" :key="city.id">
          <td style="text-align: left">{{ city.name }}</td>
          <td style="text-align: left">{{ city.temperature }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>