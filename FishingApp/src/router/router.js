import { createRouter, createWebHistory } from 'vue-router'
import PageMap from '@/pages/PageMap.vue'
import PageFishes from '@/pages/PageFishes.vue'
import PageWeather from '@/pages/PageWeather.vue'
import PageBait from '@/pages/PageBait.vue'
const routes = [
  {
    path: '/',
    name: 'PageMap',
    component: PageMap,
  },
  {
    path: '/fishes',
    name: 'PageFishes',
    component: PageFishes,
  },
  {
    path: '/weather',
    name: 'PageWeather',
    component: PageWeather,
  },
  {
    path: '/bait',
    name: 'PageBait',
    component: PageBait,
  },
  // {
  //   path: '/posts/:id',
  //   component: PostIdPage,
  // },
  // {
  //   path: '/store',
  //   component: PostPageWithStore,
  // },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
