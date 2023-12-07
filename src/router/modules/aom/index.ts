import LAYOUT from '@/layouts/index.vue'

import type { AppRouteRecordRaw } from '@/router/types'

export const aomRoutes: AppRouteRecordRaw = {
  path: '/aom',
  name: 'Aom',
  component: LAYOUT,
  redirect: '/aom/workbench',
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/views/workbench/index.vue'),
      meta: {},
    },
    {
      path: 'workbench2',
      name: 'Workbench2',
      component: () => import('@/views/login/index.vue'),
      meta: {},
      children: [
        {
          path: 'workbench3',
          name: 'workbench3',
          component: () => import('@/views/ceshi/index.vue'),
          meta: {},
          children: [
            {
              path: 'workbench3-1',
              name: 'workbench3-1',
              component: () => import('@/views/ceshi/index.vue'),
              meta: {},
              children: [
                {
                  path: 'workbench3-1-1',
                  name: 'workbench3-1-1',
                  component: () => import('@/views/ceshi/index.vue'),
                  meta: {},
                },
              ],
            },
          ],
        },
        {
          path: 'workbench4',
          name: 'workbench4',
          component: () => import('@/views/ceshi/index.vue'),
          meta: {},
        },
      ],
    },
  ],
}
