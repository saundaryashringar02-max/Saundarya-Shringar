import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

const Categories = () => {
  const { categories, loading } = useShop();

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
    <section className="py-6 md:py-8 bg-brand-light">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-1 text-brand-dark uppercase tracking-wide">Shop by Category</h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-2">
          {categories.map((cat, index) => (
            <Link
              to={`/shop?category=${cat.name}`}
              key={cat._id || index}
              className="flex flex-col items-center group cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-2 border-2 border-transparent group-hover:border-brand-gold transition-all duration-300 shadow-sm hover:shadow-md">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-[10px] md:text-xs font-bold text-brand-dark group-hover:text-brand-gold transition-colors text-center uppercase tracking-wider leading-tight">
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
