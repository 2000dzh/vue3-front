// 根路由
export const RootRoute: any = {
	path: '/',
	name: 'Root',
	redirect: '/iotc',
	meta: {
		title: 'Root',
	},
}

// 登录页
export const LoginRoute: any = {
	path: '/login',
	name: 'Login',
	component: () => import('@/views/login/index.vue'),
	meta: {
		title: 'Login',
	},
}

import { aomRoutes } from './aom'
import { iotcRoutes } from './iotc'

// 不用权限的的基本路由
export const basicRoutes = [RootRoute, LoginRoute, aomRoutes,iotcRoutes]

// 侧边栏路由
export const sidebarRouting = [aomRoutes, iotcRoutes]
