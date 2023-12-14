import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'

export default defineConfig(({ mode }: any) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_NODE_ENV === 'production' ? './' : '/',
    plugins: [
      vue(),
      // 自动导入
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ['vue', 'vue-router', '@vueuse/core'],
        // 通过一个自定义函数从组件名称中解析组件导入路径(PascalCase)主要用来扩展外部资源
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
        ],
        // 是否在 vue 模板中自动导入
        vueTemplate: true,
        // 自动导入目录的路径
        dirs: ['src'],
        //  配置文件生成位置，默认是根目录 /auto-imports.d.ts
        dts: path.resolve(__dirname, 'types', 'auto-import.d.ts'),
      }),
      // 自动注册组件
      Components({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
        // 自动注册项目 指定路径 下组件为全局组件
        dirs: ['src/components'],
        // 组件有效的扩展名
        extensions: ['vue', 'tsx'],
        // 通过一个自定义函数从组件名称中解析组件导入路径(PascalCase)主要用来扩展外部资源
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
        // 配置文件生成位置，默认是根目录 /components.d.ts
        dts: path.resolve(__dirname, 'types', 'components.d.ts'),
      }),
      // 调试页面及插件
      Inspect(),
    ],
    server: {
      // 指定端口
      port: 443,
      // 是否自动在浏览器打开
      open: false,
      hmr: true,
      // 方向代理
      proxy: {},
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      // 打包后文件夹名称
      outDir: 'dist',
      // 打包后去除 console debugger(需要安装 terser )      
      minify: 'terser' as const,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
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
