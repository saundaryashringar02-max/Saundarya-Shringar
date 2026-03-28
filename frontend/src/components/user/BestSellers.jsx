import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BestSellers = () => {
  const { products, loading } = useShop();

  // Filter or sort by best sellers (e.g., higher ratings/reviews)
  const bestSellers = [...products]
    .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
    .slice(0, 8);

  if (loading && products.length === 0) {
    return (
      <div className="py-10 bg-brand-pink/20 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  return (
    <section className="py-8 md:py-10 bg-brand-pink/20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-1 text-brand-dark uppercase tracking-wide">Our Best Sellers</h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="pb-8"
        >
          {bestSellers.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-6 text-center">
          <Link to="/shop?sort=Top Rated" className="inline-block border-2 border-brand-dark text-brand-dark px-10 py-3 rounded-none text-[10px] font-black uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all duration-300 shadow-xl active:scale-95">
            View All Bestsellers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
