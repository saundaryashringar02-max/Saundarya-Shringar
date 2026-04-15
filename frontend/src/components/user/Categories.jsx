import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import ProductCard from './ProductCard';
import { FiArrowRight, FiSun, FiZap, FiDroplet, FiFeather, FiStar, FiShield, FiHeart, FiGift, FiUser, FiEye, FiBox } from 'react-icons/fi';

const Categories = () => {
  const { categories, products, loading } = useShop();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (name) => {
    const n = name?.toLowerCase() || '';
    if (n.includes('skin')) return <FiSun size={24} />;
    if (n.includes('hair')) return <FiZap size={24} />;
    if (n.includes('soap')) return <FiDroplet size={24} />;
    if (n.includes('makeup')) return <FiFeather size={24} />;
    if (n.includes('jewel')) return <FiStar size={24} />;
    if (n.includes('inner')) return <FiShield size={24} />;
    if (n.includes('well')) return <FiHeart size={24} />;
    if (n.includes('combo')) return <FiGift size={24} />;
    if (n.includes('body')) return <FiUser size={24} />;
    if (n.includes('eye')) return <FiEye size={24} />;
    return <FiBox size={24} />;
  };

  if (loading && categories.length === 0) {
    return (
      <div className="py-8 bg-brand-light">
        <div className="container mx-auto px-4 flex justify-center gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-4 md:py-6 bg-brand-light group/cat">
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <h2 className="text-lg md:text-xl font-serif font-bold mb-1 text-brand-dark uppercase tracking-wide">Shop by Category</h2>
          <div className="w-12 h-1 bg-brand-gold mx-auto"></div>
        </motion.div>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-[60%] -translate-y-1/2 z-30 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-white transition-all duration-300 opacity-0 group-hover/cat:opacity-100 hidden md:flex border border-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-[60%] -translate-y-1/2 z-30 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-white transition-all duration-300 opacity-0 group-hover/cat:opacity-100 hidden md:flex border border-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto overflow-y-hidden pb-4 pt-2 gap-8 px-12 scrollbar-hide no-scrollbar snap-x snap-mandatory md:justify-center justify-start items-center"
        >
          {categories.map((cat, index) => (
            <div
              key={cat._id || index}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              className="flex-shrink-0 flex flex-col items-center group cursor-pointer snap-start"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-2 border-2 transition-all duration-300 shadow-sm hover:shadow-md ${selectedCategory === cat.name ? 'border-brand-gold bg-brand-gold text-white scale-105' : 'border-transparent bg-brand-pink text-white group-hover:border-brand-gold/30'}`}>
                  {getCategoryIcon(cat.name)}
                </div>
                <h3 className={`text-[9px] md:text-[10px] font-black transition-colors text-center uppercase tracking-tighter leading-tight max-w-[70px] ${selectedCategory === cat.name ? 'text-brand-gold' : 'text-brand-dark opacity-60'}`}>
                  {cat.name}
                </h3>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Dynamic Tiered Products Section */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 space-y-8 bg-white/40 p-4 md:p-8 rounded-[2rem] border border-brand-gold/5"
          >
            {[
              { title: "Budget Range", subtitle: "(₹100 – ₹500)", filter: (p) => p.price <= 500 },
              { title: "Mid Range", subtitle: "(₹501 – ₹1000)", filter: (p) => p.price >= 501 && p.price <= 1000 },
              { title: "Premium Range", subtitle: "(₹1001 – ₹2000)", filter: (p) => p.price >= 1001 && p.price <= 2000 }
            ].map((tier, tidx) => {
              const tierProducts = products
                .filter(p => p.category === selectedCategory && p.image && (p.image.startsWith('http') || p.image.startsWith('/images') || p.image.startsWith('res.cloudinary')) && tier.filter(p))
                .slice(0, 5);

              if (tierProducts.length === 0) return null;

              return (
                <div key={tidx} className="space-y-4">
                  <div className="flex items-end justify-between border-b border-brand-gold/10 pb-2">
                    <div>
                      <h4 className="text-lg md:text-2xl font-serif font-black text-[#5C2E3E] leading-none mb-1">{tier.title}</h4>
                      <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{tier.subtitle}</p>
                    </div>
                    <Link
                      to={`/shop?category=${selectedCategory}`}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-pink hover:text-brand-gold transition-colors"
                    >
                      Browse All <FiArrowRight />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {tierProducts.map(product => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Categories;
