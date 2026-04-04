import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiTruck, FiMapPin, FiCheckCircle, FiSearch, FiClock, FiShield, FiNavigation } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';
import { FiStar, FiLoader, FiMessageCircle } from 'react-icons/fi';

const TrackOrder = () => {
  const { lastOrder, orderDetails, orderId: actualOrderId } = useShop();
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');
  const [alreadyReviewed, setAlreadyReviewed] = useState([]);
  const [submittingItems, setSubmittingItems] = useState([]);
  const { isAuthenticated } = useShop();

  const checkReviewStatus = async (items) => {
    if (!isAuthenticated) return;
    try {
      const reviewedMap = await Promise.all(
        items.map(async (item) => {
          try {
            const res = await api.get(`/reviews/can-review/${item.product}`);
            return { id: item.product, can: res.data.data.canReview };
          } catch (e) {
            return { id: item.product, can: false };
          }
        })
      );
      setAlreadyReviewed(reviewedMap.filter(m => !m.can).map(m => m.id));
    } catch (err) {
      console.error("Failed to fetch review status:", err);
    }
  };

  const performTrack = async (id) => {
    if (!id) return;
    setError('');
    setIsSearching(true);

    try {
      const res = await api.get(`/orders/track/${id}`);
      if (res.data.status === 'success') {
        const s = res.data.data.order;

        const isShipped = s.status === 'Shipped' || s.status === 'Delivered';
        const isDelivered = s.status === 'Delivered';

        // Helper to find history timestamp
        const getTs = (status) => {
          const entry = s.statusHistory?.find(h => h.status === status);
          return entry ? new Date(entry.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Pending';
        };

        const resultData = {
          id: s.orderId,
          status: s.status,
          currentLocation: isShipped ? 'Transit Network' : 'Warehouse Vault',
          estimatedDelivery: 'Standard Delivery Time',
          items: s.items || [],
          customerName: s.shippingAddress?.name || 'Loyal Patron',
          address: s.shippingAddress?.address || 'Private Address',
          timeline: [
            { status: 'Order Sequence initiated', time: new Date(s.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }), completed: true, current: false },
            { status: 'Verification', time: s.paymentStatus === 'Completed' ? 'Secure Payment Verified' : s.paymentStatus, completed: true, current: false },
            { status: 'Processing Vault', time: getTs('Processing'), completed: s.status !== 'Pending', current: s.status === 'Processing' },
            { status: 'Shipped', time: getTs('Shipped'), completed: isShipped, current: s.status === 'Shipped' },
            { status: 'Delivered', time: getTs('Delivered'), completed: isDelivered, current: isDelivered }
          ]
        };
        setOrderData(resultData);
        if (isDelivered) checkReviewStatus(s.items);
      }
    } catch (err) {
      setOrderData(null);
      setError('The Ritual Key (SS-ID) provided does not exist within our current vault records.');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setOrderId(id);
      performTrack(id);
    }
  }, [searchParams]);

  const handleTrack = (e) => {
    e.preventDefault();
    performTrack(orderId);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24 lg:pt-8 px-4 font-sans uppercase tracking-tight">
      <div className="container mx-auto max-w-2xl">

        {/* Header */}
        <header className="text-center py-10">
          <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[7px] mb-2 block">Safe Passage</span>
          <h1 className="text-3xl md:text-4xl font-serif font-black text-[#5C2E3E] leading-[0.9] tracking-tighter mb-4 uppercase">
            Track your <span className="text-brand-pink italic lowercase">Sanctuary</span>
          </h1>
          <div className="w-10 h-0.5 bg-brand-gold mx-auto"></div>
        </header>

        {/* Search Bar - Hidden if results are shown to avoid redundancy */}
        {!orderData && (
          <div className="bg-white p-6 shadow-xl border border-gray-100 mb-8 relative">
            <form onSubmit={handleTrack} className="relative z-10">
              <label className="text-[8px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/40 block mb-3">Ritual Key (SS ID)</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FiPackage className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-gold" size={14} />
                  <input
                    type="text"
                    placeholder="SS-XXXXXX"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-4 text-[10px] font-black outline-none focus:border-brand-pink/30 transition-all uppercase tracking-widest"
                  />
                </div>
                <button
                  disabled={isSearching}
                  className="bg-[#5C2E3E] text-white px-8 py-4 font-black uppercase tracking-[0.3em] text-[9px] hover:bg-brand-pink transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {isSearching ? 'Whispering...' : 'Track Ritual'}
                </button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-[8px] font-black uppercase tracking-widest mt-4 text-center"
                >
                  {error}
                </motion.p>
              )}
            </form>
          </div>
        )}

        {orderData && (
          <div className="mb-4 text-right">
            <button 
              onClick={() => setOrderData(null)}
              className="text-[8px] font-black uppercase tracking-widest text-[#5C2E3E]/40 hover:text-brand-pink transition-colors underline underline-offset-4"
            >
              Track Another Ritual
            </button>
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {orderData && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Compact Status Header */}
              <div className="bg-[#5C2E3E] text-white p-6 border-l-[4px] border-brand-gold flex justify-between items-center">
                <div>
                  <p className="text-[7px] font-black uppercase tracking-[0.3em] text-brand-gold mb-1">Expected Arrival</p>
                  <h3 className="text-xl font-serif italic tracking-tighter">{orderData.estimatedDelivery}</h3>
                </div>
                <div className="text-right">
                  <span className="bg-brand-gold text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest shadow-lg">
                    {orderData.status}
                  </span>
                </div>
              </div>

              {/* Compact Product Gallery */}
              {orderData.items.length > 0 ? (
                <div className="bg-white p-5 border border-gray-100 shadow-lg">
                  <h3 className="text-[8px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/60 mb-4 flex items-center gap-3">
                    Treasures in Passage
                    <div className="h-[1px] flex-1 bg-gray-50"></div>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {orderData.items.map((item, index) => (
                      <div key={item.product || index} className="flex flex-col p-3 border border-gray-50 hover:border-brand-pink/20 transition-all bg-gray-50/30">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-16 bg-white shrink-0 overflow-hidden shadow-sm border border-gray-100">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-black text-[#5C2E3E] uppercase tracking-widest truncate">{item.name}</p>
                            <p className="text-[8px] text-gray-400 font-serif italic uppercase">Ritual Item x{item.quantity}</p>
                            <p className="text-[10px] font-black text-brand-gold mt-1">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        {orderData.status === 'Delivered' && (
                          <div className="mt-auto pt-3 border-t border-gray-100">
                            {alreadyReviewed.includes(item.product) ? (
                              <div className="flex flex-col items-center justify-center gap-1.5 text-brand-gold py-3 bg-gray-50/50">
                                <FiCheckCircle size={14} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Sacred Testimony Recorded</span>
                              </div>
                            ) : !isAuthenticated ? (
                              <div className="text-center py-2 px-4 bg-brand-pink/5 border border-brand-pink/10">
                                <p className="text-[8px] font-black uppercase tracking-widest text-brand-pink italic leading-relaxed mb-2">
                                  Login required for feedback.
                                </p>
                                <Link to="/login" className="text-[7px] font-bold text-brand-dark uppercase underline underline-offset-4">Sign In</Link>
                              </div>
                            ) : (
                              <div className="bg-white p-4 space-y-4">
                                <div className="text-center">
                                  <p className="text-[7px] font-black uppercase tracking-[0.3em] text-brand-gold mb-2">Divine Satisfaction</p>
                                  <div className="flex justify-center gap-1.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button
                                        key={star}
                                        type="button"
                                        onClick={() => {
                                          const formId = `review-rating-${item.product}`;
                                          const el = document.getElementById(formId);
                                          if (el) el.value = star;
                                          setSubmittingItems([...submittingItems]); 
                                        }}
                                        className="transition-all active:scale-90"
                                      >
                                        <FiStar
                                          size={16}
                                          className={(parseInt(document.getElementById(`review-rating-${item.product}`)?.value) || 5) >= star ? "fill-brand-gold text-brand-gold" : "text-gray-100"}
                                        />
                                      </button>
                                    ))}
                                    <input type="hidden" id={`review-rating-${item.product}`} defaultValue="5" />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[7px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/60 block text-center">Testimony</label>
                                  <textarea
                                    id={`review-text-${item.product}`}
                                    placeholder="Describe your ritual experience..."
                                    rows={2}
                                    className="w-full bg-gray-50 border border-gray-100 p-3 text-[10px] font-medium outline-none focus:border-brand-pink/20 transition-all resize-none italic"
                                  />
                                </div>
                                <button
                                  onClick={async (e) => {
                                    const rating = document.getElementById(`review-rating-${item.product}`).value;
                                    const review = document.getElementById(`review-text-${item.product}`).value;
                                    if (!review.trim()) return alert("Please share your testimony.");
                                    
                                    setSubmittingItems(prev => [...prev, item.product]);
                                    try {
                                      const res = await api.post('/reviews', { product: item.product, rating, review });
                                      if (res.data.status === 'success') {
                                        setAlreadyReviewed(prev => [...prev, item.product]);
                                      }
                                    } catch (err) {
                                      alert(err.response?.data?.message || "Failed to record ritual.");
                                    } finally {
                                      setSubmittingItems(prev => prev.filter(id => id !== item.product));
                                    }
                                  }}
                                  disabled={submittingItems.includes(item.product)}
                                  className="w-full bg-[#5C2E3E] text-white py-2.5 text-[8px] font-black uppercase tracking-[0.3em] hover:bg-brand-gold transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                  {submittingItems.includes(item.product) ? <FiLoader className="animate-spin" /> : 'Record Ritual'}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : orderData.status === 'Delivered' && (
                <div className="bg-white p-8 border-2 border-dashed border-gray-100 text-center">
                  <FiMessageCircle className="mx-auto text-brand-gold mb-3" size={30} />
                  <h4 className="text-[11px] font-serif italic text-brand-dark mb-2">Divine Feedback Wanted</h4>
                  <p className="text-[8px] text-gray-400 uppercase tracking-widest leading-loose">
                    This ritual record appears to have no specific assets listed, <br />
                    but your global voice is always heard. Use our support gateway below.
                  </p>
                </div>
              )}

              {/* Compact Timeline & Map */}
              <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none -mr-4 -mt-4">
                  <FiTruck size={100} className="text-[#5C2E3E]" />
                </div>

                <div className="relative space-y-8 ml-1">
                  <div className="absolute left-[13px] top-2 bottom-2 w-[1px] bg-gray-100" />

                  {orderData.timeline.map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative z-10">
                      <div className={`w-7 h-7 flex items-center justify-center transition-all duration-500 border rounded-none ${step.completed ? 'bg-brand-gold border-brand-gold text-white scale-110 shadow-lg' :
                          step.current ? 'bg-white border-brand-pink text-brand-pink animate-pulse' : 'bg-white border-gray-100 text-gray-200'
                        }`}>
                        {step.completed ? <FiCheckCircle size={12} /> : (idx === 1 ? <FiClock size={12} /> : <FiMapPin size={12} />)}
                      </div>
                      <div className="min-w-0">
                        <h4 className={`text-[9px] font-black uppercase tracking-widest ${step.completed ? 'text-[#5C2E3E]' : 'text-gray-300'}`}>
                          {step.status}
                        </h4>
                        <p className={`text-[8px] font-bold uppercase tracking-tighter mt-1 ${step.completed ? 'text-[#5C2E3E]/60' : 'text-gray-400/40'}`}>
                          {step.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compact Info Grid - Added Spacing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 border border-gray-100 flex items-center gap-4 group shadow-sm mb-1">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center text-brand-gold transition-colors group-hover:bg-[#5C2E3E] group-hover:text-white">
                    <FiNavigation size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[7px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Live Gateway</p>
                    <p className="text-[9px] font-bold text-[#5C2E3E] uppercase truncate">{orderData.currentLocation}</p>
                  </div>
                </div>
                <div className="bg-white p-4 border border-gray-100 flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center text-brand-gold transition-colors group-hover:bg-[#5C2E3E] group-hover:text-white">
                    <FiMapPin size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[7px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Destined For</p>
                    <p className="text-[9px] font-bold text-[#5C2E3E] uppercase truncate">{orderData.customerName}</p>
                  </div>
                </div>
                <div className="bg-white p-4 border border-gray-100 flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 flex items-center justify-center text-brand-gold transition-colors group-hover:bg-[#5C2E3E] group-hover:text-white">
                    <FiShield size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[7px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Passage</p>
                    <p className="text-[9px] font-bold text-[#5C2E3E] uppercase pr-2 truncate">Insured Ritual</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#5C2E3E]/5 p-4 border-l-2 border-brand-gold">
                <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">Final Destination Details</p>
                <p className="text-[9px] font-bold text-[#5C2E3E] leading-relaxed uppercase">{orderData.address}</p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Support CTA - Compact */}
        <div className="mt-12 text-center">
          <p className="text-[8px] text-gray-400 uppercase tracking-widest leading-loose mb-4">
            Need a master's assistance? <br />
            Ritual Support Key: <span className="text-brand-pink font-black">SS-718293</span>
          </p>
          <Link to="/contact" className="text-[9px] font-black uppercase tracking-widest text-[#5C2E3E] border-b border-brand-gold pb-0.5 hover:text-brand-pink transition-all">
            Speak with a Consultant
          </Link>
        </div>

        {/* No modal needed - Review logic is now inline */}
      </div>
    </div>
  );
};

export default TrackOrder;
