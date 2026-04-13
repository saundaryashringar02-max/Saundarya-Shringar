import React from 'react';
import { motion } from 'framer-motion';

import blogFloating1 from '../../assets/images/blog_floating_1.png';
import blogFloating2 from '../../assets/images/blog_floating_2.png';
import blogFloating3 from '../../assets/images/blog_floating_3.png';
import blogFloating4 from '../../assets/images/blog_floating_4.png';
import insta1 from '../../assets/images/insta_1.png';
import insta2 from '../../assets/images/insta_2.png';
import insta3 from '../../assets/images/insta_3.png';
import insta4 from '../../assets/images/insta_4.png';
import catSkincare from '../../assets/images/cat_skincare.png';
import catWellness from '../../assets/images/cat_wellness.png';
import promoImage from '../../assets/images/promo.png';

const floatingImages = [
  { src: blogFloating1, size: 'w-20 h-28 md:w-36 md:h-48', top: '10%', left: '8%', delay: 0 },
  { src: blogFloating2, size: 'w-18 h-24 md:w-32 md:h-44', top: '22%', left: '22%', delay: 1 },
  { src: blogFloating3, size: 'w-24 h-32 md:w-40 md:h-52', top: '5%', left: '40%', delay: 0.5 },
  { src: blogFloating4, size: 'w-20 h-28 md:w-36 md:h-48', top: '18%', left: '60%', delay: 1.5 },
  { src: insta1, size: 'w-18 h-24 md:w-32 md:h-44', top: '10%', left: '78%', delay: 0.2 },
  { src: insta2, size: 'w-20 h-28 md:w-34 md:h-46', top: '48%', left: '10%', delay: 0.8 },
  { src: insta3, size: 'w-24 h-32 md:w-40 md:h-52', top: '55%', left: '42%', delay: 1.2 },
  { src: insta4, size: 'w-18 h-24 md:w-32 md:h-44', top: '52%', left: '72%', delay: 0.4 },
];

const visionPoints = [
  'Exceptional product quality',
  'Seamless digital shopping experiences',
  'Strong customer relationships',
];

const missionPoints = [
  'Offer carefully curated, high-quality products',
  'Ensure reliable and efficient delivery experiences',
  'Build long-term trust through transparency',
  'Continuously improve through innovation and feedback',
  'Expand while maintaining Indian values and authenticity',
];

const differentiators = [
  'Quality First Approach - Every product is selected with care',
  'Customer-Centric Thinking - Your satisfaction drives everything we do',
  'Transparency & Trust - Clear policies and honest communication',
  'Growing Brand Vision - Built for long-term value',
];

const promisePoints = ['Smooth', 'Reliable', 'Delightful'];

const AboutSection = () => {
  return (
    <div className="w-full">
      {/* Top Floating Gallery Section */}
      <div className="relative w-full h-[400px] md:h-[600px] bg-brand-pink/20 overflow-hidden flex items-center justify-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-brand-pink/10 pointer-events-none"></div>
        
        {/* Floating Images */}
        <div className="absolute inset-0 z-10">
          {floatingImages.map((img, index) => (
            <motion.div
              key={index}
              className={`absolute ${img.size} rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-4 border-white/30`}
              style={{ top: img.top, left: img.left }}
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 6 + index % 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: img.delay 
              }}
            >
              <img src={img.src} alt="About context" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Section Heading Overlay (Optional, based on style) */}
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-decorative text-brand-dark drop-shadow-lg tracking-tighter italic"
            style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)' }}
          >
            Our Story
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Main Text Content */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-brand-pink text-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
            >
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              
              <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4 italic border-b border-white/20 pb-4">
                About Us
              </h2>
              <p className="text-sm md:text-base leading-relaxed opacity-90 font-medium tracking-wide">
                At Saundarya Shringar, beauty is more than appearance. It is confidence, culture, and
                individuality. We are an emerging Indian beauty and lifestyle brand offering thoughtfully
                curated products with a seamless, trustworthy shopping experience.
              </p>
              <p className="text-sm md:text-base leading-relaxed opacity-90 font-medium tracking-wide mt-4">
                From product selection to customer-first service, every detail is built on one promise:
                deliver quality you can trust and experiences you can cherish. We are a growing community
                that celebrates style, self-expression, and satisfaction.
              </p>
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-70">
                  Quality You Can Trust, Experiences You Can Cherish
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3"
            >
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-dark italic">
                Our Vision
              </h2>
              <ul className="text-gray-600 leading-relaxed font-inter space-y-2">
                {visionPoints.map((point) => (
                  <li key={point} className="flex gap-2 items-start">
                    <span className="text-brand-pink font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 leading-relaxed font-inter">
                We aim to inspire confidence and elegance in every customer while expanding our reach globally.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-2"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark italic">
                Our Mission
              </h2>
              <ul className="text-gray-600 leading-relaxed font-inter space-y-2">
                {missionPoints.map((point) => (
                  <li key={point} className="flex gap-2 items-start">
                    <span className="text-brand-pink font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-2"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark italic">
                What Makes Us Different
              </h2>
              <ul className="text-gray-600 leading-relaxed font-inter space-y-2">
                {differentiators.map((point) => (
                  <li key={point} className="flex gap-2 items-start">
                    <span className="text-brand-pink font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-2"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark italic">
                Our Promise
              </h2>
              <p className="text-gray-600 leading-relaxed font-inter">
                Every order is more than a transaction. It is a relationship built on trust.
              </p>
              <p className="text-gray-600 leading-relaxed font-inter">
                We are committed to making every experience smooth, reliable, and delightful.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {promisePoints.map((point) => (
                  <span
                    key={point}
                    className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-brand-pink/10 text-brand-dark border border-brand-pink/20"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Images with Labels */}
          <div className="w-full lg:w-[400px] lg:sticky lg:top-24 self-start space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
                <div className="bg-brand-pink/80 backdrop-blur-md px-6 py-1 rounded-full border border-white/30 shadow-sm">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white font-bold">
                    •• Skincare ••
                  </span>
                </div>
              </div>
              <img src={catSkincare} alt="Category Skincare" className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
                <div className="bg-brand-pink/80 backdrop-blur-md px-6 py-1 rounded-full border border-white/30 shadow-sm">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white font-bold">
                    •• Wellness ••
                  </span>
                </div>
              </div>
              <img src={catWellness} alt="Category Wellness" className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <div className="absolute top-4 left-0 right-0 z-10 flex justify-center">
                <div className="bg-brand-pink/80 backdrop-blur-md px-6 py-1 rounded-full border border-white/30 shadow-sm">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white font-bold">
                    •• Our Brand ••
                  </span>
                </div>
              </div>
              <img src={promoImage} alt="Saundarya Shringar Brand" className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
