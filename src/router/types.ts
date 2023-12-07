import { defineComponent } from 'vue'

import type { RouteMeta,RouteRecordRaw } from 'vue-router'

export interface AppRouteRecordRaw {
	name: string
	path: string
	meta?: RouteMeta
	component?: Component | string
	components?: Component
	children?: AppRouteRecordRaw[]
	fullPath?: string
	redirect?: string
}
