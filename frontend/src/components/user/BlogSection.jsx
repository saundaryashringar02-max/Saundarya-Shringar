import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useSearchParams } from 'react-router-dom';
import api from '../../utils/api';
import blogFloating1 from '../../assets/images/blog_floating_1.png';
import blogFloating2 from '../../assets/images/blog_floating_2.png';
import blogFloating3 from '../../assets/images/blog_floating_3.png';
import blogFloating4 from '../../assets/images/blog_floating_4.png';
import blogItem1 from '../../assets/images/blog_item_1.png';
import blogItem2 from '../../assets/images/blog_item_2.png';
import blogItem3 from '../../assets/images/blog_item_3.png';

const blogs = [
  {
    id: 1,
    category: 'BRIDAL',
    title: 'Long-Lasting Bridal Glow',
    excerpt: 'Tips for makeup that lasts from ceremony to party.',
    content: "Your wedding day is a marathon, not a sprint. To ensure your bridal glow lasts from the first photo to the last dance, preparation is key. Start with a hydrating primer that creates a smooth canvas. Use thin layers of long-wear foundation, building coverage only where needed. Don't forget to set your T-zone with a translucent powder and finish with a high-performance setting spray. Carrying a touch-up kit with blotting papers and your lipstick is the final secret to staying flawless all night.",
    image: blogItem1,
    date: 'MAR 15',
    readTime: '5M'
  },
  {
    id: 2,
    category: 'COLOR',
    title: 'Finding Your Perfect Red',
    excerpt: 'Red lipstick is the ultimate power move.',
    content: "Finding the perfect red lipstick is like finding the perfect pair of jeans—it changes everything. The secret lies in your undertones. If you have cool undertones, look for blue-based reds like classic crimson. For warm undertones, orange-based reds like poppy or brick will make your skin sing. Neutral undertones can pull off almost anything, including deep berries. Remember, confidence is the best accessory to any red lip. Swipe it on and own the room.",
    image: blogItem2,
    date: 'MAR 10',
    readTime: '4M'
  },
  {
    id: 3,
    category: 'DAILY',
    title: '5-Minute Everyday Makeup',
    excerpt: 'Effortless beauty tips for busy mornings.',
    content: "You don't need an hour to look put-together. Our 5-minute routine focuses on 'enhancing, not concealing'. Start with a tinted moisturizer for a healthy base. Swipe a cream blush on your cheeks and lids for a monochrome glow. Add two coats of mascara to open up the eyes, and finish with a tinted lip oil. This routine is designed for the modern woman who values her time as much as her radiance. Simple, effective, and beautiful.",
    image: blogItem3,
    date: 'MAR 05',
    readTime: '3M'
  },
  {
    id: 4,
    category: 'SKINCARE',
    title: 'The Art of Layering Serum',
    excerpt: 'Maximize your skincare results with correct timing.',
    content: "Skincare is science, and the order of operations matters. Always apply products from thinnest to thickest consistency. Start with watery essences, followed by active serums like Vitamin C or Retinol. Emulsions come next, followed by your moisturizer. The final step is always SPF during the day or an oil at night. This layering technique ensures each active ingredient can penetrate the skin effectively without being blocked by heavier molecules.",
    image: blogFloating4,
    date: 'FEB 28',
    readTime: '6M'
  },
  {
    id: 5,
    category: 'WELLNESS',
    title: 'Beauty Sleep: Not Just a Myth',
    excerpt: 'How quality rest transforms your complexion.',
    content: "While you sleep, your skin goes into repair mode. Growth hormones stimulate cell regeneration, and blood flow increases to the skin, delivering oxygen and nutrients. Lack of sleep spikes cortisol levels, leading to inflammation and breakouts. To maximize your beauty sleep, maintain a consistent schedule, sleep on a silk pillowcase to reduce friction, and use a nourishing night cream. Rest is the most powerful skincare product in your cabinet.",
    image: blogFloating3,
    date: 'FEB 20',
    readTime: '4M'
  },
  {
    id: 6,
    category: 'TIPS',
    title: 'Cleaning Your Makeup Brushes',
    excerpt: 'Protect your skin by keeping tools sanitary.',
    content: "Dirty brushes are a breeding ground for bacteria, which can cause breakouts and irritation. You should deep clean your foundation and concealer brushes at least once a week, and powder brushes every two weeks. Use a gentle brush cleanser or baby shampoo. Swirl the bristles in your palm, rinse under lukewarm water (avoiding the ferrule), and lay flat to dry. Clean tools not only protect your skin but also ensure a smoother, more professional application.",
    image: blogFloating1,
    date: 'FEB 12',
    readTime: '3M'
  },
  {
    id: 7,
    category: 'TIPS',
    title: 'Sunscreen Under Makeup',
    excerpt: 'The non-negotiable step for youthful skin.',
    content: "Sunscreen is the best anti-aging product you can use. To layer it under makeup without pilling, choose a lightweight, gel-based SPF. Apply it after your moisturizer and wait 2-3 minutes for it to fully set. Then, apply your primer or foundation. Never mix SPF directly into your foundation as it dilutes the protection level. Reapply over makeup throughout the day using an SPF-powder or mist to maintain defense.",
    image: blogFloating4,
    date: 'FEB 10',
    readTime: '4M'
  },
  {
    id: 8,
    category: 'TIPS',
    title: 'Correcting Dark Circles',
    excerpt: 'Use color theory for a wide-awake look.',
    content: "If your concealer looks gray, you need a color corrector. For dark circles with blue/purple undertones, use a peach or orange corrector first. Apply only where it is dark, blend, and then follow with your skin-tone concealer. This neutralizes the darkness rather than just covering it. Set with a fine powder to prevent creasing and enjoy a bright, rested appearance all day.",
    image: blogFloating2,
    date: 'FEB 05',
    readTime: '5M'
  },
  {
    id: 9,
    category: 'TIPS',
    title: 'Overnight Lip Repair',
    excerpt: 'Wake up to soft, supple lips every morning.',
    content: "Lips don't have sweat or oil glands, making them prone to dryness. For an overnight repair, exfoliate gently with a sugar scrub, followed by a thick layer of a lip mask or organic balm. For extra repair, apply a drop of hyaluronic acid serum to damp lips before sealing it in with balm. This deep hydration treatment works while you sleep to heal cracks and restore volume.",
    image: blogFloating3,
    date: 'JAN 28',
    readTime: '3M'
  },
];

