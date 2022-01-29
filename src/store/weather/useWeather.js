import { defineStore } from 'pinia';

import { queryWeatherData } from './weather.api.js';

const state = () => ({
  cities: [],
  watchList: []
});

const actions = {
  async fetchWeatherData(forceRefresh = false) {
    try {
      await this.commit(forceRefresh, queryWeatherData, {}, 'cities');
    } catch (error) {
      console.error('Caught the error: ', error);
    }
  }
};

export const useWeather = defineStore('weather', {
  state,
  actions,
  cache: {
    ttl: 10000,
    maxEntries: 5
  }
});
