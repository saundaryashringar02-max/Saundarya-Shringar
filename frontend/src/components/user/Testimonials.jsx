import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, FreeMode } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import api from '../../utils/api';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const rotations = ['-rotate-6', 'rotate-6', '-rotate-4', 'rotate-8', '-rotate-8'];

const Testimonials = () => {
  const [dynamicTestimonials, setDynamicTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/testimonials');
        setDynamicTestimonials(res.data.data.testimonials);
      } catch (err) {
        console.error('Testimonials fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="py-12 bg-[#FFF0F3] overflow-hidden relative">
      {/* Enhanced Boutique Background with Pink Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-45"
        style={{
          backgroundImage: `url('/testi_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F3]/70 via-transparent to-[#FFF0F3]/70 z-0 pointer-events-none"></div>

      {/* Bolder Wavy String (SVG) - Positioned Behind Clips at Top */}
      <div className="absolute top-[145px] sm:top-[165px] md:top-[185px] left-0 w-full z-5 opacity-100 pointer-events-none">
        <svg viewBox="0 0 1440 100" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50"
            stroke="#64748B"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 relative z-10"
        >
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-1 text-brand-dark uppercase tracking-wide">Customer Stories</h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
        </motion.div>

        <Swiper
          modules={[Navigation, Autoplay, FreeMode]}
          spaceBetween={40}
          slidesPerView="auto"
          centeredSlides={false}
          loop={true}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.5,
            momentumVelocityRatio: 0.5,
            sticky: false
          }}
          onSwiper={setSwiperInstance}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="testimonials-swiper !overflow-visible"
        >
          {dynamicTestimonials.map((item, index) => (
            <SwiperSlide key={item._id} className="!w-auto">
              <div className="flex flex-col items-center pt-4 pb-6 px-0">
                <div className="relative z-30 -mb-5 scale-90">
                  <div className="w-6 h-8 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4.5 h-4.5 border-[1.5px] border-gray-400 rounded-sm rotate-45 transform origin-center"></div>
                    <div className="absolute bottom-1 left-0 w-full h-2.5 bg-[#FDF6E3] border border-gray-200 rounded-sm shadow-sm z-10"></div>
                  </div>
                </div>

                <div className={`bg-[#FDF6E3] p-1.5 shadow-xl ${rotations[index % rotations.length]} w-[200px] md:w-[240px] transition-all duration-700 hover:rotate-0 hover:scale-105 cursor-pointer border border-brand-pink/5`}>
                  <div className="bg-[#FDF6E3] p-0 shadow-sm mb-0 aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale-[5%] hover:grayscale-0 transition-all duration-1000"
                    />
                  </div>

                  <div className="bg-[#FEECF0] p-3.5 text-left min-h-[80px] md:min-h-[100px]">
                    <h4 className="font-serif font-bold text-sm md:text-base text-[#822143] mb-1 leading-tight uppercase">
                      {item.name}
                    </h4>

                    <p className="text-[#a1687c] text-[10px] md:text-[11px] leading-relaxed font-medium line-clamp-3">
                      "{item.text}"
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          onClick={() => swiperInstance?.slidePrev()}
          className="swiper-button-prev-custom absolute left-2 md:-left-4 top-[55%] -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-brand-gold shadow-2xl border border-brand-gold/30 hover:bg-brand-gold hover:text-white transition-all duration-300 active:scale-95 pointer-events-auto"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="swiper-button-next-custom absolute right-2 md:-right-4 top-[55%] -translate-y-1/2 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-brand-gold shadow-2xl border border-brand-gold/30 hover:bg-brand-gold hover:text-white transition-all duration-300 active:scale-95 pointer-events-auto"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      <style>{`
        .testimonials-swiper {
          padding-top: 20px;
          padding-bottom: 40px;
        }
        .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
