import PageVacancies from '@/pages/PageVacancies.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'posts',
            component: PageVacancies,
        },
    ],
})

export default router
