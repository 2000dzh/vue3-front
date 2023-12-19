// vite.config.ts 打包配置
import terser from '@rollup/plugin-terser'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/index.scss";',
      },
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/packages/index.js'),
      name: 'CetVirtualTree',
      fileName: (format) => `CetVirtualTree.${format}.js`,
    },
    terserOptions: {
      compress: {
        drop_console: true,
      },
      format: {
        comments: false,
      },
    },
  },
})
