import React, { useState } from 'react';
import { FiHeart, FiShoppingBag, FiStar, FiCheck, FiArrowRight, FiClock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const MiniTimer = () => {
  const [timeLeft, setTimeLeft] = React.useState({ h: 2, m: 34, s: 50 });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { s = 59; m--; }
        else if (h > 0) { s = 59; m = 59; h--; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-2 left-2 z-40 bg-brand-pink/90 backdrop-blur-sm text-white px-2 py-1 rounded-sm shadow-xl flex items-center gap-1.5 border border-white/20">
      <FiClock className="w-2.5 h-2.5 text-brand-gold animate-pulse" />
      <div className="flex gap-1">
        {[timeLeft.h, timeLeft.m, timeLeft.s].map((v, i) => (
          <span key={i} className="text-[8px] font-black tracking-tighter tabular-nums">
            {String(v).padStart(2, '0')}{i < 2 ? ':' : ''}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, isAuthenticated } = useShop();
  const [isAdded, setIsAdded] = useState(false);
  const liked = isInWishlist(product._id);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Auth Check
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggleWishlist(product);
  };

  const handleCardClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/product/${product._id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={handleCardClick}
      className="bg-[#FFF8F9] border border-brand-pink/5 rounded-2xl flex flex-col h-full group relative cursor-pointer hover:shadow-2xl hover:shadow-brand-pink/10 transition-all duration-500 overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden p-3 bg-white/20">
        {/* Timer Overlay if applicable */}
        {product.hasTimer && <MiniTimer />}

        {/* Minimalist Labels */}
        <AnimatePresence>
          <div className="absolute top-2 left-2 z-20 flex flex-col gap-1.5 items-start">
            {(product.discount || product.flashSale) && (
              <>
                <div className="flex items-center">
                  <span className="bg-[#5C2E3E] text-white text-[7px] font-black px-2 py-1 rounded-sm shadow-sm uppercase tracking-widest border border-white/10">
                    Running Sale
                  </span>
                </div>
                {product.discount && (
                  <span className="bg-brand-pink text-white text-[8px] font-black px-2 py-1 rounded-sm shadow-md flex items-center gap-1">
                    {product.discount} OFF
                  </span>
                )}
              </>
            )}
          </div>
        </AnimatePresence>

        {/* Wishlist Icon */}
        <button
          type="button"
          onClick={handleWishlist}
          className={`absolute top-2 right-2 z-30 transition-all p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md active:scale-90 ${liked ? 'text-brand-pink scale-110' : 'text-gray-300 hover:text-brand-pink'
            }`}
        >
          <FiHeart className={`w-3 h-3 ${liked ? 'fill-current' : ''}`} />
        </button>

        {/* Image - Filling the card proper */}
        <div className="w-full h-full overflow-hidden relative z-10 rounded-2xl bg-white/50 shadow-inner group">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
          />
          {product.discount && (
            <div className="absolute bottom-2 left-2 right-2 bg-white/70 backdrop-blur-sm py-1 px-2 rounded-lg border border-brand-pink/5 z-20 hidden md:block">
              <p className="text-[7px] font-black text-brand-dark uppercase tracking-widest text-center">
                ⚡ Limited Stock Available
              </p>
            </div>
          )}
        </div>

        {/* Ultra-Compact Quick Add Overlay */}
        <div className="absolute inset-x-3 md:inset-x-4 bottom-0 z-30 lg:translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-3 rounded-none flex items-center justify-center space-x-2 transition-all text-[8px] font-black uppercase tracking-[0.2em] shadow-2xl active:scale-95 mb-2 ${isAdded ? 'bg-brand-gold text-white' : 'bg-[#5C2E3E] text-white'
              }`}
          >
            {isAdded ? (
              <div className="flex items-center gap-1.5">
                <FiCheck className="w-3 h-3" />
                <span>Collected</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <FiShoppingBag className="w-3 h-3" />
                <span>Add to Bag</span>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="p-3 text-left flex flex-col flex-1 bg-transparent relative">
        <h3 className="font-sans font-bold text-[10px] md:text-[11px] text-gray-800 mb-1.5 line-clamp-2 leading-tight min-h-[2.4em]">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-2.5 h-2.5 ${i < (product.rating || 4) ? "fill-brand-gold text-brand-gold" : "text-gray-100"}`}
              />
            ))}
          </div>
          <span className="text-brand-pink font-bold text-[8px] md:text-[9px] tracking-tight">{product.reviews || '24k'} ratings</span>
        </div>

        <div className="space-y-1 mt-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-brand-dark font-black text-xs md:text-sm">₹{product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-400 text-[9px] line-through font-medium">₹{product.oldPrice}</span>
            )}
            {product.discount && (
              <span className="text-green-600 font-bold text-[8px] uppercase tracking-tighter">Save {product.discount}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
              <FiCheck className="w-2.5 h-2.5 text-green-600" />
              <span className="text-green-600 font-bold text-[7px] uppercase tracking-tighter">Fast Delivery</span>
            </div>
            {product.discount && (
              <span className="text-[#5C2E3E] font-black text-[7px] uppercase tracking-tighter border-l border-gray-200 pl-1.5">
                Ends Soon
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border border-brand-pink/0 group-hover:border-brand-pink/10 transition-all pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;
