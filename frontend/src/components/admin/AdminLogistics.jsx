import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPercent, FiTruck, FiSave, FiAlertCircle, FiSettings, FiCheckCircle, FiShield } from 'react-icons/fi';
import api from '../../utils/api';

const AdminLogistics = () => {
  const [settings, setSettings] = useState({
    taxRate: 18,
    deliveryCharge: 50,
    freeDeliveryThreshold: 1000
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
          freeDeliveryThreshold: res.data.data.settings.freeDeliveryThreshold
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
      setMessage({ type: 'success', content: 'Sanctuary financial attributes refined successfully.' });
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
    <div className="max-w-4xl mx-auto space-y-6 pb-20 p-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Logistics & Tax Authority
          </h1>
          <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.3em] opacity-60">Global Sanctuary Configuration</p>
        </div>
        <div className="flex items-center gap-2 bg-brand-pink/5 px-3 py-1.5 rounded-full border border-brand-pink/10">
           <FiShield className="text-brand-pink" size={12} />
           <span className="text-[10px] font-black text-brand-pink uppercase tracking-widest">Secure Master Controls</span>
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

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tax Configuration */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold">
              <FiPercent size={20} />
            </div>
            <div>
              <h3 className="text-xs font-black text-brand-dark uppercase tracking-widest">Taxation Authority</h3>
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">GST & Cess Mapping</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-[#5C2E3E]/60 uppercase tracking-widest pl-1">Standard GST Rate (%)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={settings.taxRate}
                  onChange={(e) => setSettings({...settings, taxRate: parseFloat(e.target.value)})}
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-xs font-bold outline-none focus:border-brand-pink/30 focus:bg-white transition-all shadow-inner"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 font-black text-sm">%</span>
              </div>
              <p className="text-[8px] text-gray-400 italic">This rate will be applied globally to all sanctuary treasures unless specifically overridden.</p>
            </div>
          </div>
        </motion.div>

        {/* Delivery Configuration */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 bg-brand-pink/10 rounded-2xl flex items-center justify-center text-brand-pink">
              <FiTruck size={20} />
            </div>
            <div>
              <h3 className="text-xs font-black text-brand-dark uppercase tracking-widest">Sacred Logistics</h3>
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">Shipping & Handling Cost</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-[#5C2E3E]/60 uppercase tracking-widest pl-1">Standard Delivery Fee</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-black text-sm">₹</span>
                <input 
                  type="number" 
                  value={settings.deliveryCharge}
                  onChange={(e) => setSettings({...settings, deliveryCharge: parseFloat(e.target.value)})}
                  className="w-full bg-gray-50 border border-gray-100 p-4 pl-8 rounded-xl text-xs font-bold outline-none focus:border-brand-pink/30 focus:bg-white transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-[#5C2E3E]/60 uppercase tracking-widest pl-1">Free Shipping Threshold</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-black text-sm">₹</span>
                <input 
                  type="number" 
                  value={settings.freeDeliveryThreshold}
                  onChange={(e) => setSettings({...settings, freeDeliveryThreshold: parseFloat(e.target.value)})}
                  className="w-full bg-gray-50 border border-gray-100 p-4 pl-8 rounded-xl text-xs font-bold outline-none focus:border-brand-pink/30 focus:bg-white transition-all shadow-inner"
                  required
                />
              </div>
              <p className="text-[8px] text-brand-pink font-black uppercase tracking-tighter mt-1 italic">Orders above this divine value will enjoy free standard delivery.</p>
            </div>
          </div>
        </motion.div>

        {/* Save Controls */}
        <div className="md:col-span-2 flex items-center justify-between bg-[#2D1B19] p-6 rounded-3xl shadow-2xl border border-white/10">
           <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-white/40">
                 <FiSettings size={14} className="animate-spin-slow" />
              </div>
              <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest max-w-[200px] leading-tight">These changes are critical and will impact your sanctuary's checkout math immediately.</p>
           </div>
           <button 
             type="submit" 
             disabled={saving}
             className="w-full sm:w-auto bg-[#E8B4B8] text-brand-dark px-12 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl hover:bg-white transition-all disabled:opacity-50"
           >
              {saving ? 'Synchronizing...' : <><FiSave size={14} /> Commit Changes</>}
           </button>
        </div>
      </form>
      
      <style>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogistics;
