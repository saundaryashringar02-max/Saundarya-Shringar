import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiShoppingBag, FiCreditCard, FiTruck, FiCheckCircle, FiShield, FiMinus, FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { Link, useLocation } from 'react-router-dom';
import api from '../../utils/api';

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart, verifyAndClearCart, orderId, user } = useShop();
  const [step, setStep] = useState(1); // 1: Cart, 2: Details, 3: Payment
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('paynow');
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  // Scroll to top on step change or load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, isSuccess]);

  // Router State Payload checks (Promos from Bag)
  const location = useLocation();
  const appliedPromo = location.state?.appliedCoupon || null;
  const passedDiscount = location.state?.discountAmount || 0;

  const shipping = 0; // Free delivery charges
  const total = location.state?.finalTotal !== undefined ? location.state.finalTotal : cartTotal;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateDetails = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Razorpay Integration
  const handleRazorpay = async () => {
    setIsPaymentLoading(true);
    try {
      // 1. Create Razorpay order on backend
      const res = await api.post('/orders/razorpay/create', { amount: total });
      const { id: razorpay_order_id, amount, currency } = res.data.data.order;

      const options = {
        key: "rzp_test_8sYbzHWidwe5Zw",
        amount,
        currency,
        name: "Saundarya Shringar",
        description: "Ritual Selection Transaction",
        image: "/logo_s.jpg",
        order_id: razorpay_order_id,
        handler: async (response) => {
          // 2. Verify payment & save order
          try {
            await verifyAndClearCart(response, formData, total);
            setIsSuccess(true);
          } catch (err) {
            console.error("Verification error", err);
          } finally {
            setIsPaymentLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
          email: user?.email || ""
        },
        theme: {
          color: "#5C2E3E"
        },
        modal: {
          ondismiss: () => setIsPaymentLoading(false)
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay initiation error", err);
      alert("Payment gateway failed: " + (err.response?.data?.message || err.message));
      setIsPaymentLoading(false);
    }
  };

  const handleProceed = async () => {
    if (step === 1) {
      if (cart.length === 0) return;
      setStep(2);
    } else if (step === 2) {
      if (validateDetails()) setStep(3);
    } else if (step === 3) {
      if (selectedPayment === 'paynow') {
        await handleRazorpay();
      } else {
        try {
          await clearCart(formData, total);
          setIsSuccess(true);
        } catch (err) {
          console.error("Checkout failed", err);
        }
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xs w-full bg-white p-6 md:p-8 text-center shadow-2xl border border-gray-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-green-500/20"
          >
            <FiCheck size={30} strokeWidth={3} />
          </motion.div>

          <h2 className="text-2xl font-serif font-black text-[#5C2E3E] mb-1 uppercase tracking-tighter">
            Order <span className="text-brand-pink">Confirmed</span>
          </h2>
          <div className="w-8 h-0.5 bg-brand-gold mx-auto mb-4"></div>

          <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-6 leading-relaxed">
            Your sacred treasures are being gathered. Check your mail for details.
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-gray-50 text-left border-l-2 border-brand-gold">
              <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">Ritual Key (SS ID)</p>
              <p className="text-[10px] font-bold text-brand-gold">{orderId}</p>
            </div>

            <div className="p-3 bg-gray-50 text-left border-l-2 border-[#5C2E3E]">
              <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">Destination</p>
              <p className="text-[10px] font-bold text-[#5C2E3E] truncate">{formData.name}</p>
              <p className="text-[8px] text-[#5C2E3E]/60 font-serif italic line-clamp-1">{formData.address}</p>
            </div>



            <Link to={`/track-order?id=${orderId}`} className="w-full inline-block px-8 py-3 bg-brand-gold text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#5C2E3E] transition-all mb-2">
              Track Journey
            </Link>

            <Link to="/" className="w-full inline-block px-8 py-3 border border-gray-100 text-[#5C2E3E] text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-all active:scale-95">
              Back to Sanctuary
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-24 lg:pt-8">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Back Button */}
        <div
          onClick={() => step > 1 ? setStep(step - 1) : null}
          className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors mb-8 cursor-pointer ${step > 1 ? 'text-[#5C2E3E] hover:text-brand-pink' : 'text-gray-200 pointer-events-none'}`}
        >
          <FiChevronLeft /> Previous Step
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">

            {/* Steps Indicator */}
            <div className="flex items-center justify-between max-w-md mx-auto mb-16 relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -z-10" />
              {[
                { id: 1, label: 'BAG', icon: <FiShoppingBag size={12} /> },
                { id: 2, label: 'DETAILS', icon: <FiTruck size={12} /> },
                { id: 3, label: 'PAYMENT', icon: <FiCreditCard size={12} /> }
              ].map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${step === s.id ? 'bg-[#5C2E3E] text-white border-[#5C2E3E] shadow-lg scale-110' :
                    step > s.id ? 'bg-brand-gold text-white border-brand-gold' : 'bg-white text-gray-300 border-gray-100'
                    }`}>
                    {step > s.id ? <FiCheck size={14} strokeWidth={3} /> : s.icon}
                  </div>
                  <span className={`text-[8px] font-black tracking-widest ${step >= s.id ? 'text-[#5C2E3E]' : 'text-gray-300'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <h1 className="text-3xl md:text-4xl font-serif font-black text-[#5C2E3E] mb-8 uppercase tracking-tighter">
                    Order <span className="text-brand-pink italic">Selection</span>
                  </h1>

                  <div className="space-y-3">
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <div key={item._id} className="bg-white p-3 border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-brand-pink/20 transition-all">
                          <div className="w-16 h-20 bg-[#F9F6F4] shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[10px] font-black text-[#5C2E3E] uppercase tracking-widest truncate">{item.name}</h3>
                            <p className="text-[9px] text-gray-400 font-serif italic mb-2">{item.subCategory}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 px-2 py-0.5 scale-90 -ml-2">
                                <button onClick={() => updateQuantity(item._id, -1)} className="text-gray-400 hover:text-brand-pink transition-colors">
                                  <FiMinus size={8} />
                                </button>
                                <span className="text-[10px] font-black text-[#5C2E3E] w-3 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, 1)} className="text-gray-400 hover:text-brand-pink transition-colors">
                                  <FiPlus size={8} />
                                </button>
                              </div>
                              <button onClick={() => removeFromCart(item._id)} className="text-[#5C2E3E]/30 hover:text-red-500 transition-colors uppercase text-[7px] font-black tracking-[0.2em]">
                                Remove
                              </button>
                            </div>
                          </div>
                          <div className="text-right pr-2">
                            <span className="text-[11px] font-black text-brand-gold">₹{item.price * item.quantity}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-20 text-center bg-white border border-gray-100">
                        <p className="text-xl font-serif italic text-gray-300 mb-6">"Your selection remains empty..."</p>
                        <Link to="/shop" className="text-[10px] font-black uppercase tracking-widest text-brand-gold underline decoration-brand-pink/30 underline-offset-8">Discover Treasures</Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                  <h1 className="text-3xl md:text-4xl font-serif font-black text-[#5C2E3E] uppercase tracking-tighter">
                    Shipping <span className="text-brand-pink italic">Sanctuary</span>
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 bg-white p-8 border border-gray-100">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/60 block">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border ${errors.name ? 'border-red-400' : 'border-gray-100'} px-6 py-4 text-[11px] font-bold outline-none focus:border-brand-pink/30 transition-all`}
                        placeholder="Arjun Shrinagar"
                      />
                      {errors.name && <p className="text-red-400 text-[8px] font-black uppercase tracking-widest ml-1">{errors.name}</p>}
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/60 block">Phone Essence *</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-400' : 'border-gray-100'} px-6 py-4 text-[11px] font-bold outline-none focus:border-brand-pink/30 transition-all`}
                        placeholder="+91 00000 00000"
                      />
                      {errors.phone && <p className="text-red-400 text-[8px] font-black uppercase tracking-widest ml-1">{errors.phone}</p>}
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/60 block">Permanent Abode (Address) *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border ${errors.address ? 'border-red-400' : 'border-gray-100'} px-6 py-5 text-[11px] font-bold outline-none focus:border-brand-pink/30 transition-all min-h-[140px] resize-none`}
                        placeholder="123, Green Valley, Bangalore, Karnataka - 560001"
                      />
                      {errors.address && <p className="text-red-400 text-[8px] font-black uppercase tracking-widest ml-1">{errors.address}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                  <h1 className="text-3xl md:text-4xl font-serif font-black text-[#5C2E3E] uppercase tracking-tighter">
                    Payment <span className="text-brand-pink italic">Selection</span>
                  </h1>
                  <div className="space-y-3">
                    {[
                      { id: 'paynow', label: 'PAY NOW', desc: 'Secure Online Transaction (UPI, Cards, NetBanking)' }
                    ].map(method => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`p-6 border cursor-pointer transition-all flex items-center gap-6 relative ${selectedPayment === method.id
                          ? 'bg-[#5C2E3E] border-[#5C2E3E] shadow-xl translate-x-1'
                          : 'bg-white border-gray-100 hover:border-brand-pink/20'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedPayment === method.id ? 'border-brand-gold bg-brand-gold' : 'border-gray-100'
                          }`}>
                          {selectedPayment === method.id && <FiCheck size={12} className="text-white" strokeWidth={4} />}
                        </div>
                        <div>
                          <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${selectedPayment === method.id ? 'text-white' : 'text-[#5C2E3E]'}`}>
                            {method.label}
                          </h4>
                          <p className={`text-[9px] font-serif italic mt-1 ${selectedPayment === method.id ? 'text-white/60' : 'text-gray-400'}`}>
                            {method.desc}
                          </p>
                        </div>

                        {selectedPayment === method.id && (
                          <motion.div layoutId="activePay" className="absolute left-0 w-1 h-full bg-brand-gold" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar / Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-white p-8 shadow-2xl border border-gray-100 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 -translate-y-16 translate-x-16 pointer-events-none rotate-45 border border-brand-pink/10" />

              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5C2E3E] pb-4 border-b border-gray-100">Order Summary</h3>

              <div className="space-y-4 py-2">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/40">Subtotal</span>
                  <span className="text-sm font-black text-[#5C2E3E]">₹{cartTotal}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600">Promo ({appliedPromo.code})</span>
                    <span className="text-sm font-black text-green-600">- ₹{passedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/40">Safe Passage</span>
                  <span className="text-sm font-black text-brand-gold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="bg-brand-gold/5 p-3 text-center border-l-2 border-brand-gold">
                  <p className="text-[8px] font-bold text-brand-gold uppercase tracking-[0.2em] leading-relaxed">
                    🎉 <span className="underline">Free Shipping Activated</span> for All Divine Purchases
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center px-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#5C2E3E]">Grand Total</span>
                <span className="text-2xl font-black text-brand-gold leading-none">₹{total}</span>
              </div>

              <button
                onClick={handleProceed}
                disabled={cart.length === 0 || isPaymentLoading}
                className="w-full bg-[#5C2E3E] text-white py-5 font-bold uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-brand-pink transition-all active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
              >
                {isPaymentLoading ? 'Processing...' : (step === 3 ? 'Pay Now' : 'Continue Journey')}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 opacity-30 grayscale hover:grayscale-0 transition-all">
                  <FiShield size={10} className="text-[#5C2E3E]" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#5C2E3E]">Secured</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-30 grayscale hover:grayscale-0 transition-all">
                  <FiCheckCircle size={10} className="text-[#5C2E3E]" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#5C2E3E]">Pure</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
