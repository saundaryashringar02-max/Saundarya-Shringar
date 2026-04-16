import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPercent } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { useShop } from '../../context/ShopContext';

// Assets (re-using some from Shop.jsx or general ones)
import imgTirtirRed from '../../assets/products/tirtir_red_cushion.png';
import imgTirtirConcealer from '../../assets/products/tirtir_concealer_stick.png';
import imgCatkin from '../../assets/products/catkin_oriental_lipstick.png';
import imgVerymiss from '../../assets/products/verymiss_lipstick_set.png';
import imgRoseGold from '../../assets/products/rose_gold_eyeshadow_palette.png';
import imgLakmePowder from '../../assets/products/lakme_face_powder.png';
import imgLipGloss from '../../assets/products/plumping_lip_gloss.png';
import imgMascara from '../../assets/products/volumizing_mascara.png';

// offerProducts mock data removed. Now fully dynamic.
import api from '../../utils/api';

const Offers = () => {
  const { products, loading } = useShop();
  const [coupons, setCoupons] = useState([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

  // Filter products with discounts for offers
  const offerProducts = products.filter(p => p.discount || p.flashSale).slice(0, 8);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 45,
    seconds: 0
  });

  const fetchAvailableCoupons = async () => {
    try {
      const res = await api.get('/coupons/public');
      setCoupons(res.data.data.coupons.filter(c => c.isActive));
    } catch (err) {
      console.error("Failed to fetch divine offers:", err);
    } finally {
      setLoadingCoupons(false);
    }
  };

  useEffect(() => {
    fetchAvailableCoupons();
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FEFAF6] pb-20">
      {/* Premium Hero Section */}
      <section className="relative h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-40">
          {/* Decorative background pattern or image could go here */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/20 to-brand-gold/20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-[#FF9900] text-brand-dark font-black uppercase tracking-[0.3em] text-[7px] md:text-[9px] px-3 py-1 md:mb-4 shadow-xl"
          >
            Big Beauty Deals | Limited Time
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, tracking: '0.2em' }}
            animate={{ opacity: 1, tracking: '-0.05em' }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-4xl md:text-6xl font-sans font-black text-white mb-3 uppercase leading-none drop-shadow-2xl"
          >
            Divine <br /> <span className="text-brand-gold underline decoration-brand-pink decoration-4 md:decoration-[8px] underline-offset-[8px] md:underline-offset-[12px]">SAVINGS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-lg font-sans font-black mb-5 tracking-tight text-white/90"
          >
            Up to <span className="text-brand-gold">50% OFF</span> | Starting at <span className="text-brand-pink">₹200</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-[10px]">
              <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" /> Wide Selection
            </div>
            <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-[10px]">
              <div className="w-1.5 h-1.5 bg-brand-pink rounded-full" /> Top Brands
            </div>
            <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-[10px]">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Fast Delivery
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promo Codes Section */}
      <section className="container mx-auto px-4 md:px-8 mt-6">
        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 -translate-y-16 translate-x-16 rotate-45" />
          <h2 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest mb-1 flex items-center gap-3">
            <FiPercent className="text-brand-pink" /> Promo Architect
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mb-4">Copy & Apply at checkout for instant divinity</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loadingCoupons ? coupons.map(coupon => (
              <motion.div
                key={coupon._id}
                whileHover={{ y: -5 }}
                className="bg-brand-light/10 border border-brand-pink/5 rounded-2xl p-4 flex items-center justify-between group overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold" />
                <div>
                  <h3 className="text-xl font-black text-brand-dark tracking-tight">{coupon.code}</h3>
                  <p className="text-[9px] font-black text-brand-pink uppercase tracking-widest mt-1">
                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} FLAT OFF`}
                  </p>
                  <p className="text-[8px] text-gray-400 font-serif italic mt-2">
                    Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(coupon.code);
                    alert("Promo Code Transmitted to Clipboard.");
                  }}
                  className="bg-brand-dark text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-black transition-all shadow-xl shadow-brand-dark/20"
                >
                  Copy Code
                </button>
              </motion.div>
            )) : (
              [1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-50 rounded-2xl animate-pulse" />)
            )}
            {!loadingCoupons && coupons.length === 0 && (
              <div className="col-span-full py-4 text-center text-gray-300 font-black uppercase text-[10px] tracking-widest italic border border-dashed border-gray-100 rounded-2xl">
                No active promo architect found at this moment
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <main className="container mx-auto px-4 md:px-8 mt-6 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-2xl p-4 md:p-6 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-lg md:text-xl font-serif font-black text-brand-dark uppercase tracking-wide">
                Active <span className="text-brand-pink">Curation</span>
              </h2>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                {offerProducts.length} Premium items on sale
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              <div className="flex flex-col items-center justify-center bg-brand-dark text-white px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                <span className="text-[7px] font-black uppercase tracking-widest opacity-60">Offer Ends In</span>
                <div className="flex gap-1.5 font-bold text-xs uppercase">
                  <span>{String(timeLeft.hours).padStart(2, '0')}H</span>
                  <span>{String(timeLeft.minutes).padStart(2, '0')}M</span>
                  <span>{String(timeLeft.seconds).padStart(2, '0')}S</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-brand-pink/5 text-brand-pink px-3 py-1.5 rounded-lg border border-brand-pink/10">
                <span className="text-[7px] font-black uppercase tracking-widest opacity-60">Cashback Offer</span>
                <span className="text-xs font-black">15% CBC</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-brand-gold/10 text-brand-gold px-3 py-1.5 rounded-lg border border-brand-gold/10">
                <span className="text-[7px] font-black uppercase tracking-widest opacity-40">Today's Perk</span>
                <span className="text-xs font-black">Free Delivery</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {offerProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="group relative">
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Special Offer Banner */}
      <section className="container mx-auto px-4 md:px-8 mt-12">
        <div className="bg-brand-pink/5 border border-brand-pink/10 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl"></div>

          <div className="flex-1 text-center md:text-left relative z-10">
            <span className="text-brand-gold font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Membership Perk</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-dark mb-6 leading-tight">
              Join the <span className="text-brand-pink">Glow Circle</span> <br />
              for Extra 10% Off
            </h2>
            <p className="text-gray-500 text-sm md:text-base mb-10 font-medium leading-relaxed max-w-lg">
              Become a member today and unlock exclusive access to private sales, early launches, and a permanent 10% discount on all orders.
            </p>
            <button className="bg-brand-dark text-white px-10 py-4 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-gold transition-all shadow-xl active:scale-95">
              Sign Up For Glow
            </button>
          </div>

          <div className="w-full md:w-1/3 aspect-square bg-white rounded-2xl shadow-2xl p-4 flex items-center justify-center relative overflow-hidden group">
            <img
              src={imgRoseGold}
              alt="Membership Gift"
              className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-[10px] font-black tracking-widest uppercase border border-white/40 px-6 py-2">Welcome Gift</span>
            </div>
          </div>
        </div>
         <div className="bg-brand-pink/5 border border-brand-pink/10 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl"></div>
            
            <div className="flex-1 text-center md:text-left relative z-10">
               <span className="text-brand-gold font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Membership Perk</span>
               <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-dark mb-6 leading-tight">
                  Join the <span className="text-brand-pink">Glow Circle</span> <br /> 
                  for Extra 10% Off
               </h2>
               <p className="text-gray-500 text-sm md:text-base mb-10 font-medium leading-relaxed max-w-lg">
                  Become a member today and unlock exclusive access to private sales, early launches, and a permanent 10% discount on all orders.
               </p>
               <button className="bg-brand-dark text-white px-10 py-4 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-gold transition-all shadow-xl active:scale-95">
                  Sign Up For Glow
               </button>
            </div>
            
            <div className="w-full md:w-1/3 aspect-square bg-white rounded-2xl shadow-2xl p-4 flex items-center justify-center relative overflow-hidden group">
               <img 
                 src={offerProducts[0]?.image || '/placeholder.jpg'} 
                 alt="Membership Gift" 
                 className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[10px] font-black tracking-widest uppercase border border-white/40 px-6 py-2">Welcome Gift</span>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Offers;
