import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiStar, FiHeart, FiShare2, FiShoppingCart, FiZap,
  FiShield, FiTruck, FiRefreshCw, FiCheckCircle, FiChevronRight, FiTag, FiX, FiMessageSquare
} from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';

const CouponModal = ({ onClose, onApply }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/coupons/validate', { code: code.trim() });
      onApply(res.data.data.coupon);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid coupon code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-brand-dark transition-colors">
          <FiX size={18} />
        </button>
        <h3 className="text-xl font-serif font-black text-brand-dark mb-1">Apply Coupon</h3>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Enter code for instant discount</p>

        <form onSubmit={handleApply} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. SAUNDARYA10"
              className="w-full bg-gray-50 border border-gray-200 p-3 pl-10 rounded-xl text-xs font-bold outline-none focus:border-brand-pink transition-all"
            />
            <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          </div>
          {error && <p className="text-red-500 text-[9px] font-bold uppercase text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? 'Validating...' : 'Apply Coupon'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, loading } = useShop();

  const product = products.find(p => p._id === id);
  const { user, isAuthenticated } = useShop();

  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [isAdded, setIsAdded] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Review States
  const [reviews, setReviews] = useState([]);
  const [canSubmitReview, setCanSubmitReview] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [reviewLoading, setReviewLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setReviewLoading(true);
      const res = await api.get(`/reviews/product/${id}`);
      setReviews(res.data.data.reviews);
    } catch (err) {
      console.error("Failed to fetch product insights:", err);
    } finally {
      setReviewLoading(false);
    }
  };

  const checkEligibility = async () => {
    if (!isAuthenticated || !user) return;
    try {
      const res = await api.get(`/reviews/can-review/${id}`);
      setCanSubmitReview(res.data.data.canReview);
    } catch (err) {
      console.error("Eligibility check failed:", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.comment.trim()) return;

    setIsSubmittingReview(true);
    try {
      await api.post('/reviews', {
        product: id,
        review: reviewForm.comment,
        rating: reviewForm.rating
      });
      setReviewForm({ rating: 5, comment: '' });
      setCanSubmitReview(false);
      fetchReviews(); // Refresh
      alert("Your divine appreciation has been recorded.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to transmit feedback.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) setSelectedImage(product.image);
    // Reset coupon when changing product
    setAppliedCoupon(null);

    if (id) {
      fetchReviews();
      checkEligibility();
    }
  }, [id, product, isAuthenticated, user]);

  if (loading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-serif font-black text-brand-dark mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-brand-pink font-bold uppercase tracking-widest text-xs">Back to Shop</Link>
      </div>
    );
  }

  const calculateDiscountedPrice = () => {
    if (!appliedCoupon) return product.price;
    if (appliedCoupon.discountType === 'percentage') {
      return Math.round(product.price * (1 - appliedCoupon.discountValue / 100));
    }
    return Math.max(0, product.price - appliedCoupon.discountValue);
  };

  const finalPrice = calculateDiscountedPrice();

  const handleAddToCart = () => {
    addToCart({ ...product, price: finalPrice, couponApplied: appliedCoupon?.code });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, price: finalPrice, couponApplied: appliedCoupon?.code });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white pb-10 pt-0 font-sans focus:outline-none">
      <AnimatePresence>
        {isCouponModalOpen && <CouponModal onClose={() => setIsCouponModalOpen(false)} onApply={setAppliedCoupon} />}
      </AnimatePresence>

      <div className="container mx-auto px-4 pt-1 pb-2 flex items-center gap-2 text-[10px] md:text-[11px] text-gray-400 font-medium">
        <Link to="/shop" className="hover:text-brand-pink">Shop</Link>
        <FiChevronRight className="w-3 h-3" />
        <span className="capitalize hover:text-brand-pink cursor-pointer">{product.category}</span>
        <FiChevronRight className="w-3 h-3" />
        <span className="text-brand-dark font-bold truncate max-w-[150px] md:max-w-none">{product.name}</span>
      </div>

      <main className="container mx-auto px-4 md:px-8 lg:px-12 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">

          {/* Left: Image Gallery - New Vertical Stack */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Main Large Image - Tighter Boundary */}
            <div className="relative aspect-square overflow-hidden bg-white shadow-2xl rounded-2xl group border border-gray-100/50 max-w-[500px] mx-auto">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />

              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg z-10 transition-all active:scale-90 bg-white ${isInWishlist(product._id) ? 'text-brand-pink' : 'text-gray-300 hover:text-brand-pink'
                  }`}
              >
                <FiHeart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails Row Below - Clickable & Labeled */}
            <div className="flex justify-center gap-4 mt-2">
              {[
                { img: product.image, label: 'FRONT' },
                { img: product.image, label: 'SIDE' },
                { img: product.image, label: 'DETAIL' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => setSelectedImage(item.img)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all border-2 flex items-center justify-center bg-gray-50/30 ${selectedImage === item.img ? 'border-brand-pink shadow-md' : 'border-gray-100 opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={item.img} alt={item.label} className="w-full h-full object-contain p-2" />
                  </button>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#5C2E3E]/60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Info - Amazon Style */}
          <div className="lg:col-span-5 space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-brand-gold font-bold uppercase tracking-widest text-[9px] md:text-[10px] items-center gap-2 mb-1 inline-flex">
                <FiZap size={10} /> {product.label || 'Premium Selection'}
              </span>
              <h1 className="text-2xl md:text-3xl font-serif font-black text-brand-dark mb-2 leading-tight tracking-tight uppercase">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 group cursor-pointer group">
                  <span className="font-bold text-gray-700 underline decoration-gray-200 underline-offset-4">{product.rating}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-brand-gold text-brand-gold" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <FiChevronRight className="w-3 h-3 text-gray-300" />
                </div>
                <span className="text-brand-pink font-bold hover:underline cursor-pointer">{product.reviews} verified reviews</span>
                <span className="h-4 w-[1px] bg-gray-200" />
                <span className="text-gray-500 font-medium">Verified Purchases</span>
              </div>
            </div>

            <div className="py-2">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-brand-pink text-3xl font-medium">-{product.discount || '29%'}</span>
                <div className="flex flex-col">
                  {appliedCoupon && (
                    <span className="text-gray-400 line-through text-xs font-bold font-sans">₹{product.price}</span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold align-top mt-1">₹</span>
                    <span className="text-4xl font-black tracking-tighter text-brand-dark leading-none">{finalPrice}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-xs font-medium">
                M.R.P.: <span className="line-through">₹{product.oldPrice || product.price + 225}</span>
              </p>
              {appliedCoupon && (
                <div className="mt-2 flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-100 w-fit">
                  <FiTag size={12} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Applied: {appliedCoupon.code}</span>
                  <button onClick={() => setAppliedCoupon(null)} className="ml-1 hover:bg-green-100 p-0.5 rounded-full transition-colors"><FiX size={12} /></button>
                </div>
              )}
            </div>

            {/* Inline Coupon Reward System */}
            <div className="border border-brand-pink/10 rounded-2xl p-4 bg-brand-light/20">
              <h4 className="flex items-center gap-2 text-brand-dark font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                <FiTag className="text-brand-pink" /> Sacred Rewards
              </h4>
              <div className="flex gap-2">
                <div className="relative flex-1 group">
                  <input
                    type="text"
                    placeholder="ENTER COUPON CODE"
                    className="w-full bg-white border border-brand-pink/10 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-brand-pink/30 focus:ring-1 focus:ring-brand-pink/5 transition-all"
                    value={appliedCoupon?.code || ''}
                    onChange={(e) => {
                      if (!appliedCoupon) {
                        // This is just for UI, the real application happens via button
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = e.target.value.toUpperCase();
                        if (val) {
                          (async () => {
                            try {
                              const res = await api.post('/coupons/validate', { code: val });
                              setAppliedCoupon(res.data.data.coupon);
                            } catch (err) {
                              alert(err.response?.data?.message || 'Invalid coupon code');
                            }
                          })();
                        }
                      }
                    }}
                  />
                  <FiChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-pink transition-colors" />
                </div>
                <button
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="ENTER COUPON CODE"]');
                    const val = input.value.toUpperCase();
                    if (val) {
                      (async () => {
                        try {
                          const res = await api.post('/coupons/validate', { code: val });
                          setAppliedCoupon(res.data.data.coupon);
                        } catch (err) {
                          alert(err.response?.data?.message || 'Invalid coupon code');
                        }
                      })();
                    }
                  }}
                  className="bg-brand-dark text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-brand-dark/10"
                >
                  Apply
                </button>
              </div>
              <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-2 px-1">Check for limited time divine discounts in your mail</p>
            </div>

            {/* Icons - Grid style */}
            <div className="grid grid-cols-4 gap-2 py-4 border-y border-gray-100 bg-gray-50/30 rounded-lg px-2">
              {[
                { icon: <FiShield />, label: 'Genuine' },
                { icon: <FiTruck />, label: 'Fast Delivery' },
                { icon: <FiRefreshCw />, label: '7 Days Return' },
                { icon: <FiCheckCircle />, label: 'Quality Check' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center gap-1 group">
                  <div className="text-gray-400 group-hover:text-brand-gold">
                    {item.icon}
                  </div>
                  <span className="text-[7px] md:text-[8px] font-bold text-gray-400 uppercase tracking-tighter">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Bullet Points */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-4 bg-brand-gold" /> About this item
              </h3>
              <ul className="space-y-2.5">
                {((product.about && product.about.length > 0) ? product.about : [
                  'Non Oily Matte Look: Evens out complexion and hides imperfections.',
                  'Blends Effortlessly: Pressed powder for all skin types.',
                  'Weightless Stay: Breathable HD coverage that lasts 12h+.',
                  'Pure & Organic: Crafted with botanical heritage rituals.'
                ]).map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-brand-pink font-black text-xs leading-none mt-1">•</span>
                    <p className="text-xs md:text-sm text-gray-600 leading-snug">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Buy Section - Amazon Buy Box */}
          <div className="lg:col-span-3">
            <div className="sticky top-28 space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="space-y-2 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold mt-1">₹</span>
                    <span className="text-3xl font-black text-brand-dark tracking-tight">{finalPrice}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-green-600 font-black text-sm">In Stock</p>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-tight">
                    FREE delivery <span className="text-brand-dark font-bold">Sunday, 22 March</span> on your first order. <span className="text-blue-600 font-bold cursor-pointer hover:underline">Details</span>
                  </p>
                  <p className="text-[11px] text-gray-700 font-medium">
                    Or fastest delivery <span className="font-bold underline">Today 6 pm - 10 pm</span>. Order within <span className="text-red-600 font-bold">2 hrs 56 mins</span>.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3 rounded-full flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg border-b-2 border-brand-dark/20 ${isAdded ? 'bg-green-600 text-white' : 'bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 border-[#F0C14B]'
                      }`}
                  >
                    {isAdded ? <FiCheckCircle /> : <FiShoppingCart />}
                    {isAdded ? 'Added to Bag' : 'Add to Bag'}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 rounded-full bg-[#FFA41C] hover:bg-[#FA8900] text-gray-900 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg border-b-2 border-[#A88734] border-brand-dark/20"
                  >
                    <FiZap /> Buy Now
                  </button>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-400">
                      <FiShield size={14} />
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Secure transaction</p>
                  </div>
                  <div className="pl-9 space-y-1">
                    <p className="text-[10px] text-gray-400">Ships from <span className="text-gray-900 font-bold ml-2">Saundarya</span></p>
                    <p className="text-[10px] text-gray-400">Sold by <span className="text-gray-900 font-bold ml-2">Saundarya Official</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-pink/5 rounded-xl p-4 border border-brand-pink/10 group cursor-pointer hover:bg-brand-pink/10 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-brand-dark font-black uppercase tracking-widest">Customer Help</p>
                  <FiChevronRight className="w-3 h-3 text-brand-pink group-hover:translate-x-1 transition-transform" />
                </div>
                <button className="text-brand-pink text-[11px] font-black underline underline-offset-4 mt-2">Chat with Beauty Expert</button>
              </div>
            </div>
          </div>

        </div>

        {/* Global Feedback Section - New High-End Experience */}
        <div className="mt-20 border-t border-gray-100 pt-16 max-w-5xl mx-auto pb-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">

            {/* Left Col: Aggregate Rating */}
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest mb-2">Verified Insights</h3>
              <div className="flex items-center gap-3 mb-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-lg font-black text-brand-dark">{product.rating} / 5.0</span>
              </div>
              <p className="text-xs text-gray-400 font-medium mb-6">{product.reviews} Global Ratings & Testimony</p>

              {/* Write Review Trigger */}
              {canSubmitReview && (
                <div className="bg-brand-pink/5 p-6 rounded-2xl border border-brand-pink/10">
                  <h4 className="text-[10px] font-black text-brand-pink uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FiCheckCircle size={12} /> Verified Owner Recognition
                  </h4>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed italic">Your voice adds value to the sacred collection. Share your experience with this asset.</p>

                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setReviewForm(prev => ({ ...prev, rating: num }))}
                          className={`p-1 transition-all ${reviewForm.rating >= num ? 'text-brand-gold scale-110' : 'text-gray-200 hover:text-brand-gold/50'}`}
                        >
                          <FiStar className={reviewForm.rating >= num ? 'fill-current' : ''} size={20} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder="Your testimony..."
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      required
                      className="w-full bg-white border border-gray-100 p-4 rounded-xl text-xs font-sans italic outline-none focus:ring-1 focus:ring-brand-pink/20 min-h-[100px]"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="w-full bg-brand-dark text-white py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      {isSubmittingReview ? 'Recording...' : 'Publish Testimony'}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Right Col: Individual Reviews */}
            <div className="w-full md:w-2/3 space-y-10">
              {reviewLoading ? (
                <div className="animate-pulse space-y-8">
                  {[1, 2].map(i => <div key={i} className="h-24 bg-gray-50 rounded-2xl" />)}
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((r, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={r._id}
                    className="border-b border-gray-50 pb-8 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-light/50 rounded-full flex items-center justify-center text-brand-dark font-black text-[10px] uppercase shadow-inner">
                          {r.user?.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-brand-dark uppercase tracking-widest">{r.user?.name || 'Verified Beauty'}</p>
                          <div className="flex items-center gap-0.5 text-brand-gold">
                            {[...Array(5)].map((_, idx) => (
                              <FiStar key={idx} size={8} className={idx < r.rating ? 'fill-current' : 'text-gray-200'} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[8px] font-bold text-gray-300 uppercase tracking-tighter">
                        Verified Purchase • {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-serif italic">"{r.review}"</p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <FiMessageSquare className="mx-auto text-gray-200 mb-4" size={40} />
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">No Global Testimony Recorded Yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
