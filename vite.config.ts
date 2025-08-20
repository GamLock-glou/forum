import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router-dom')) {
              return 'router';
            }
            if (id.includes('zustand')) {
              return 'state';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('react-window')) {
              return 'ui';
            }
          }
          
          if (id.includes('/src/entities/')) {
            return 'entities';
          }
          if (id.includes('/src/features/')) {
            return 'features';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    
    sourcemap: false,
    
    minify: true,
  },
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'lucide-react',
      'react-window'
    ],
  },
});
