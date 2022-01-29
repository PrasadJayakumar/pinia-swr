import { createPinia } from 'pinia';

import cachePlugin from './plugins/cachePlugin.js';

const piniaInstance = createPinia();

piniaInstance.use(cachePlugin);

export default piniaInstance;
