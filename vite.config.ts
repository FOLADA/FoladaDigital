import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Add base path for production deployment
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add assetsInclude setting to properly handle WebP, PNG, JPG, and TTF files
  assetsInclude: ['**/*.webp', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.ttf'],
  // Add build optimizations
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            'lucide-react'
          ],
          animations: [
            'framer-motion'
          ],
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend'
          ],
          forms: [
            'react-hook-form',
            '@hookform/resolvers',
            'zod'
          ],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-toast'
          ]
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify JS and CSS
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2 // Additional compression passes
      },
      mangle: true,
      format: {
        comments: false
      }
    },
    // Enable brotli compression
    brotliSize: true,
    // Reduce sourcemap size
    sourcemap: mode === 'development' ? 'inline' : false
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'i18next',
      'react-i18next'
    ],
    // Enable esbuild for faster builds
    esbuildOptions: {
      target: 'es2020'
    }
  },
  // Enable caching
  cacheDir: 'node_modules/.vite',
  // Enable worker support
  worker: {
    format: 'es',
    plugins: () => [react()]
  }
}));