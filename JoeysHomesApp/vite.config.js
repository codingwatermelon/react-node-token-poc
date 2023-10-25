import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
		  '/api': {
			target: 'http://192.168.64.3:5000/api/',
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/api/, ''),
		  },
		},
	  },
});
  