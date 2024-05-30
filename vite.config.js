import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'




export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the limit as needed
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/components')) {
            return 'components';
          }
          
        },
      },
    },
  },
});
