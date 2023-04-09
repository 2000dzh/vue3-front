import LAYOUT from '@/layouts/index.vue'
import type { AppRouteRecordRaw } from '@/router/types'

export const iotcRoutes: AppRouteRecordRaw = {
	path: '/iotc',
	name: 'Iotc',
	component: LAYOUT,
	redirect: '/iotc/workbench',
	children: [
		{
			path: 'workbench',
			name: 'workbench',
			component: () => import('@/views/workbench/index.vue'),
			meta: {},
		},
	],
}
