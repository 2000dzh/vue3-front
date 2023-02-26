import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig(({ mode }: any) => {
	const env = loadEnv(mode, process.cwd())
	return {
		base: env.VITE_NODE_ENV === 'production' ? './' : '/',
		plugins: [
			vue(),
			AutoImport({
				imports: ['vue', 'vue-router'],
				dts: 'src/auto-import.d.ts',
			}),
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
