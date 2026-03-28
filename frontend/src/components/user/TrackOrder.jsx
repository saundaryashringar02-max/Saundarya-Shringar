import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiTruck, FiMapPin, FiCheckCircle, FiSearch, FiClock, FiShield, FiNavigation } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';

const TrackOrder = () => {
  const { lastOrder, orderDetails, orderId: actualOrderId } = useShop();
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');

  const performTrack = async (id) => {
    if (!id) return;
    setError('');
    setIsSearching(true);

    try {
      const res = await api.get(`/orders/track/${id}`);
      if (res.data.status === 'success') {
        const serverOrder = res.data.data.order;

        const isShipped = serverOrder.status === 'Shipped' || serverOrder.status === 'Delivered';
        const isDelivered = serverOrder.status === 'Delivered';

        setOrderData({
          id: serverOrder.orderId,
          status: serverOrder.status,
          currentLocation: isShipped ? 'Transit Network' : 'Warehouse Vault',
          estimatedDelivery: 'Standard Delivery Time',
          items: serverOrder.items || [],
          customerName: serverOrder.shippingAddress?.name || 'Loyal Patron',
          address: serverOrder.shippingAddress?.address || 'Private Address',
          timeline: [
            { status: 'Order Sequence initiated', time: new Date(serverOrder.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }), completed: true, current: false },
            { status: 'Verification', time: serverOrder.paymentStatus, completed: true, current: false },
            { status: 'Processing Vault', time: 'In Progress', completed: serverOrder.status !== 'Pending', current: serverOrder.status === 'Processing' },
            { status: 'Shipped', time: 'Pending', completed: isShipped, current: serverOrder.status === 'Shipped' },
            { status: 'Delivered', time: 'Pending', completed: isDelivered, current: isDelivered }
          ]
        });
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

        {/* Search Bar - More Compact */}
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
              {orderData.items.length > 0 && (
                <div className="bg-white p-5 border border-gray-100 shadow-lg">
                  <h3 className="text-[8px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/60 mb-4 flex items-center gap-3">
                    Treasures in Passage
                    <div className="h-[1px] flex-1 bg-gray-50"></div>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {orderData.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-1.5 border border-transparent hover:border-gray-50 transition-all">
                        <div className="w-10 h-12 bg-gray-50 shrink-0 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.2]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-black text-[#5C2E3E] uppercase tracking-widest truncate">{item.name}</p>
                          <p className="text-[7px] text-gray-400 font-serif italic uppercase">Ritual Item x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                      <div>
                        <h4 className={`text-[9px] font-black uppercase tracking-widest ${step.completed ? 'text-[#5C2E3E]' : 'text-gray-300'}`}>
                          {step.status}
                        </h4>
                        <p className="text-[8px] text-gray-400 font-serif italic mt-0.5">{step.time}</p>
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

      </div>
    </div>
  );
};

export default TrackOrder;
