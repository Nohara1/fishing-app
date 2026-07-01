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

components.forEach((component) => {
  app.component(component.name, component)
})
app.use(router)

app.use(
  createYmaps({
    apikey: '9871bc00-5b9a-4257-b9c2-9d3066d435ea',
  }),
)
app.use(createPinia())
app.mount('#app')
