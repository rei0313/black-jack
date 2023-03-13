import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({

  // 起个别名，在引用资源时，可以用‘@/资源路径’直接访问
  // resolve: {
  //   alias: {
  //     "@": resolve(__dirname, "src"),
  //   },
  // },
  //synax suger setting
  plugins: [vue({ reactivityTransform: true })],
  // 配置前端服务地址和端口
  server: {
    hmr: true,
    watch: {
      usePolling: true
    },
    host: '0.0.0.0',
    port: 5172,
    // 是否开启 https
    https: false,

    // 设置反向代理，跨域
    proxy: {
      '/api': {
        target: 'https://localhost:8080/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, 'https://localhost:8080/my-store')
      },
      '/linepay': {
        target: 'https://sandbox-api-pay.line.me/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/linepay/, 'https://sandbox-api-pay.line.me')
      }
    }
  }
})


