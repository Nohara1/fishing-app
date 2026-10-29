// import './assets/main.css'

import { createApp } from 'vue'

import components from '@/components/ui'
import router from '@/router/router.js'
import 'virtual:svg-icons-register'
import { createPinia } from 'pinia'

/** style **/
import '@/scss/utility.scss'

import { createYmaps } from 'vue-yandex-maps'
import App from './App.vue'

const app = createApp(App)

const map = import.meta.env.VITE_YANDEX_MAP_KEY

components.forEach((component) => {
  app.component(component.name, component)
})
app.use(router)

app.use(
  createYmaps({

    apikey: map,
  }),
)
app.use(createPinia())
app.mount('#app')
