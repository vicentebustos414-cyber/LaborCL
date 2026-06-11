import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { writeFileSync, readFileSync } from 'fs'

// Plugin: after build, copy index-react.html → index.html for Capacitor/Electron
function fixIndexPlugin() {
  return {
    name: 'fix-index',
    closeBundle() {
      try {
        const src = readFileSync('./dist-react/index-react.html', 'utf-8')
        writeFileSync('./dist-react/index.html', src)
      } catch {}
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), fixIndexPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  build: {
    outDir: 'dist-react',
    emptyOutDir: true,
    rollupOptions: {
      input: './index-react.html',
    },
  },
})
