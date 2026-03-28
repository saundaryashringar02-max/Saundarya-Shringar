import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// User Module Imports
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

// Policy Imports
import PrivacyPolicy from './components/user/policies/PrivacyPolicy';
import ReturnPolicy from './components/user/policies/ReturnPolicy';
import TermsAndConditions from './components/user/policies/TermsAndConditions';
import CancelPolicy from './components/user/policies/CancelPolicy';

// Admin Module Imports
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProducts from './components/admin/AdminProducts';
import AdminCategories from './components/admin/AdminCategories';
import AdminUsers from './components/admin/AdminUsers';
import AdminOrders from './components/admin/AdminOrders';
import AdminFinance from './components/admin/AdminFinance';
import AdminBanners from './components/admin/AdminBanners';
import AdminSettings from './components/admin/AdminSettings';
import AdminLayout from './components/admin/AdminLayout';
import AdminComingSoon from './components/admin/AdminComingSoon';
import AdminInventory from './components/admin/AdminInventory';
import AdminCoupons from './components/admin/AdminCoupons';
import AdminReturns from './components/admin/AdminReturns';
import AdminBlogs from './components/admin/AdminBlogs';
import AdminTestimonials from './components/admin/AdminTestimonials';
import AdminInstagram from './components/admin/AdminInstagram';
import AdminReplacements from './components/admin/AdminReplacements';
import AdminReviews from './components/admin/AdminReviews';
import { FiBox, FiRotateCcw, FiRefreshCw, FiTag, FiShoppingBag, FiUsers } from 'react-icons/fi';

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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/cancellation-policy" element={<CancelPolicy />} />
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
    <Route element={<AdminLayout />}>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/products" element={<AdminProducts />} />
      <Route path="/categories" element={<AdminCategories />} />
      <Route path="/users" element={<AdminUsers />} />
      <Route path="/orders" element={<AdminOrders />} />
      <Route path="/finance" element={<AdminFinance />} />
      <Route path="/banners" element={<AdminBanners />} />
      <Route path="/settings" element={<AdminSettings />} />
      <Route path="/inventory" element={<AdminInventory />} />
      <Route path="/returns" element={<AdminReturns />} />
      <Route path="/coupons" element={<AdminCoupons />} />
      <Route path="/customers" element={<AdminUsers />} />
      <Route path="/blogs" element={<AdminBlogs />} />
      <Route path="/testimonials" element={<AdminTestimonials />} />
      <Route path="/instagram" element={<AdminInstagram />} />
      <Route path="/reviews" element={<AdminReviews />} />
    </Route>
  </Routes>
);

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
