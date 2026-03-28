import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap, FiClock } from 'react-icons/fi';

// Import New Generated Assets
import offerMakeup from '../../assets/images/offer_makeup.png';
import offerJewellery from '../../assets/images/offer_jewellery.png';
import offerSkincare from '../../assets/images/offer_skincare.png';
import offerSoaps from '../../assets/images/offer_soaps.png';

const RunningSaleTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 12, s: 45 });

  useEffect(() => {
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
    <div className="flex items-center gap-1.5 bg-[#FFD814] text-brand-dark px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest animate-pulse shadow-md">
      <FiClock className="w-2.5 h-2.5" />
      Ends in: {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
    </div>
  );
};

const offers = [
  {
    id: 1,
    title: 'Makeup Artistry',
    subtitle: 'Flat 50% Off on Lipsticks',
    image: offerMakeup,
    link: '/shop?category=Makeup',
    tag: 'Trending Now'
  },
  {
    id: 2,
    title: 'Jewellery Sale',
    subtitle: 'Starting @ ₹199 only',
    image: offerJewellery,
    link: '/shop?category=Jewellery',
    tag: 'Limited Stock'
  },
  {
    id: 3,
    title: 'Skincare Deals',
    subtitle: 'Buy 2 Get 1 Free',
    image: offerSkincare,
    link: '/shop?category=Skincare',
    tag: 'Best Seller'
  },
  {
    id: 4,
    title: 'Bath & Body',
    subtitle: 'Starting @ ₹50',
    image: offerSoaps,
    link: '/shop?category=Soaps',
    tag: 'Running Sale',
    hasTimer: true
  }
];

const TrendingOffers = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-xl md:text-2xl font-serif font-bold mb-1 text-brand-dark uppercase tracking-wide">Trending Offers</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100"
            >
              <Link to={offer.link} className="block relative aspect-[5/6] overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Top Badge: Timer */}
                {offer.hasTimer && (
                  <div className="absolute top-4 right-4 z-30">
                    <RunningSaleTimer />
                  </div>
                )}
                
                {/* Minimalist Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                   <span className="bg-[#FFD814] text-brand-dark text-[8px] font-black px-3 py-1 rounded-sm w-fit mb-3 uppercase tracking-widest shadow-lg">
                      {offer.tag}
                   </span>
                   <h3 className="text-white font-serif font-black text-xl md:text-2xl mb-1 leading-tight group-hover:text-[#FFD814] transition-colors">
                      {offer.title}
                   </h3>
                   <p className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-none">
                      {offer.subtitle}
                   </p>
                   
                   <div className="w-0 group-hover:w-full h-[2px] bg-[#FFD814] transition-all duration-500 mt-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-brand-pink font-black uppercase tracking-widest text-[10px] md:text-xs border-b-2 border-brand-pink/20 hover:border-brand-pink transition-all pb-1 mx-auto">
             Discover All Deals <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingOffers;
