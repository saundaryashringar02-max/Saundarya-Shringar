import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// User Module Imports (core components)
import Navbar from './components/user/Navbar';
import Home from './components/user/Home';
import AboutSection from './components/user/AboutSection';
import Contact from './components/user/Contact';
import Shop from './components/user/Shop';
import Wishlist from './components/user/Wishlist';
import Checkout from './components/user/Checkout';
import TrackOrder from './components/user/TrackOrder';
import Footer from './components/user/Footer';
import CartDrawer from './components/user/CartDrawer';
import Auth from './components/user/Auth';
import Profile from './components/user/Profile';
import BlogSection from './components/user/BlogSection';
import Offers from './components/user/Offers';
import ProductDetail from './components/user/ProductDetail';
import Bag from './components/user/Bag';
import UserOrders from './components/user/UserOrders';
import ScrollToTop from './components/user/ScrollToTop';
import RaiseTicket from './components/user/RaiseTicket';

// Policy Imports - Dynamic imports to reduce initial bundle
const PrivacyPolicy = lazy(() => import('./components/user/policies/PrivacyPolicy'));
const ReturnPolicy = lazy(() => import('./components/user/policies/ReturnPolicy'));
const TermsAndConditions = lazy(() => import('./components/user/policies/TermsAndConditions'));
const CancelPolicy = lazy(() => import('./components/user/policies/CancelPolicy'));
const ShippingPolicy = lazy(() => import('./components/user/policies/ShippingPolicy'));

