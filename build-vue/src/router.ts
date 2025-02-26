import { createRouter, createWebHashHistory } from 'vue-router'
import Index from './pages/index.vue'
import Random from './pages/random.vue'
import Popular from './pages/popular.vue'
import New from './pages/new.vue'
import Id from './pages/id.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {path: '/', component: Index},
    {path: "/random", component: Random},
    {path: "/popular", component: Popular},
    {path: "/new", component: New},
    {path: "/id/:id",component: Id}
  ]
})

export default router
