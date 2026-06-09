import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor libraries - split aggressively
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) {
              return 'vendor-react-dom';
            }
            if (id.includes('react/')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('axios')) {
              return 'vendor-axios';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('swiper')) {
              return 'vendor-swiper';
            }
            return 'vendor-other';
          }

          // Policy pages - EACH in separate chunk
          if (id.includes('policies/TermsAndConditions')) {
            return 'policy-terms';
          }
          if (id.includes('policies/PrivacyPolicy')) {
            return 'policy-privacy';
          }
          if (id.includes('policies/ReturnPolicy')) {
            return 'policy-return';
          }
          if (id.includes('policies/ShippingPolicy')) {
            return 'policy-shipping';
          }
          if (id.includes('policies/CancelPolicy')) {
            return 'policy-cancel';
          }

          // Admin - keep simple to avoid circular deps
          if (id.includes('admin')) {
            return 'admin';
          }

          // User pages
          if (id.includes('user/Home')) {
            return 'page-home';
          }
          if (id.includes('user/Shop')) {
            return 'page-shop';
          }
          if (id.includes('user/ProductDetail')) {
            return 'page-product';
          }
          if (id.includes('user/Checkout')) {
            return 'page-checkout';
          }

          // Context
          if (id.includes('context/ShopContext')) {
            return 'context-shop';
          }

          // Utils
          if (id.includes('utils/api')) {
            return 'utils-api';
          }
        },
      },
    },
  },
})
