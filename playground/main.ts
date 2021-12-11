import { createSolarwind } from 'solarwind'
import { createApp } from 'vue'
import App from './app.vue'

createApp(App).use(createSolarwind()).mount('#app')
