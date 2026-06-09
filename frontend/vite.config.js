import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion-vendor';
            }
            if (id.includes('axios')) {
              return 'axios-vendor';
            }
            if (id.includes('firebase')) {
              return 'firebase-vendor';
            }
            return 'vendor';
          }

          // Admin components - separate chunk
          if (id.includes('admin')) {
            return 'admin';
          }

          // Policy pages - individual chunks
          if (id.includes('TermsAndConditions')) {
            return 'policy-terms';
          }
          if (id.includes('PrivacyPolicy')) {
            return 'policy-privacy';
          }
          if (id.includes('ReturnPolicy')) {
            return 'policy-return';
          }
          if (id.includes('ShippingPolicy')) {
            return 'policy-shipping';
          }
          if (id.includes('CancelPolicy')) {
            return 'policy-cancel';
          }

          // User pages
          if (id.includes('Shop.jsx')) {
            return 'page-shop';
          }
          if (id.includes('ProductDetail')) {
            return 'page-product';
          }
          if (id.includes('Checkout')) {
            return 'page-checkout';
          }
          if (id.includes('Home.jsx')) {
            return 'page-home';
          }

          // Context and utilities
          if (id.includes('context')) {
            return 'context';
          }
          if (id.includes('utils')) {
            return 'utils';
          }
        }
      }
    }
  }
})
