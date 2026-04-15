import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { FiEdit2, FiPlus, FiTrash2, FiEye, FiImage, FiX, FiUploadCloud } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadToCloudinary } from '../../utils/cloudinary';

const AdminBanners = () => {
  const { banners, fetchData } = useShop();
  const [isAdding, setIsAdding] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    image: '',
    link: '',
    type: 'Main Slider',
    description: '',
    subtitle: '',
    price: '',
    btnText: 'SHOP NOW',
    isVideo: false
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      const isVideo = file.type.startsWith('video/');
      setForm(prev => ({ ...prev, image: url, isVideo }));
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Securely remove this visual asset? This will reflect on the live storefront.')) {
      try {
        await api.delete(`/banners/${id}`);
        fetchData();
      } catch (err) {
        alert('Failed to remove banner');
      }
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setForm({
      title: banner.title || '',
      image: banner.image || '',
      link: banner.link || '',
      type: banner.type || 'Main Slider',
      description: banner.description || '',
      subtitle: banner.subtitle || '',
      price: banner.price || '',
      btnText: banner.btnText || 'SHOP NOW',
      isVideo: banner.isVideo || false
    });
    setIsAdding(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return alert('Please upload an asset.');

    setLoading(true);
    try {
      if (editingBanner) {
        await api.patch(`/banners/${editingBanner._id}`, form);
      } else {
        await api.post('/banners', form);
      }
      setIsAdding(false);
      setEditingBanner(null);
      setForm({ title: '', image: '', link: '', type: 'Main Slider', description: '', subtitle: '', price: '', btnText: 'SHOP NOW', isVideo: false });
      fetchData();
    } catch (err) {
      console.error('API Error:', err);
      alert(editingBanner ? `Error updating banner: ${err.response?.data?.message || err.message}` : `Error creating banner: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingBanner(null);
    setForm({ title: '', image: '', link: '', type: 'Main Slider', description: '', subtitle: '', price: '', btnText: 'SHOP NOW', isVideo: false });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Store Banners
          </h1>
          <p className="text-[8px] text-gray-400 font-medium uppercase tracking-[0.2em]">Visual Merchandising Assets</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-brand-dark text-white px-5 py-2 rounded-none text-[9px] font-bold uppercase tracking-widest shadow-xl shadow-brand-dark/20 flex items-center gap-2 hover:bg-black transition-all"
        >
          <FiPlus /> New Banner
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="bg-white border border-brand-pink/20 p-4 rounded-none shadow-sm space-y-4 font-sans"
          >
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-dark font-serif">
                {editingBanner ? 'Edit Campaign Banner' : 'Create Campaign Banner'}
              </h3>
              <button onClick={handleCancel}><FiX size={14} /></button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-400">Campaign Title</label>
                <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full bg-gray-50 border-none text-[10px] font-bold p-2 outline-none" placeholder="e.g. Summer Radiance" />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-400">Subtitle</label>
                <input type="text" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="w-full bg-gray-50 border-none text-[10px] font-bold p-2 outline-none" placeholder="Seasonal Sale | 50% Off" />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-400">Display Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-gray-50 border-none text-[10px] font-bold p-2 outline-none">
                  <option>Main Slider</option>
                  <option>Mid-Section</option>
                  <option>Category Banner</option>
                  <option>Trending</option>
                  <option>Offers</option>
                  <option>AppPromo</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-400">Starting Price / Badge</label>
                <input type="text" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full bg-gray-50 border-none text-[10px] font-bold p-2 outline-none" placeholder="₹300" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[8px] font-black uppercase text-gray-400">Description / Tagline</label>
                <input type="text" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-gray-50 border-none text-[10px] font-bold p-2 outline-none" placeholder="Grab the best deals on Skincare..." />
              </div>

              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-400">CTA Button Text</label>
                <input type="text" value={form.btnText} onChange={e => setForm({ ...form, btnText: e.target.value })} className="w-full bg-gray-50 border-none text-[10px] font-bold p-2 outline-none" placeholder="SHOP NOW" />
              </div>

              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-400">Landing Path</label>
                <input type="text" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className="w-full bg-gray-50 border-none text-[10px] font-bold p-2 outline-none" placeholder="/shop/skincare" />
              </div>

              <div className="space-y-1 md:col-span-4">
                <label className="text-[8px] font-black uppercase text-gray-400">Campaign Visual (Image or Video)</label>
                <div
                  onClick={() => document.getElementById('banner-upload').click()}
                  className="relative aspect-[21/9] md:aspect-[32/9] bg-gray-50 border border-dashed border-gray-200 rounded-none flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-brand-pink/[0.02] hover:border-brand-pink/30 transition-all overflow-hidden"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-1 animate-pulse">
                      <FiUploadCloud className="text-brand-pink animate-bounce" size={24} />
                      <span className="text-[8px] font-black text-brand-pink uppercase tracking-widest">Uploading Asset...</span>
                    </div>
                  ) : form.image ? (
                    <div className="w-full h-full relative group">
                      {form.isVideo ? (
                        <video src={form.image} className="w-full h-full object-cover" muted loop autoPlay />
                      ) : (
                        <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <FiUploadCloud className="text-white" size={24} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                      <FiImage size={24} />
                      <span className="text-[8px] font-black uppercase tracking-widest">Select Visual Content</span>
                    </div>
                  )}
                  <input
                    id="banner-upload"
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading || isUploading} className="md:col-span-2 lg:col-span-4 bg-brand-gold text-white text-[9px] font-black uppercase py-4 tracking-[0.2em] shadow-lg shadow-brand-gold/10 hover:bg-brand-dark transition-all disabled:opacity-50">
                {loading ? 'Saving Changes...' : (isUploading ? 'Finalizing Asset...' : (editingBanner ? 'Update Campaign' : 'Deploy Campaign'))}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {banners.map((banner) => {
          return (
            <div key={banner._id} className="bg-white rounded-none border border-brand-pink/10 shadow-sm group relative overflow-hidden">
              <div className="p-1">
                <div className="relative aspect-[21/9] bg-brand-light overflow-hidden rounded-none">
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all group-hover:scale-105" />
                  <div className="absolute top-1 left-1 flex gap-1">
                    <span className="bg-brand-dark/80 text-white text-[5px] font-black px-1 py-0.5 rounded-none uppercase tracking-widest backdrop-blur-sm">{banner.type}</span>
                  </div>

                </div>
              </div>

              <div className="p-3 bg-white border-t border-brand-pink/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="text-[9px] font-black text-brand-dark uppercase tracking-widest mb-0.5 truncate">{banner.title}</h3>
                    <span className="text-[7px] text-gray-400 font-bold uppercase tracking-tighter block">URL: {banner.link || 'Internal'}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                    <span className="text-[7px] font-black text-green-500 uppercase tracking-tighter">Live</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-gray-50/50">
                  <button onClick={() => window.open(banner.image, '_blank')} className="flex items-center gap-1.5 text-[8px] font-black uppercase text-brand-dark hover:text-brand-pink transition-colors">
                    <FiEye size={10} /> View
                  </button>
                  <span className="text-gray-100">|</span>
                  <button onClick={() => handleEdit(banner)} className="flex items-center gap-1.5 text-[8px] font-black uppercase text-brand-dark hover:text-brand-gold transition-colors">
                    <FiEdit2 size={10} /> Edit
                  </button>
                  <span className="text-gray-100">|</span>
                  <button onClick={() => handleDelete(banner._id)} className="flex items-center gap-1.5 text-[8px] font-black uppercase text-red-400 hover:text-red-600 transition-colors">
                    <FiTrash2 size={10} /> Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <button
          onClick={() => setIsAdding(true)}
          className="border border-dashed border-brand-pink/10 rounded-none h-24 flex flex-col items-center justify-center gap-1 text-gray-300 hover:border-brand-pink hover:text-brand-pink hover:bg-brand-pink/[0.02] transition-all group bg-white/40"
        >
          <FiImage size={16} className="group-hover:scale-110 transition-transform" />
          <span className="text-[6px] font-bold uppercase tracking-widest">Add Asset</span>
        </button>
      </div>
    </div>
  );
};

export default AdminBanners;
