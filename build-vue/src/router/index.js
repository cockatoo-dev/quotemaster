import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import index from "../views/index.vue";
import random from "../views/random.vue";
import popular from "../views/popular.vue";
import new_ from "../views/new.vue";
import id_ from "../views/id.vue";


const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: "/random",
            component: random
        },
        {
            path: "/popular",
            component: popular
        },
        {
            path: "/new",
            component: new_
        },
        {
            path: "/id/:id",
            component: id_ 
        }
    ]
})

export default router;