import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					auth: ['./src/pages/Signin.vue', './src/pages/Signup.vue'],
					home: ['./src/pages/Home.vue'],
				},
			},
		},
	},
})
