// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import AuthenticationForm from '@/components/AuthenticationForm.vue';
import UserDashboard from '@/components/UserDashboard.vue';

const routes = [
    { path: '/', name: 'auth', component: AuthenticationForm },
    { path: '/dashboard', name: 'dashboard', component: UserDashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const loggedIn = !!localStorage.getItem('user');
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/');
    } else {
        next();
    }
});

export default router;
