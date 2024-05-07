import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        component: () => import('src/pages/APM-OBN.vue'),
      },
    ],
  },
  {
    path: '/am',
    component: () => import('layouts/AMLayout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('src/pages/AMHome.vue'),
      },
      {
        path: 'browse',
        component: () => import('src/pages/AMBrowse.vue'),
      },
      {
        path: 'album/:href',
        component: () => import('src/pages/AlbumPage.vue'),
      },
      {
        path: 'listen-now',
        component: () => import('src/pages/AMListenNow.vue'),
      },
      {
        path: 'radio',
        component: () => import('src/pages/AMRadio.vue'),
      },
      {
        path: 'settings',
        component: () => import('src/pages/AMSettings.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*', // Catch-all route for handling 404 errors
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
