import { defineStore } from 'pinia';

let counter = 0;
const apiClientCall = () => {
  counter++;
  console.log(`Called the server: ${counter}`);
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        reject({
          id: '007',
          message: 'Am I working',
        }),
      10000
    );
  });
};

const state = () => ({
  promises: {},
});

const actions = {
  cleanUp(id) {
    try {
      if (id) delete this.promises[id];
    } catch (error) {
      console.error('useDedup.cleanUp has erroed: ', error);
    }
  },

  async fetchData(id) {
    try {
      const state = this;

      let cachedPromise = state.promises[id];
      if (!cachedPromise) {
        cachedPromise = apiClientCall();
        state.promises[id] = cachedPromise;
      }

      const resp = await cachedPromise;
      console.log('Got my copy: ', resp);
    } catch (error) {
      console.error('Caught the error: ', error);
    } finally {
      this.cleanUp(id);
    }
  },
};

export const useDedup = defineStore('dedup', {
  state,
  actions,
});
