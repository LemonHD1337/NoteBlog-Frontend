import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd())

  return{
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_URL_API,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) =>{
            proxy.on("error", err => {
              console.log(err)
            })
            proxy.on("proxyReq", (req) =>{
              console.log('Sending Request to the Target:', req.method, req.path)
            })
            proxy.on("proxyRes", (proxyRes, req)=>{
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
            })
          }
        }
      }
    }
  }
})
