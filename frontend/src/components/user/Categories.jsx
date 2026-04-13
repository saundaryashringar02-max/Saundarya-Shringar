import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

const Categories = () => {
  const { categories, loading } = useShop();
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading && categories.length === 0) {
    return (
      <div className="py-8 bg-brand-light">
        <div className="container mx-auto px-4 flex justify-center gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-6 md:py-8 bg-brand-light group/cat">
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-1 text-brand-dark uppercase tracking-wide">Shop by Category</h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
        </motion.div>

        {/* Scroll Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 top-[60%] -translate-y-1/2 z-30 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-white transition-all duration-300 opacity-0 group-hover/cat:opacity-100 hidden md:flex border border-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 top-[60%] -translate-y-1/2 z-30 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-gold hover:text-white transition-all duration-300 opacity-0 group-hover/cat:opacity-100 hidden md:flex border border-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide no-scrollbar snap-x snap-mandatory"
        >
          {categories.map((cat, index) => (
            <Link
              to={`/shop?category=${cat.name}`}
              key={cat._id || index}
              className="flex-shrink-0 flex flex-col items-center group cursor-pointer snap-start first:pl-2 last:pr-2 sm:first:pl-0 sm:last:pr-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-2 border-2 border-transparent group-hover:border-brand-gold transition-all duration-300 shadow-sm hover:shadow-md">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-[10px] md:text-sm font-bold text-brand-dark group-hover:text-brand-gold transition-colors text-center uppercase tracking-wider leading-tight max-w-[80px] md:max-w-[120px]">
                  {cat.name}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
