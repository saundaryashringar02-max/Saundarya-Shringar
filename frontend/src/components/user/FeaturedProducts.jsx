import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

const FeaturedProducts = () => {
  const { products, loading } = useShop();

  // Reverse the global catalog to always promote the newest created backend products first
  const featured = [...products].reverse().slice(0, 8);

  if (loading && products.length === 0) {
    return (
      <div className="py-8 bg-brand-pink/10 h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  return (
    <section className="py-8 bg-brand-pink/10">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-1 text-brand-dark uppercase tracking-wide">Featured Products</h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/shop" className="inline-block border-2 border-brand-dark text-brand-dark px-10 py-3 rounded-none text-[10px] font-black uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all duration-300 shadow-xl active:scale-95">
            Explore All Creations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
