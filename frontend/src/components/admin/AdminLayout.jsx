import React, { useState } from 'react';
import { Link, useLocation, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiLayers,
  FiImage,
  FiSettings,
  FiLogOut,
  FiBell,
  FiSearch,
  FiTrendingUp,
  FiMenu,
  FiX,
  FiChevronDown,
  FiRotateCcw,
  FiRefreshCw,
  FiBox,
  FiTag,
  FiDollarSign,
  FiUser,
  FiMessageSquare,
  FiHelpCircle,
  FiTruck,
  FiMapPin,
  FiZap
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { onMessageListener } from '../../utils/firebase-config';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAuthLoading, logout, user } = useShop();

  React.useEffect(() => {
    // Close sidebar automatically when navigating on mobile
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  React.useEffect(() => {
    const unsubscribe = onMessageListener((payload) => {
      setNotifications(prev => [{
        id: Date.now(),
        text: payload.notification?.body || 'New Notification',
        time: 'Just now'
      }, ...prev]);
    });
    return () => unsubscribe();
  }, []);

  // Route protection
  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF7F8]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C2E3E]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    if (notifications.length <= 1) setIsNotificationsOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm('Securely terminating admin session. Proceed to exit?')) {
      logout();
      navigate('/admin/login');
    }
  };

  const menuItems = [
    { title: 'Overview', path: '/admin', icon: <FiBox /> },
    { title: 'Categories', path: '/admin/categories', icon: <FiLayers /> },
    { title: 'Products', path: '/admin/products', icon: <FiShoppingBag /> },
    { title: 'Inventory', path: '/admin/inventory', icon: <FiBox /> },
    { title: 'Orders', path: '/admin/orders', icon: <FiShoppingBag /> },
    { title: 'Logistics & Taxes', path: '/admin/logistics', icon: <FiTruck /> },
    { title: 'Service Locations', path: '/admin/locations', icon: <FiMapPin /> },
    { title: 'Finance', path: '/admin/finance', icon: <FiDollarSign /> },
    { title: 'Customers', path: '/admin/customers', icon: <FiUsers /> },
    { title: 'Returns & Replace', path: '/admin/returns', icon: <FiRotateCcw /> },
    { title: 'Coupons', path: '/admin/coupons', icon: <FiTag /> },
    { title: 'Divine Offers', path: '/admin/offers', icon: <FiZap /> },
    { title: 'Banners', path: '/admin/banners', icon: <FiImage /> },
    { title: 'Blogs', path: '/admin/blogs', icon: <FiLayers /> },
    { title: 'Testimonials', path: '/admin/testimonials', icon: <FiUsers /> },
    { title: 'Instagram Feed', path: '/admin/instagram', icon: <FiTrendingUp /> },
    { title: 'Feedback Ledger', path: '/admin/reviews', icon: <FiMessageSquare /> },
    { title: 'Support Archive', path: '/admin/support', icon: <FiHelpCircle /> },
    { title: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="flex min-h-screen bg-brand-light font-['Inter',_sans-serif] overflow-x-hidden">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-[#5C2E3E]/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Persistent Mini Mode or Full Mode */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? (window.innerWidth < 1024 ? 280 : 256) : (window.innerWidth < 1024 ? 0 : 64),
          x: window.innerWidth < 1024 && !isSidebarOpen ? -280 : 0
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-brand-dark text-white flex flex-col fixed h-screen z-50 shadow-2xl overflow-hidden border-r border-white/5"
      >
        <div className={`p-3 pt-6 mb-2 flex items-center gap-3 ${!isSidebarOpen ? 'justify-center' : 'pl-4'} transition-all`}>
          <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-xl overflow-hidden group">
            <img src="/logo_uploaded.jpg" alt="Saundarya Shringar Logo" className="w-full h-full object-cover" />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-black tracking-[0.1em] text-white uppercase" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
                Saundarya
              </span>
              <span className="text-[7px] text-white/40 tracking-[0.3em] uppercase font-bold mt-0.5" style={{ fontFamily: "'Cinzel', serif" }}>
                Shringar
              </span>
            </div>
          )}
        </div>

        <nav
          className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto custom-sidebar-scrollbar"
          data-lenis-prevent
        >
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              title={!isSidebarOpen ? item.title : ''}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative ${location.pathname === item.path
                ? 'bg-white/10 text-white'
                : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              <div className={`shrink-0 transition-all duration-300 ${location.pathname === item.path ? 'scale-110 text-white' : 'group-hover:scale-110'}`}>
                {React.cloneElement(item.icon, { size: 20 })}
              </div>

              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-[11px] font-bold tracking-wide whitespace-nowrap overflow-hidden"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>

              {location.pathname === item.path && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 bg-brand-gold h-4 top-1/2 -translate-y-1/2 rounded-r-full"
                />
              )}
            </Link>
          ))}
          <div className="h-20 w-full flex-shrink-0" />
        </nav>

        <div className="p-4 border-t border-white/5 flex-shrink-0">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${isSidebarOpen ? 'gap-4 px-4' : 'justify-center'} py-2 text-white/40 hover:text-white transition-all group`}
          >
            <FiLogOut className={`text-xl ${isSidebarOpen ? 'rotate-180' : ''}`} />
            {isSidebarOpen && (
              <span className="text-[12px] font-bold tracking-widest uppercase">Logout</span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {/* Header - Premium Navigation */}
        <header className="h-12 bg-brand-light/80 backdrop-blur-xl border-b border-brand-pink/5 flex items-center justify-between px-4 sticky top-0 z-40 transition-all">
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebarOpen(!isSidebarOpen);
              }}
              className="p-2 text-brand-dark hover:bg-brand-light rounded-none transition-all border border-brand-pink/5"
            >
              <FiMenu size={18} />
            </button>
            <div className="flex items-center gap-4">
              <h1 className="text-[11px] font-black text-gray-800 tracking-[0.2em] uppercase px-4 border-l-2 border-brand-pink/10 ml-2 leading-none">
                {menuItems.find(item => item.path === location.pathname)?.title || 'Overview'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-1.5 transition-all ${isNotificationsOpen ? 'text-brand-pink' : 'text-gray-400 hover:text-brand-pink'}`}
              >
                <FiBell size={14} />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-brand-pink rounded-none border border-white"></span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white border border-brand-pink/10 shadow-2xl z-50 rounded-none overflow-hidden"
                  >
                    <div className="p-3 bg-brand-light/30 border-b border-brand-pink/5 flex items-center justify-between">
                      <span className="text-[8px] font-black uppercase tracking-widest text-brand-dark">Security Alerts</span>
                      <span className="text-[6px] bg-brand-pink text-white px-1.5 py-0.5 rounded-none uppercase">{notifications.length} NEW</span>
                    </div>
                    <div className="max-h-60 overflow-y-auto no-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div key={n.id} className="p-3 border-b border-brand-pink/[0.02] hover:bg-brand-light/10 transition-colors group">
                            <p className="text-[9px] text-brand-dark font-medium leading-tight mb-1">{n.text}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-[7px] text-gray-400 uppercase tracking-tighter">{n.time}</span>
                              <button
                                onClick={() => removeNotification(n.id)}
                                className="text-[7px] font-black text-brand-pink uppercase tracking-widest hover:underline"
                              >
                                Mark Read
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-10 text-center">
                          <p className="text-[8px] text-gray-400 uppercase tracking-[0.2em]">Secure Archive Clear</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-[1px] h-6 bg-brand-pink/10 hidden sm:block"></div>
            <Link to="/admin/settings" className="flex items-center gap-3 hover:bg-gray-50 p-1 rounded-lg transition-all group">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-bold text-gray-800 leading-tight group-hover:text-brand-pink transition-colors">Admin User</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">SUPER ADMIN</p>
              </div>
              <div className="w-9 h-9 bg-[#3D2522] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:bg-brand-pink transition-all">
                A
              </div>
            </Link>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-3 md:p-4 min-h-[calc(100vh-48px)] bg-[#F2EDED] relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
