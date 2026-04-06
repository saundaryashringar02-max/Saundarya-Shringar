import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPercent, FiTruck, FiSave, FiAlertCircle, FiSettings, FiCheckCircle, FiShield, FiLink, FiMapPin, FiPhone } from 'react-icons/fi';
import api from '../../utils/api';

const AdminLogistics = () => {
  const [settings, setSettings] = useState({
    taxRate: 18,
    deliveryCharge: 50,
    freeDeliveryThreshold: 1000,
    estDeliveryDays: '3-5 Business Days',
    shippingPartner: 'Standard Courier',
    trackingUrl: 'https://shiprocket.co/tracking/',
    supportContact: '+91 74071 75567'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/settings');
      if (res.data.data.settings) {
        setSettings({
          taxRate: res.data.data.settings.taxRate,
          deliveryCharge: res.data.data.settings.deliveryCharge,
          freeDeliveryThreshold: res.data.data.settings.freeDeliveryThreshold,
          estDeliveryDays: res.data.data.settings.estDeliveryDays || '3-5 Business Days',
          shippingPartner: res.data.data.settings.shippingPartner || 'Standard Courier',
          trackingUrl: res.data.data.settings.trackingUrl || 'https://shiprocket.co/tracking/',
          supportContact: res.data.data.settings.supportContact || '+91 74071 75567'
        });
      }
    } catch (err) {
      console.error('Failed to fetch sanctuary settings:', err);
      setMessage({ type: 'error', content: 'Failed to synchronize with sanctuary vault.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', content: '' });
    try {
      await api.patch('/settings/update', settings);
      setMessage({ type: 'success', content: 'Sanctuary logistics & financial attributes refined successfully.' });
      setTimeout(() => setMessage({ type: '', content: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', content: err.response?.data?.message || 'Failed to refine sanctuary settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 p-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Logistics & Tax Authority
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] opacity-60">Global Sanctuary Configuration</p>
        </div>
        <div className="flex items-center gap-2 bg-brand-pink/5 px-4 py-2 rounded-full border border-brand-pink/10">
           <FiShield className="text-brand-pink" size={14} />
           <span className="text-[11px] font-black text-brand-pink uppercase tracking-widest">Secure Master Controls</span>
        </div>
      </div>

      {message.content && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl flex items-center gap-3 border shadow-sm ${
            message.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
          }`}
        >
          {message.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          <span className="text-[11px] font-bold uppercase tracking-wide">{message.content}</span>
        </motion.div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Taxation Configuration */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-4 border-b border-gray-50 pb-4 text-brand-gold">
            <div className="w-10 h-10 bg-brand-gold/10 rounded-2xl flex items-center justify-center">
              <FiPercent size={20} />
            </div>
            <div>
              <h3 className="text-xs font-black text-brand-dark uppercase tracking-widest leading-none">Taxation Mapping</h3>
              <p className="text-[8px] text-gray-400 font-bold mt-1 uppercase">GST Authority Calculations</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Global GST Rate (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={settings.taxRate}
                  onChange={(e) => setSettings({...settings, taxRate: parseFloat(e.target.value)})}
                  className="w-full bg-gray-50 border border-transparent p-4 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-brand-pink/30 transition-all shadow-inner"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 font-black text-sm">%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Shipping Financials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-4 border-b border-gray-50 pb-4 text-brand-pink">
            <div className="w-10 h-10 bg-brand-pink/10 rounded-2xl flex items-center justify-center">
              <FiTruck size={20} />
            </div>
            <div>
              <h3 className="text-xs font-black text-brand-dark uppercase tracking-widest leading-none">Shipping Financials</h3>
              <p className="text-[8px] text-gray-400 font-bold mt-1 uppercase">Standard Carrier Fees</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Base Delivery</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-black text-xs">₹</span>
                  <input 
                    type="number" 
                    value={settings.deliveryCharge}
                    onChange={(e) => setSettings({...settings, deliveryCharge: parseFloat(e.target.value)})}
                    className="w-full bg-gray-50 border border-transparent p-4 pl-7 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-brand-pink/30 transition-all shadow-inner"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Free Threshold</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-black text-xs">₹</span>
                  <input 
                    type="number" 
                    value={settings.freeDeliveryThreshold}
                    onChange={(e) => setSettings({...settings, freeDeliveryThreshold: parseFloat(e.target.value)})}
                    className="w-full bg-gray-50 border border-transparent p-4 pl-7 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-brand-pink/30 transition-all shadow-inner"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Shipping Experience */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 lg:row-span-2"
        >
          <div className="flex items-center gap-4 border-b border-gray-50 pb-4 text-brand-dark">
            <div className="w-10 h-10 bg-brand-dark/5 rounded-2xl flex items-center justify-center">
              <FiSettings size={20} />
            </div>
            <div>
              <h3 className="text-xs font-black text-brand-dark uppercase tracking-widest leading-none">Carrier Experience</h3>
              <p className="text-[8px] text-gray-400 font-bold mt-1 uppercase">Customer Facing Timeline</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Primary Partner</label>
              <input 
                type="text" 
                value={settings.shippingPartner}
                onChange={(e) => setSettings({...settings, shippingPartner: e.target.value})}
                className="w-full bg-gray-50 border border-transparent p-4 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-brand-pink/30 transition-all shadow-inner"
                placeholder="Delhivery, Shiprocket..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Est. Timeline</label>
              <input 
                type="text" 
                value={settings.estDeliveryDays}
                onChange={(e) => setSettings({...settings, estDeliveryDays: e.target.value})}
                className="w-full bg-gray-50 border border-transparent p-4 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-brand-pink/30 transition-all shadow-inner"
                placeholder="3-5 Business Days"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Tracking URL Template</label>
              <div className="relative">
                <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                <input 
                  type="text" 
                  value={settings.trackingUrl}
                  onChange={(e) => setSettings({...settings, trackingUrl: e.target.value})}
                  className="w-full bg-gray-50 border border-transparent p-4 pl-10 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-brand-pink/30 transition-all shadow-inner"
                  placeholder="https://shiprocket.co/tracking/"
                />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Logistics Support</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                <input 
                  type="text" 
                  value={settings.supportContact}
                  onChange={(e) => setSettings({...settings, supportContact: e.target.value})}
                  className="w-full bg-gray-50 border border-transparent p-4 pl-10 rounded-xl text-xs font-bold outline-none focus:bg-white focus:border-brand-pink/30 transition-all shadow-inner"
                  placeholder="+91 74071 75567"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security & Impact Insight */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-brand-dark p-6 rounded-3xl border border-white/5 shadow-2xl space-y-6 md:col-span-2 lg:col-span-2"
        >
           <div className="flex items-start gap-4 text-white/80">
              <div className="p-3 bg-white/5 rounded-xl text-brand-pink">
                 <FiAlertCircle size={22} />
              </div>
              <div className="space-y-1">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-[#E8B4B8]">Sacred Integrity Protocol</h4>
                 <p className="text-[9px] font-medium text-white/40 leading-relaxed max-w-lg">
                    Changes made here will rewrite your checkout math in real-time. Modifying the **GST Rate** will affect invoice generation, while the **Free Shipping Threshold** will instantly update customer cart behavior.
                 </p>
              </div>
           </div>

           <div className="pt-4 flex items-center justify-between border-t border-white/5">
              <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full border-2 border-brand-dark bg-brand-pink/20 flex items-center justify-center text-[8px] font-black text-brand-pink uppercase tracking-widest">Log</div>
                 <div className="w-8 h-8 rounded-full border-2 border-brand-dark bg-brand-gold/20 flex items-center justify-center text-[8px] font-black text-brand-gold uppercase tracking-widest">Tax</div>
                 <div className="w-8 h-8 rounded-full border-2 border-brand-dark bg-white/5 flex items-center justify-center text-[8px] font-black text-white/60 uppercase tracking-widest">Ops</div>
              </div>
              <button 
                type="submit" 
                disabled={saving}
                className="bg-[#E8B4B8] text-brand-dark px-12 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl hover:bg-white transition-all disabled:opacity-50"
              >
                {saving ? 'Synchronizing Vault...' : <><FiSave size={16} /> Update Logistics</>}
              </button>
           </div>
        </motion.div>
      </form>
      
      <style>{`
        .italic-placeholder::placeholder { font-style: italic; opacity: 0.3; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </div>
  );
};

export default AdminLogistics;
