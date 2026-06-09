import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Policy pages as separate chunks
          'policies': [
            './src/components/user/policies/TermsAndConditions.jsx',
            './src/components/user/policies/PrivacyPolicy.jsx',
            './src/components/user/policies/ReturnPolicy.jsx',
            './src/components/user/policies/ShippingPolicy.jsx',
            './src/components/user/policies/CancelPolicy.jsx',
          ],
          // Admin pages
          'admin-dashboard': [
            './src/components/admin/AdminDashboard.jsx',
          ],
          // User pages
          'user-pages': [
            './src/components/user/Home.jsx',
            './src/components/user/Shop.jsx',
            './src/components/user/ProductDetail.jsx',
          ],
        }
      }
    }
  }
})
