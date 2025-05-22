import { createRouter, createWebHashHistory, createWebHistory, Router } from 'vue-router';
import routes from './routes';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASE),
  routes: routes,
});

router.beforeEach(async (_to, _from, next) => {
  next();
});

export default router;
