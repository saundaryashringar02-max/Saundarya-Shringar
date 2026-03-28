import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

const offerProducts = [
  {
    id: 1,
    name: 'TIRTIR Mask Fit Red Cushion',
    price: 899,
    oldPrice: 1650,
    rating: 5,
    reviews: 1245,
    discount: '45%',
    image: imgTirtirRed,
    category: 'makeup',
    label: 'Big Drop'
  },
  {
    id: 103,
    name: 'Glow Vit-C Serum',
    price: 549,
    oldPrice: 1250,
    rating: 5,
    reviews: 450,
    discount: '56%',
    image: imgTirtirRed,
    category: 'skincare',
    label: 'Pocket Deal'
  },
  {
    id: 201,
    name: 'Oriental Silk Foundation',
    price: 799,
    oldPrice: 1899,
    rating: 5,
    reviews: 890,
    discount: '58%',
    image: imgLakmePowder,
    category: 'makeup',
    label: 'Mega Sale'
  },
  {
    id: 5,
    name: 'Verymiss Kiss Proof Trio',
    price: 399,
    oldPrice: 999,
    rating: 4,
    reviews: 856,
    discount: '60%',
    image: imgVerymiss,
    category: 'makeup',
    label: 'Super Budget'
  },
  {
    id: 6,
    name: 'Rose Gold Eyeshadow Palette',
    price: 649,
    oldPrice: 1550,
    rating: 5,
    reviews: 840,
    discount: '58%',
    image: imgRoseGold,
    category: 'makeup',
    label: 'Lowest Ever'
  },
  {
    id: 351,
    name: 'Bridal Radiance Kit',
    price: 999,
    oldPrice: 2800,
    rating: 5,
    reviews: 45,
    discount: '64%',
    image: imgRoseGold,
    category: 'beauty kits',
    label: 'Steal Price'
  },
  {
    id: 3,
    name: 'Dual Concealer Stick',
    price: 349,
    oldPrice: 899,
    rating: 5,
    reviews: 560,
    discount: '61%',
    image: imgTirtirConcealer,
    category: 'makeup',
    label: 'Budget Find'
  },
  {
    id: 401,
    name: 'Oud Majesty Perfume',
    price: 199,
    oldPrice: 450,
    rating: 5,
    reviews: 120,
    discount: '55%',
    image: imgLipGloss,
    category: 'fragrances',
    label: 'Daily Steal'
  }
];

const Offers = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 45,
    seconds: 0
  });

  useEffect(() => {
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
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-40">
           {/* Decorative background pattern or image could go here */}
           <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/20 to-brand-gold/20 mix-blend-overlay"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-[#FF9900] text-brand-dark font-black uppercase tracking-[0.4em] text-[8px] md:text-xs px-4 py-1.5 mb-8 shadow-[0_5px_30px_rgba(255,153,0,0.3)]"
          >
            Big Beauty Deals | Limited Time 
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, tracking: '0.2em' }}
            animate={{ opacity: 1, tracking: '-0.05em' }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-5xl md:text-9xl font-sans font-black text-white mb-6 uppercase leading-none drop-shadow-2xl"
          >
            Divine <br/> <span className="text-brand-gold underline decoration-brand-pink decoration-8 md:decoration-[16px] underline-offset-[10px] md:underline-offset-[20px]">SAVINGS</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-white text-lg md:text-3xl font-sans font-black mb-10 tracking-tight"
          >
            Up to <span className="text-brand-gold">50% OFF</span> | Starting at <span className="text-brand-pink">₹199</span>
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

      {/* Offers Grid */}
      <main className="container mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-wide">
                Active <span className="text-brand-pink">Curation</span>
              </h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                {offerProducts.length} Premium items on sale
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
               <div className="flex flex-col items-center justify-center bg-brand-dark text-white px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Offer Ends In</span>
                  <div className="flex gap-2 font-black text-sm">
                    <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                    <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                    <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
                  </div>
               </div>
               <div className="flex flex-col items-center justify-center bg-[#5C2E3E]/5 text-[#5C2E3E] px-4 py-2 rounded-xl border border-[#5C2E3E]/10">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Cashback Offer</span>
                  <span className="text-sm font-black">Flat 15% CBC</span>
               </div>
               <div className="flex flex-col items-center justify-center bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-xl border border-brand-gold/10">
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Today's Perk</span>
                  <span className="text-sm font-black">Free Delivery</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {offerProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="group relative">
                  {/* Custom Discount Badge for Offers Page */}
                  <div className="absolute top-4 right-4 z-20 bg-brand-pink text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                    {product.discount} OFF
                  </div>
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Special Offer Banner */}
      <section className="container mx-auto px-4 md:px-8 mt-20">
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
      </section>
    </div>
  );
};

export default Offers;
