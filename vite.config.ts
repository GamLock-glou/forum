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
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'state': ['zustand'],
          'icons': ['lucide-react'],
          'ui': ['react-window'],
          
          'entities': [
            './src/entities/post/index.ts',
            './src/entities/user/index.ts',
            './src/entities/comment/index.ts'
          ],
          'features': [
            './src/features/session/index.tsx',
            './src/features/auth/LoginModal/index.tsx',
            './src/features/post-actions/CreatePostForm.tsx',
            './src/features/filters/UserFilter.tsx'
          ]
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
