import { createRouter, createWebHashHistory } from 'vue-router'

import { basicRoutes } from './modules'


export const router = createRouter({
	history: createWebHashHistory(),
	routes: basicRoutes,
	scrollBehavior: () => ({ left: 0, top: 0 }),
})

export {}
