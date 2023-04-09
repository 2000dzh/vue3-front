import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

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
