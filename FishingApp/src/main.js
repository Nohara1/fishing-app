// import './assets/main.css'

import { createApp } from 'vue'

import components from '@/components/ui'
import router from '@/router/router.js'
import directives from '@/directives/index'
import store from './components/store'

import { createYmaps } from 'vue-yandex-maps'
import App from './App.vue'

const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})
directives.forEach((directive) => {
  app.directive(directive.name, directive)
})
app.use(router)
app.use(store)

app.use(
  createYmaps({
    apikey: '9e9eaf08-e59c-438b-a487-d73646416f55',
  }),
)
app.mount('#app')
// import { createPinia } from 'pinia'

// import App from './App.vue'

// const app = createApp(App)

// app.use(createPinia())

// app.mount('#app')
