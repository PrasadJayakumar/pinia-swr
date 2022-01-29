<script setup>
import { useDedup } from '@/store/useDedup.js'
import { onMounted } from 'vue';

const store = useDedup(),
  fetchData = store.fetchData;

onMounted(() => {
  console.log("Weather.onMounted is called...");
  fetchData(100);
})

const cities = [
  { id: 1001, name: 'San Ramon', temperature: 64 },
  { id: 1001, name: 'Livermore', temperature: 62 }]
</script>

<template>
  <div>
    <h2>All Cities</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature (°F)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="city in cities" :key="city.id">
          <td style="text-align: left">{{ city.name }}</td>
          <td style="text-align: left">{{ city.temperature }}°</td>
          <td style="text-align: left">
            <button type="button" class="btn btn-primary">Add</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>