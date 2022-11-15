import PagePosts from '@/pages/PagePosts.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'posts',
            component: PagePosts,
        },
    ],
})

export default router
