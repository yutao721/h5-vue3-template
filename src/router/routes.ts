const routes = [
  {
    name: 'root',
    path: '/',
    redirect: '/home',
    component: () => import('@/components/Basic/index.vue'),
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '',
          keepAlive: false,
        },
      },
      {
        name: 'List',
        path: 'list',
        component: () => import('@/views/List/index.vue'),
        meta: {
          title: '',
          keepAlive: false,
        },
      },
      {
        name: 'Member',
        path: 'member',
        component: () => import('@/views/Member/index.vue'),
        meta: {
          title: '',
          keepAlive: false,
        },
      },
    ],
  },

];

export default routes;
