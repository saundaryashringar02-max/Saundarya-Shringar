import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20">
      {/* Header */}
      <header className="bg-gradient-to-b from-brand-pink/5 to-transparent pt-10 pb-4 text-center">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[8px] mb-1 block">Your Ritual</span>
            <h1 className="text-2xl md:text-4xl font-serif font-black text-[#5C2E3E] leading-[0.9] tracking-tight">
              Curated <span className="text-brand-pink italic">Treasures</span>
            </h1>
            <p className="text-[#5C2E3E]/50 text-[10px] md:text-xs mt-2 max-w-xs mx-auto font-serif italic leading-relaxed">
              "Favorite organic essentials, waiting for their moment."
            </p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#5C2E3E]">
            Liked Items <span className="text-brand-pink ml-2">({wishlist.length})</span>
          </h2>
          <Link to="/shop" className="text-[10px] font-bold text-brand-gold hover:text-brand-pink flex items-center gap-1 transition-colors uppercase tracking-widest">
            Continue Shopping <FiArrowRight />
          </Link>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-12">
            <AnimatePresence mode="popLayout">
              {wishlist.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group"
                >
                  <ProductCard product={product} />
                  {/* Additional removal helper for wishlist page specifically */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 left-4 z-40 bg-white/90 p-2 rounded-full text-red-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-50"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <div className="w-16 h-16 bg-brand-pink/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart className="text-brand-pink/30" size={32} />
            </div>
            <h3 className="text-2xl font-serif font-black text-[#5C2E3E] mb-3 italic opacity-40">"Your collection is empty..."</h3>
            <p className="text-[10px] text-gray-400 mb-8 uppercase tracking-[0.2em] max-w-xs mx-auto leading-loose">
              Discover our organic range and save your favorites here.
            </p>
            <Link
              to="/shop"
              className="px-10 py-4 bg-[#5C2E3E] text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full shadow-2xl hover:bg-brand-pink transition-all"
            >
              Explore Shop
            </Link>
          </motion.div>
        )}
      </main>

      {/* Recommended for you bit - very boutique */}
      {wishlist.length > 0 && (
        <section className="container mx-auto px-4 md:px-8 pt-20 border-t border-gray-50 mt-20">
          <div className="text-center mb-12">
            <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[8px] mb-2 block font-sans">Handpicked For You</span>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#5C2E3E] italic">Divine <span className="text-brand-pink">Pairings</span></h2>
          </div>

          <div className="bg-[#5C2E3E] rounded-[3rem] p-10 text-center relative overflow-hidden group max-w-4xl mx-auto">
            <div className="relative z-10">
              <p className="text-white/60 text-[10px] mb-6 font-serif italic">"Complete your daily ritual with our master-curated kits."</p>
              <Link to="/offers" className="bg-brand-gold text-white px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-brand-gold transition-all inline-block shadow-xl">
                View Seasonal Kits
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Wishlist;
