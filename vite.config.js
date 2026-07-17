import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers — smaller, faster output
    target: 'es2020',

    // Split CSS per chunk so pages only load their own styles
    cssCodeSplit: true,

    // Inline assets < 4 KB as base64 (avoids extra HTTP requests for tiny icons)
    assetsInlineLimit: 4096,

    // Warn when a chunk exceeds 600 KB
    chunkSizeWarningLimit: 600,

    // Enable minification — Vite 8 uses Oxc (Rolldown) natively
    minify: 'oxc',

    rollupOptions: {
      output: {
        // Fine-grained chunk splitting
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            // Keep heavy data files as separate async chunks
            if (id.includes('allDepartmentsLegacyData') || id.includes('cseLegacyData')) return 'legacy-data'
            if (id.includes('examsData')) return 'exams-data'
            if (id.includes('placementsData')) return 'placements-data'
            return
          }
          // Vendor splitting
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-dom') || id.includes('react/')) return 'react-vendor'
          if (id.includes('jose')) return 'auth'
        },

        // Descriptive, cache-busted filenames
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },

  server: {
    strictPort: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
