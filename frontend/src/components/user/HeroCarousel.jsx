import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import logo from '../../assets/images/logo.png';
import logoPink from '../../assets/images/logo_pink.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroCarousel = () => {
  const { banners, loading } = useShop();

  const dynamicSlides = banners.filter(b => b.type === 'Main Slider').length > 0
    ? banners.filter(b => b.type === 'Main Slider')
    : banners.slice(0, 5);

  const appPromoSlide = {
    _id: 'app-promo-custom',
    title: 'Beauty At Your\nFingertips',
    subtitle: 'DOWNLOAD OUR APP',
    type: 'AppPromo',
    image: '', // No background image, we'll use a custom background
    link: '#',
    isAppPromo: true
  };

  const mainSlides = [...dynamicSlides, appPromoSlide];

  if (loading && banners.length === 0) {
    return <div className="w-full h-[450px] md:h-[500px] bg-gray-100 animate-pulse" />;
  }

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] md:h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={mainSlides.length > 1}
        className="h-full w-full"
      >
        {mainSlides.map((slide, index) => (
          <SwiperSlide key={slide._id || index}>
            <div className={`relative h-full w-full overflow-hidden flex items-center ${slide.isAppPromo ? 'bg-gradient-to-r from-brand-dark to-[#4A2226]' : 'bg-white'}`}>
              {!slide.isAppPromo ? (
                <>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover transform scale-105 transition-transform duration-[10000ms] linear opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent z-10" />
                </>
              ) : (
                <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                  <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[100%] bg-brand-gold/10 rounded-full blur-[100px]" />
                  <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[60%] bg-brand-pink/10 rounded-full blur-[80px]" />
                </div>
              )}

              <div className={`container mx-auto px-4 md:px-20 lg:px-32 relative z-20 h-full flex flex-row items-center justify-between py-4 md:py-0`}>
                <motion.div
                  initial={{ opacity: 0, x: slide.isAppPromo ? 0 : -50, y: 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 1 }}
                  className={`${slide.isAppPromo ? 'w-[60%] text-left' : 'max-w-xl text-left'} ${slide.isAppPromo ? 'text-white' : 'text-brand-dark'} drop-shadow-sm`}
                >
                  <div className={`flex flex-col gap-1 md:gap-4 items-start px-0 md:p-0`}>
                    {slide.isAppPromo && (
                      <span className="bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2">
                        {slide.subtitle}
                      </span>
                    )}
                    <h2 className={`text-xl sm:text-2xl md:text-5xl lg:text-6xl font-serif font-black tracking-tighter leading-[1.1] mb-1 italic ${slide.isAppPromo ? 'text-white' : 'text-brand-dark'} whitespace-pre-line`}
                      style={{ fontFamily: slide.isAppPromo ? "'Cinzel Decorative', serif" : "'Cinzel', serif", textShadow: slide.isAppPromo ? 'none' : '2px 2px 4px rgba(255,255,255,0.8)' }}>
                      {slide.title}
                    </h2>

                    {!slide.isAppPromo && (
                      <p className="text-sm md:text-lg lg:text-xl font-serif font-black text-brand-dark uppercase tracking-[0.2em]"
                        style={{ fontFamily: "'Cinzel', serif", textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
                        {slide.subtitle || 'Premium Selection for You'}
                      </p>
                    )}

                    {slide.isAppPromo ? (
                      <p className="hidden sm:block text-[10px] md:text-base text-white/70 max-w-[200px] md:max-w-md font-sans mb-2">
                        Download the Saundarya Shringar app for a faster shopping experience.
                      </p>
                    ) : (
                      <div className="flex items-center justify-start gap-4 mb-4 mt-2 text-[9px] md:text-xs font-serif font-black text-brand-dark uppercase tracking-[0.2em]">
                        <span>Wide Selection</span>
                        <div className="h-4 w-[2px] bg-brand-dark/20" />
                        <span>Top Brands</span>
                      </div>
                    )}

                    {slide.isAppPromo ? (
                      <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-4 items-start">
                        {/* Google Play Button */}
                        <a
                          href="https://play.google.com/store/search?q=Saundarya+Shringar&c=apps"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-105 transition-transform"
                        >
                          <svg width="100" height="30" mdWidth="130" mdHeight="40" viewBox="0 0 216 64" className="w-[85px] sm:w-[100px] md:w-[130px] h-auto">
                            <rect width="216" height="64" rx="8" fill="#000" stroke="#333" strokeWidth="1" />
                            {/* Realistic Google Play Icon */}
                            <g transform="translate(20, 12) scale(1.1)">
                              <path d="M1.3,1.6c-0.2,0.2-0.3,0.6-0.3,1v23.4c0,0.4,0.1,0.8,0.3,1l0.1,0.1L14.1,14.6v-0.2L1.4,1.5L1.3,1.6z" fill="#3bccff" />
                              <path d="M18.1,18.6L14.1,14.5v-0.2l4,4.1l0.1,0c1.2-0.7,2.1-1.9,2.1-3.3c0-1.4-0.9-2.6-2.1-3.3l-0.1,0l-4,4.1v0.2L18.1,18.6z" fill="#ffd400" />
                              <path d="M1.4,27.1c0.4,0.4,1,0.5,1.7,0.1l15.1-8.6l-4.1-4.1L1.4,27.1z" fill="#ff3333" />
                              <path d="M1.4,1.5l12.7,12.6l4.1-4.1L3.1,1.4C2.4,1,1.8,1.1,1.4,1.5z" fill="#48ff48" />
                            </g>
                            <text x="62" y="28" fill="#fff" fontSize="12" fontStyle="italic" opacity="0.8">GET IT ON</text>
                            <text x="62" y="48" fill="#fff" fontSize="20" fontWeight="bold">Google Play</text>
                          </svg>
                        </a>

                        {/* App Store Button */}
                        <a
                          href="#"
                          className="hover:scale-105 transition-transform"
                        >
                          <svg width="100" height="30" mdWidth="130" mdHeight="40" viewBox="0 0 216 64" className="w-[85px] sm:w-[100px] md:w-[130px] h-auto">
                            <rect width="216" height="64" rx="8" fill="#000" stroke="#333" strokeWidth="1" />
                            {/* Realistic Apple Icon */}
                            <path d="M42 34.1c-.1 4.7 4.1 6.9 4.3 7-.1.2-.7 2.2-2.2 4.4-1.3 1.9-2.6 3.8-4.8 3.8-2.1 0-2.8-1.3-5.2-1.3s-3.2 1.3-5.2 1.3c-2 0-3.5-2.1-4.8-4.1-2.7-3.9-4.8-11-2-15.8 1.4-2.4 3.8-3.9 6.4-3.9 2 0 3.9 1.4 5.1 1.4 1.1 0 3.5-1.7 6-1.4 1 .1 3.9.4 5.8 3.1-.1.1-3.5 2-3.4 5.7M37.8 23.1c1.1-1.4 1.9-3.3 1.7-5.3-1.7.1-3.7 1.1-4.9 2.6-1 1.2-2 3.1-1.8 5 1.9.1 3.8-1 5-2.3" fill="#fff" transform="translate(10, -5) scale(0.9)" />
                            <text x="62" y="28" fill="#fff" fontSize="12" fontStyle="italic" opacity="0.8">Download on the</text>
                            <text x="62" y="48" fill="#fff" fontSize="20" fontWeight="bold">App Store</text>
                          </svg>
                        </a>
                      </div>
                    ) : (
                      <Link
                        to={slide.link || '/shop'}
                        className="inline-block bg-[#FFD814] hover:bg-white text-brand-dark px-8 py-2.5 rounded-md text-[10px] md:text-sm font-bold shadow-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest w-fit mx-0"
                      >
                        Shop the Range
                      </Link>
                    )}
                  </div>
                </motion.div>

                {slide.isAppPromo && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="flex flex-1 items-center justify-end h-full"
                  >
                    <div className="relative group scale-[0.55] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 flex items-center justify-center mr-0 z-30">
                      {/* Realistic Smartphone Mockup */}
                      <div className="w-[180px] lg:w-[210px] aspect-[1/2.05] bg-[#0a0a0a] rounded-[45px] border-[8px] border-[#1a1a1a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] relative overflow-hidden transition-all duration-700 ring-2 ring-white/5">

                        {/* Speaker Grille */}
                        <div className="absolute top-0 left-0 w-full h-[35px] z-30 flex justify-center items-center">
                          <div className="w-[60px] h-[5px] bg-[#1a1a1a] rounded-full mx-1 shadow-inner" />
                          <div className="w-[10px] h-[10px] bg-[#0a0a0a] rounded-full mx-1 border border-white/5" />
                        </div>

                        <div className="absolute inset-[4px] bg-white rounded-[38px] overflow-hidden flex flex-col">
                          {/* Top Half: Cosmetic Background & Logo */}
                          <div className="relative h-[60%] w-full overflow-hidden flex flex-col items-center justify-center p-6 pt-10 bg-[#2A1416]">
                            {/* Background Image / Pattern */}
                            <div className="absolute inset-0 opacity-40">
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2A1416]" />
                              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-pink/20 via-transparent to-transparent" />
                            </div>

                            {/* Logo Circle */}
                            <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center p-3 shadow-2xl mb-2 mt-4 border-2 border-brand-gold/20">
                              <img src={logo} alt="S" className="w-full h-full object-contain" />
                            </div>

                            {/* Brand Name */}
                            <div className="relative z-10 text-center">
                              <h3 className="text-white text-base font-serif font-black uppercase tracking-[0.2em]" style={{ fontFamily: "'Cinzel', serif" }}>Saundarya</h3>
                              <p className="text-brand-gold text-[8px] tracking-[0.4em] uppercase font-bold">Shringar</p>
                            </div>
                          </div>

                          {/* Bottom Half: Welcome Section with Curve */}
                          <div className="relative flex-1 bg-white mt-[-10px] rounded-t-[40px] z-20 flex flex-col items-center px-6 pt-10 pb-6 text-center shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
                            <h2 className="text-xl font-serif font-black text-brand-dark mb-2 tracking-tighter" style={{ fontFamily: "'Cinzel', serif" }}>WELCOME</h2>
                            <p className="text-[9px] text-gray-500 font-medium leading-relaxed mb-8 max-w-[160px]">
                              Discover your inner radiance with our premium collection of divine cosmetics.
                            </p>

                            <div className="w-full space-y-3">
                              <div className="w-full bg-brand-dark text-white py-3 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg">
                                Login
                              </div>
                              <div className="w-full border border-gray-200 text-brand-dark py-3 rounded-full text-[9px] font-bold uppercase tracking-widest bg-white">
                                Sign Up
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Reflections/Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-40" />
                      </div>

                      {/* Side Buttons */}
                      <div className="absolute top-[80px] -left-[10px] w-[3px] h-[40px] bg-[#1a1a1a] rounded-l-md" />
                      <div className="absolute top-[130px] -right-[10px] w-[3px] h-[60px] bg-[#1a1a1a] rounded-r-md" />

                      {/* Floating brand icon near the phone */}
                      <div className="absolute -right-6 bottom-20 bg-white p-2 rounded-2xl shadow-2xl animate-bounce z-50 flex items-center justify-center border border-gray-100 w-12 h-12">
                        <img src={logo} alt="S" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