const BlogSection = () => {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('category');

  const [dynamicBlogs, setDynamicBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blogs');
        setDynamicBlogs(res.data.data.blogs);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = catParam
    ? dynamicBlogs.filter(b => b.category.toLowerCase() === catParam.toLowerCase())
    : dynamicBlogs;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBlog]);

  const displayedBlogs = showAll ? filteredBlogs : filteredBlogs.slice(0, 3);
  const isTipsPage = catParam?.toLowerCase() === 'tips';
  const floatingSizeClasses = "w-14 md:w-44 h-14 md:h-44 overflow-hidden bg-white p-1 md:p-3 shadow-2xl border border-gray-100 flex items-center justify-center";

  return (
    <section className="pt-6 md:pt-10 pb-12 md:pb-24 bg-[#FEFAF6] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">

        {/* COMPACT JOURNAL HERO - EXACT TYPOGRAPHY MATCH */}
        <div className="relative mb-6 md:mb-10 text-center pt-0 max-w-5xl mx-auto">

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-pink font-bold uppercase tracking-[0.6em] text-[8px] md:text-[11px] block mb-1 md:mb-2"
          >
            SAUNDARYA SHRINAGAR
          </motion.span>

          {/* TOP IMAGES */}
          <div className="relative h-10 md:h-16 flex justify-between px-8 md:px-20 mb-2 md:mb-3">
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [-8, -6, -8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className={`${floatingSizeClasses} transform -rotate-8`}
            >
              <img src={blogFloating1} alt="Makeup" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0], rotate: [10, 8, 10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className={`${floatingSizeClasses} transform rotate-10`}
            >
              <img src={blogFloating2} alt="Cosmetics" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* CENTRAL HEADING - High Contrast Serif - Clean Transparent Look */}
          <div className="relative w-full flex justify-center items-center py-2 md:py-4 my-1 md:my-2">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-decorative text-[1.8rem] md:text-[5rem] font-black text-[#5C2E3E] leading-none tracking-[0.05em] relative z-10 uppercase"
            >
              {isTipsPage ? 'BEAUTY TIPS' : 'JOURNAL'}
            </motion.h2>
          </div>

          {/* BOTTOM IMAGES */}
          <div className="relative h-10 md:h-16 flex justify-between px-12 md:px-32 mt-2 md:mt-3">
            <motion.div
              animate={{ y: [0, 6, 0], rotate: [6, 8, 6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className={`${floatingSizeClasses} transform rotate-6`}
            >
              <img src={blogFloating3} alt="Brushes" className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0], rotate: [-4, -2, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className={`${floatingSizeClasses} transform -rotate-4`}
            >
              <img src={blogFloating4} alt="Skincare" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-sans tracking-[0.1em] text-[10px] md:text-lg mt-8 md:mt-10 px-8"
          >
            Stories of cosmetics, beauty, and the glam in-between.
          </motion.p>
          <div className="w-12 md:w-20 h-[1.5px] bg-brand-gold/20 mx-auto mt-8 md:mt-14"></div>
        </div>

        {/* COMPACT BLOG CARDS GRID */}
        {loading ? (
          <div className="py-20 text-center animate-pulse">
            <div className="w-10 h-10 border-4 border-brand-pink border-t-brand-gold rounded-full mx-auto mb-4 animate-spin"></div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest tracking-[0.4em]">Retrieving Journal...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {displayedBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                onClick={() => setSelectedBlog(blog)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col group cursor-pointer max-w-[280px] md:max-w-[320px] mx-auto w-full"
              >
                <div className="relative overflow-hidden mb-4 aspect-square bg-gray-50 shadow-lg border border-brand-pink/5">
                  <span className="absolute top-3 left-3 z-10 bg-brand-pink/90 text-brand-dark px-3 py-1 text-[7px] md:text-[8px] font-bold tracking-widest uppercase shadow-sm">
                    {blog.category}
                  </span>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2 px-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-[8px] md:text-[10px] font-bold tracking-widest uppercase">
                    <span>{blog.date}</span>
                    <span className="w-1 h-1 bg-brand-gold/20 rounded-full"></span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="text-sm md:text-xl font-serif font-bold text-[#5C2E3E] leading-snug group-hover:text-brand-gold transition-colors duration-300 uppercase tracking-tight">
                    {blog.title}
                  </h3>

                  <p className="text-gray-500 text-[11px] md:text-[14px] leading-relaxed font-sans opacity-70 line-clamp-2 px-2 md:px-0">
                    {blog.excerpt}
                  </p>

                  <div className="pt-2">
                    <button className="inline-flex items-center gap-1.5 text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase text-brand-dark group-hover:text-brand-gold transition-all duration-300 border-b border-brand-gold/10 group-hover:border-brand-gold pb-1">
                      READ STORY
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-16 md:mt-24">
          {!showAll && (
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand-dark text-white hover:bg-brand-gold px-12 py-4 rounded-none text-[10px] md:text-[11px] font-bold tracking-[0.5em] transition-all duration-300 shadow-xl border border-brand-dark hover:border-brand-gold uppercase"
            >
              VIEW ALL STORIES
            </motion.button>
          )}
          {showAll && (
            <motion.button
              onClick={() => setShowAll(false)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent text-brand-dark hover:text-brand-gold px-12 py-4 rounded-none text-[10px] md:text-[11px] font-bold tracking-[0.5em] transition-all duration-300 "
            >
              SHOW LESS
            </motion.button>
          )}
        </div>
      </div>

      {/* BLOG MODAL */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-brand-dark hover:bg-brand-pink transition-colors"
                aria-label="Close modal"
              >
                <IoClose size={24} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-3 text-brand-pink text-[10px] font-bold tracking-widest uppercase mb-4">
                  <span>{selectedBlog.category}</span>
                  <span className="w-1.5 h-1.5 bg-brand-gold/30 rounded-full"></span>
                  <span className="text-gray-400">{selectedBlog.date}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-dark leading-tight uppercase mb-6 tracking-tight">
                  {selectedBlog.title}
                </h2>

                <div className="w-16 h-1 bg-brand-gold/20 mb-8"></div>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans mb-8 italic">
                  "{selectedBlog.excerpt}"
                </p>

                <div className="text-gray-700 text-sm md:text-base leading-loose font-sans space-y-4">
                  {selectedBlog.content}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                    Reading Time: {selectedBlog.readTime}
                  </span>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-dark border-b-2 border-brand-gold/40 hover:border-brand-gold transition-all"
                  >
                    CLOSE STORY
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