// Admin Module Imports - Dynamic imports
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./components/admin/AdminProducts'));
const AdminCategories = lazy(() => import('./components/admin/AdminCategories'));
const AdminCategoryVisibility = lazy(() => import('./components/admin/AdminCategoryVisibility'));
const AdminUsers = lazy(() => import('./components/admin/AdminUsers'));
const AdminOrders = lazy(() => import('./components/admin/AdminOrders'));
const AdminFinance = lazy(() => import('./components/admin/AdminFinance'));
const AdminBanners = lazy(() => import('./components/admin/AdminBanners'));
const AdminSettings = lazy(() => import('./components/admin/AdminSettings'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminComingSoon = lazy(() => import('./components/admin/AdminComingSoon'));
const AdminInventory = lazy(() => import('./components/admin/AdminInventory'));
const AdminCoupons = lazy(() => import('./components/admin/AdminCoupons'));
const AdminOffers = lazy(() => import('./components/admin/AdminOffers'));
const AdminReturns = lazy(() => import('./components/admin/AdminReturns'));
const AdminBlogs = lazy(() => import('./components/admin/AdminBlogs'));
const AdminTestimonials = lazy(() => import('./components/admin/AdminTestimonials'));
const AdminInstagram = lazy(() => import('./components/admin/AdminInstagram'));
const AdminReplacements = lazy(() => import('./components/admin/AdminReplacements'));
const AdminReviews = lazy(() => import('./components/admin/AdminReviews'));
const AdminSupport = lazy(() => import('./components/admin/AdminSupport'));
const AdminLogistics = lazy(() => import('./components/admin/AdminLogistics'));
const AdminLocations = lazy(() => import('./components/admin/AdminLocations'));

import { FiBox, FiRotateCcw, FiRefreshCw, FiTag, FiShoppingBag, FiUsers } from 'react-icons/fi';

// Loading component for lazy routes
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-light">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-pink"></div>
      <p className="mt-4 text-brand-dark font-medium">Loading...</p>
    </div>
  </div>
);

const UserRoutes = () => (
  <>
    <CartDrawer />
    <div className="min-h-screen bg-brand-light">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/privacy-policy" element={<Suspense fallback={<Loading />}><PrivacyPolicy /></Suspense>} />
          <Route path="/return-policy" element={<Suspense fallback={<Loading />}><ReturnPolicy /></Suspense>} />
          <Route path="/terms-conditions" element={<Suspense fallback={<Loading />}><TermsAndConditions /></Suspense>} />
          <Route path="/cancellation-policy" element={<Suspense fallback={<Loading />}><CancelPolicy /></Suspense>} />
          <Route path="/shipping-policy" element={<Suspense fallback={<Loading />}><ShippingPolicy /></Suspense>} />
          <Route path="/support" element={<RaiseTicket />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </>
);

const AdminRoutes = () => (
  <Routes>
    {/* Standalone Route for Admin Login */}
    <Route path="/login" element={<Auth />} />

    {/* Nested Routes inside AdminLayout */}
    <Route element={<Suspense fallback={<Loading />}><AdminLayout /></Suspense>}>
      <Route path="/" element={<Suspense fallback={<Loading />}><AdminDashboard /></Suspense>} />
      <Route path="/products" element={<Suspense fallback={<Loading />}><AdminProducts /></Suspense>} />
      <Route path="/categories" element={<Suspense fallback={<Loading />}><AdminCategories /></Suspense>} />
      <Route path="/category-visibility" element={<Suspense fallback={<Loading />}><AdminCategoryVisibility /></Suspense>} />
      <Route path="/users" element={<Suspense fallback={<Loading />}><AdminUsers /></Suspense>} />
      <Route path="/orders" element={<Suspense fallback={<Loading />}><AdminOrders /></Suspense>} />
      <Route path="/finance" element={<Suspense fallback={<Loading />}><AdminFinance /></Suspense>} />
      <Route path="/banners" element={<Suspense fallback={<Loading />}><AdminBanners /></Suspense>} />
      <Route path="/settings" element={<Suspense fallback={<Loading />}><AdminSettings /></Suspense>} />
      <Route path="/inventory" element={<Suspense fallback={<Loading />}><AdminInventory /></Suspense>} />
      <Route path="/returns" element={<Suspense fallback={<Loading />}><AdminReturns /></Suspense>} />
      <Route path="/coupons" element={<Suspense fallback={<Loading />}><AdminCoupons /></Suspense>} />
      <Route path="/offers" element={<Suspense fallback={<Loading />}><AdminOffers /></Suspense>} />
      <Route path="/customers" element={<Suspense fallback={<Loading />}><AdminUsers /></Suspense>} />
      <Route path="/blogs" element={<Suspense fallback={<Loading />}><AdminBlogs /></Suspense>} />
      <Route path="/testimonials" element={<Suspense fallback={<Loading />}><AdminTestimonials /></Suspense>} />
      <Route path="/instagram" element={<Suspense fallback={<Loading />}><AdminInstagram /></Suspense>} />
      <Route path="/reviews" element={<Suspense fallback={<Loading />}><AdminReviews /></Suspense>} />
      <Route path="/support" element={<Suspense fallback={<Loading />}><AdminSupport /></Suspense>} />
      <Route path="/logistics" element={<Suspense fallback={<Loading />}><AdminLogistics /></Suspense>} />
      <Route path="/locations" element={<Suspense fallback={<Loading />}><AdminLocations /></Suspense>} />
    </Route>
  </Routes>
);

import { onMessageListener, requestForToken } from './utils/firebase-config';
import api from './utils/api';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiBell } from 'react-icons/fi';

const NotificationListener = () => {
  const shopData = useShop();

  // If ShopContext is not yet available, don't try to access user/isAuthenticated
  const { user, isAuthenticated } = shopData || { user: null, isAuthenticated: false };

  React.useEffect(() => {
    // 1. Sync Token
    const syncToken = async () => {
      if (isAuthenticated) {
        const token = await requestForToken();
        if (token) {
          await api.post('/auth/save-fcm-token', { token, platform: 'web' });
        }
      }
    };
    syncToken();

    // 2. Listen for Foreground Messages (Fire Native Browser Notification only)
    const unsubscribe = onMessageListener((payload) => {
      console.log('Received foreground message:', payload);

      const displayData = payload.notification || {
        title: payload.data?.title || "Saundarya Shringar",
        body: payload.data?.body || "New update received."
      };

      // Trigger Native System Notification like Chrome card
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(displayData.title, {
            body: displayData.body,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            data: payload.data
          });
        });
      }
    });

    return () => unsubscribe && unsubscribe();
  }, [isAuthenticated]);

  return null; // No In-App UI, only Browser alerts
};

function App() {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ShopProvider>
      <NotificationListener />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;
