import { CACHE_EXPIRATION_TIME } from '../constants/cache.js';

export const { getCache, setCache } = (function () {
  const cacheStorage = {};

  return {
    getCache(key) {
      return cacheStorage[key];
    },
    setCache(key, data) {
      setTimeout(() => {
        cacheStorage[key] = null;
      }, CACHE_EXPIRATION_TIME);
      cacheStorage[key] = data;
    },
  };
})();
