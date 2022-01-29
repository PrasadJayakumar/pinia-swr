/**
 *  CachePlugin
 *
 *  A simple plugin to cache and request deduplication
 */

export default function CachePlugin(context) {
  const { store, options } = context;

  //
  const isAlive = (cacheName, key) => {
    try {
      const _key = key ? key : 'all';
      const entry = store._cacheKeys[cacheName]?.find(
        (rec) => rec.key === _key
      );
      if (entry?.expiresIn > Date.now()) return true;
      return false;
    } catch (error) {
      console.error('CachePlugin.isAlive has errored: ', error);
    }
  };

  //
  const putCacheKey = (cacheName, key) => {
    try {
      const _key = key ? key : 'all';
      const { ttl = 30000, maxEntries = 5 } = options?.cache;

      const cacheKeys = store._cacheKeys[cacheName] || [];
      const newCacheKeys = cacheKeys.filter((rec) => rec.key != _key);
      newCacheKeys.push({ key: _key, expiresIn: Date.now() + ttl });

      let obsolete = null;
      if (newCacheKeys.length > maxEntries) obsolete = newCacheKeys.shift();

      store._cacheKeys[cacheName] = newCacheKeys;
      return obsolete;
    } catch (error) {
      console.error('CachePlugin.putCacheKey has errored: ', error);
    }
  };

  //
  const commit = (forceRefresh, fetcher, args, cacheName, key = null) =>
    new Promise((resolve, reject) => {
      let id = `${cacheName}/${key ? key : 'all'}`;
      try {
        if (typeof fetcher !== 'function') {
          reject({ message: 'fetcher is not a valid function' });
          return;
        }

        // Skip if the content is fresh
        if (isAlive(cacheName, key) && !forceRefresh) {
          resolve();
          return;
        }

        // If the request is already in-flight,
        // then skip the fetcher call
        let cachedPromise = store._promises[id];
        if (cachedPromise) {
          cachedPromise.then(() => resolve());
        } else {
          cachedPromise = fetcher(args);
          store._promises[id] = cachedPromise;

          cachedPromise.then((payload) => {
            const obsolete = putCacheKey(cacheName, key);

            if (!key) {
              store[cacheName] = payload;
            } else {
              store[cacheName][key] = payload;
              obsolete && delete store[cacheName][key];
            }
            resolve();
            cleanUp(id);
          });
        }
      } catch (error) {
        console.error('CachePlugin.commit has errored: ', error);
        reject(error);
        cleanUp(id);
      }
    });

  //
  const cleanUp = (id) => {
    try {
      if (id && store._promises[id]) delete store._promises[id];
    } catch (error) {
      console.error('CachePlugin.cleanUp has errored: ', error);
    }
  };

  // Augmenting a Store
  return { _promises: {}, _cacheKeys: {}, commit, cleanUp };
}
