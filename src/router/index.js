import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import EditProfile from '../views/EditProfile.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/profile',
    component: EditProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
