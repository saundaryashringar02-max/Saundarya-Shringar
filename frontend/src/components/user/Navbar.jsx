import React, { useState } from 'react';
import { FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiHome, FiPercent, FiGrid, FiBell, FiClock } from 'react-icons/fi';
import api from '../../utils/api';

import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartCount, wishlistCount, setIsCartDrawerOpen, isAuthenticated, user } = useShop();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Prevent navbar from showing on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  React.useEffect(() => {
    if (isAuthenticated) {
      const fetchNotifications = async () => {
        try {
          const res = await api.get('/notifications/my-notifications');
          setNotifications(res.data.data.notifications);
          setUnreadCount(res.data.data.notifications.filter(n => !n.read).length);
        } catch (err) { console.error(err); }
      };
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 60000); // Polling every minute
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, location]);

  const markAllRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) { console.error(err); }
  };


  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'Skincare', link: '/shop?category=Skincare' },
    { name: 'Makeup', link: '/shop?category=Makeup' },
    { name: 'Soaps', link: '/shop?category=Soaps' },
    { name: 'Offers', link: '/offers' },
    { name: 'Blog', link: '/blog' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
  ];

  const isActive = (path) => (location.pathname + location.search) === path;

  return (
    <nav className="sticky top-0 z-50">
      <div className="bg-brand-pink shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center h-16 md:h-[72px] gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0 cursor-pointer group">
              <img
                src="/logo.png"
                alt="Saundarya Shringar Logo"
                className="h-10 w-auto md:h-14 logo-blend transition-transform group-hover:scale-105"
              />

              <div className="flex flex-col leading-none">
                <span
                  className="text-sm md:text-lg font-black tracking-[0.12em] text-white uppercase leading-none"
                  style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif" }}
                >
                  Saundarya
                </span>
                <span
                  className="text-[7px] md:text-[9px] tracking-[0.45em] text-white/80 mt-1 uppercase font-bold"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Shringar
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex items-center gap-4 xl:gap-8 px-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="relative group whitespace-nowrap"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '11px',
                      fontWeight: 900,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: isActive(item.link) ? '#5C2E3E' : 'black',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {item.name}
                    <span className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-black/60 transition-all duration-300 ${isActive(item.link) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 md:gap-5 text-black shrink-0 ml-auto lg:ml-0">

              {/* Notification Bell */}
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={`relative cursor-pointer hover:scale-110 transition-transform flex items-center justify-center p-0 ${isNotificationsOpen ? 'text-brand-dark' : ''}`}
                  >
                    <FiBell className="text-lg" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {isNotificationsOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                        >
                          <div className="bg-brand-dark p-4 flex justify-between items-center">
                            <h3 className="text-[10px] font-black uppercase text-white tracking-widest">Ritual Alerts</h3>
                            {unreadCount > 0 && (
                              <button onClick={markAllRead} className="text-[8px] font-black uppercase text-brand-gold hover:text-white transition-colors">Mark all read</button>
                            )}
                          </div>
                          <div className="max-h-80 overflow-y-auto scrollbar-hide">
                            {notifications.length === 0 ? (
                              <div className="p-8 text-center">
                                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">No Alerts at Present</p>
                              </div>
                            ) : (
                              notifications.map((n) => (
                                <Link
                                  key={n._id}
                                  to={n.type === 'rma_status' ? '/profile?tab=orders' : '#'}
                                  onClick={() => setIsNotificationsOpen(false)}
                                  className={`p-4 flex gap-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-brand-pink/5' : ''}`}
                                >
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!n.read ? 'bg-brand-pink text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <FiClock size={12} />
                                  </div>
                                  <div>
                                    <p className={`text-[10px] uppercase tracking-wider mb-1 ${!n.read ? 'font-black text-brand-dark' : 'font-bold text-gray-500'}`}>{n.title}</p>
                                    <p className="text-[9px] text-gray-400 font-serif italic leading-snug">{n.body}</p>
                                    <p className="text-[7px] text-gray-300 uppercase mt-2 font-bold">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                  </div>
                                </Link>
                              ))
                            )}
                          </div>
                          <Link
                            to="/profile?tab=orders"
                            onClick={() => setIsNotificationsOpen(false)}
                            className="p-3 bg-gray-50 block text-center text-[8px] font-black uppercase text-gray-400 hover:text-brand-pink transition-colors"
                          >
                            View All Journeys
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <Link
                to="/wishlist"
                className={`relative cursor-pointer hover:scale-110 transition-transform ${isActive('/wishlist') ? 'text-brand-dark' : ''}`}
              >
                <FiHeart className={`text-lg ${isActive('/wishlist') ? 'fill-current' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <div
                id="global-cart-icon"
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative cursor-pointer hover:scale-110 transition-transform"
              >
                <FiShoppingBag className="text-lg" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>

              <Link to={isAuthenticated ? "/profile" : "/login"}>
                <div className="relative group flex items-center justify-center">
                  {isAuthenticated ? (
                    <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center bg-brand-dark/20 text-[10px] font-serif italic font-black transition-all group-hover:bg-brand-gold group-hover:border-brand-gold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <FiUser className={`text-lg cursor-pointer hover:scale-110 transition-transform ${isActive('/login') ? 'text-brand-dark' : ''}`} />
                  )}
                </div>
              </Link>

              {/* Mobile Toggle */}
              <button className="lg:hidden text-xl" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] lg:hidden flex"
          >
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="w-4/5 bg-brand-pink h-full shadow-2xl p-8 relative overflow-y-auto">
              <button
                className="absolute top-6 left-6 text-2xl text-black outline-none"
                onClick={() => setIsOpen(false)}
              >
                <FiX />
              </button>

              <div className="mt-4 mb-8">
                <img src="/logo.png" alt="Logo" className="h-14 w-auto mb-4 logo-blend" />
                <h2
                  className="text-2xl text-white uppercase tracking-widest leading-none"
                  style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: 900 }}
                >
                  Saundarya
                </h2>
                <span
                  className="text-[9px] text-white/80 tracking-[0.45em] uppercase mt-1.5 block font-bold"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Shringar
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`pb-2 uppercase tracking-[0.15em] border-b transition-colors ${isActive(item.link) ? 'text-[#5C2E3E] border-[#5C2E3E]/30' : 'text-black border-black/10'}`}
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: '12px', fontWeight: 900 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] px-6 py-2">
        <div className="flex justify-around items-center h-12">
          <Link to="/" className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/' ? 'text-brand-pink' : 'text-brand-dark/40'}`}>
            <FiHome className={`text-xl ${location.pathname === '/' ? 'scale-110' : ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Home</span>
          </Link>
          <Link to="/shop" className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/shop' ? 'text-brand-pink' : 'text-brand-dark/40'}`}>
            <FiGrid className={`text-xl ${location.pathname === '/shop' ? 'scale-110' : ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Shop</span>
          </Link>
          <Link to="/offers" className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/offers' ? 'text-brand-pink' : 'text-brand-dark/40'}`}>
            <FiPercent className={`text-xl ${location.pathname === '/offers' ? 'scale-110' : ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Offers</span>
          </Link>

          <Link to={isAuthenticated ? "/profile" : "/login"} className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/profile' || location.pathname === '/login' ? 'text-brand-pink' : 'text-brand-dark/40'}`}>
            <FiUser className={`text-xl ${location.pathname === '/profile' || location.pathname === '/login' ? 'scale-110' : ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Account</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
