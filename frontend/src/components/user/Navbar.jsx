import React, { useState } from 'react';
import { FiHeart, FiShoppingBag, FiUser, FiMenu, FiX, FiHome, FiPercent } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartCount, wishlistCount, setIsCartDrawerOpen, isAuthenticated, user } = useShop();

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Shop', link: '/shop' },
    { name: 'Skincare', link: '/shop?category=Skincare' },
    { name: 'Makeup', link: '/shop?category=Makeup' },
    { name: 'Soaps', link: '/shop?category=Soaps' },
    { name: 'Offers', link: '/shop?offers=true' },
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
                alt="Saundarya Shrinagar Logo"
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
                  Shrinagar
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
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] lg:hidden flex"
          >
            <div className="w-4/5 bg-brand-pink h-full shadow-2xl p-8 relative overflow-y-auto">
              <button
                className="absolute top-6 right-6 text-2xl text-black outline-none"
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
                  Shrinagar
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
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] px-6 py-2">
        <div className="flex justify-between items-center h-12">
          <Link to="/" className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/' ? 'text-brand-pink' : 'text-brand-dark/40'}`}>
            <FiHome className={`text-xl ${location.pathname === '/' ? 'scale-110' : ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Home</span>
          </Link>
          <Link to="/shop" className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/shop' ? 'text-brand-pink' : 'text-brand-dark/40'}`}>
            <FiShoppingBag className={`text-xl ${location.pathname === '/shop' ? 'scale-110' : ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Shop</span>
          </Link>
          <Link to="/wishlist" className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/wishlist' ? 'text-brand-pink' : 'text-brand-dark/40'}`}>
            <div className="relative">
              <FiHeart className={`text-xl ${location.pathname === '/wishlist' ? 'scale-110' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest">Like</span>
          </Link>
          <div 
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex flex-col items-center gap-1 group transition-colors text-brand-dark/40 cursor-pointer"
          >
            <div className="relative">
              <FiShoppingBag className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest">Bag</span>
          </div>

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
