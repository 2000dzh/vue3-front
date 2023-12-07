import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/dist/vite'
import { defineConfig, loadEnv } from 'vite'
// import { createHtmlPlugin } from 'vite-plugin-html'
// import externalGlobals from 'rollup-plugin-external-globals'

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
      DefineOptions(),
      // createHtmlPlugin({
      //   template: 'index.html',
      //   inject: {
      //     tags: [
      //       {
      //         tag: 'script',
      //         injectTo: 'head',
      //         attrs: {
      //       src: 'https://unpkg.com/vue@3.2.45/dist/vue.global.js',
      //         },
      //       },
      //       {
      //         tag: 'link',
      //         injectTo: 'head',
      //         attrs: {
      //           src: 'https://unpkg.com/element-plus@2.3.14/dist/index.css',
      //         },
      //       },
      //       {
      //         tag: 'script',
      //         injectTo: 'head',
      //         attrs: {
      //           src: 'https://unpkg.com/element-plus@2.3.14/dist/index.full.js',
      //         },
      //       },
      //     ],
      //   },
      // }),
    ],
    server: {
      open: false,
      hmr: true,
      port: 443
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        // vue: 'https://esm.sh/vue@3.2.3',
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/name-[hash].[ext]',
        },
        // external: ['element-plus'],
        // plugins: [
        //   externalGlobals({
        //     // vue: 'Vue',
        //     'element-plus': 'ElementPlus',
        //   }),
        // ],
      },
    },
  }
})
