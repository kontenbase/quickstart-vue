import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import EditProfile from '../views/EditProfile.vue';
import Profile from '../views/Profile.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/profile',
    component: EditProfile,
  },
  {
    path: '/:username',
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
