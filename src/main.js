import { createApp } from 'vue'

import piniaInstance from './store/index.js'
import App from './App.vue'

const app = createApp(App)

app.use(piniaInstance)

app.mount('#app')
