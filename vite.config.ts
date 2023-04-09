import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import DefineOptions from 'unplugin-vue-define-options/dist/vite'

export default defineConfig(({ mode }: any) => {
	const env = loadEnv(mode, process.cwd())
	return {
		base: env.VITE_NODE_ENV === 'production' ? './' : '/',
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
				imports: ['vue', 'vue-router'],
				dts: 'src/auto-import.d.ts',
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
      DefineOptions()
		],
		server: {
			open: false,
			hmr: true,
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
			},
		},
		build: {
			rollupOptions: {
				output: {
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/name-[hash].[ext]',
				},
			},
		},
	}
})
