const routes = [
  {
    name: 'root',
    path: '/',
    redirect: '/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'Index',
        path: 'index',
        component: () => import('@/views/Home/index.vue'),
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
