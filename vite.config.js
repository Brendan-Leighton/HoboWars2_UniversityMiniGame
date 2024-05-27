import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/HoboWars2_UniversityMiniGame',
	plugins: [react()],
})