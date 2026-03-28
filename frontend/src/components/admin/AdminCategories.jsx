import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiMoreVertical, FiX, FiImage, FiArrowLeft, FiGrid, FiSmile, FiUploadCloud } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';
import { uploadToCloudinary } from '../../utils/cloudinary';

const AdminCategories = () => {
  const { categories, products, fetchData } = useShop();
  const [isAdding, setIsAdding] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({ name: '', image: '' });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Securely remove this category from the store hierarchy?')) {
      try {
        await api.delete(`/categories/${id}`);
        fetchData();
      } catch (err) {
        alert('Failed to delete category');
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (form.name && form.image) {
      setIsSubmitting(true);
      try {
        if (editingCat) {
          await api.patch(`/categories/${editingCat._id}`, form);
        } else {
          await api.post('/categories', form);
        }
        fetchData();
        setIsAdding(false);
        setForm({ name: '', image: '' });
        setEditingCat(null);
      } catch (err) {
        alert('Failed to save category');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert('Please provide a name and an image.');
    }
  };

  const startEdit = (cat) => {
    setEditingCat(cat);
    setForm({ name: cat.name, image: cat.image || '' });
    setIsAdding(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 min-h-screen">
      <AnimatePresence mode="wait">
        {!isAdding ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
                  Store Categories
                </h1>
                <p className="text-[8px] text-gray-400 font-medium uppercase tracking-[0.2em]">Manage your product hierarchy</p>
              </div>
              <button
                onClick={() => { setEditingCat(null); setForm({ name: '', image: '' }); setIsAdding(true); }}
                className="bg-brand-dark text-white px-5 py-2 rounded-none text-[9px] font-bold uppercase tracking-widest shadow-xl shadow-brand-dark/20 flex items-center gap-2 hover:bg-black transition-all"
              >
                <FiPlus /> Add New Category
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {categories.map((cat, i) => {
                const productCount = products.filter(p => p.category === cat.name || p.category?._id === cat._id).length;
                return (
                  <motion.div
                    key={cat._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-16 bg-brand-light/10 relative overflow-hidden">
                      <img
                        src={cat.image || 'https://via.placeholder.com/150?text=NO+IMAGE'}
                        alt={cat.name}
                        className="w-full h-full object-contain grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 p-1 bg-white"
                      />
                    </div>
                    <div className="p-2 border-t border-gray-50">
                      <h3 className="text-[9px] font-black text-brand-dark uppercase tracking-wider leading-none mb-1 group-hover:text-brand-pink transition-colors truncate">{cat.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[7px] text-brand-pink font-black uppercase tracking-tighter">{productCount} Items</span>
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); startEdit(cat); }} className="p-1 text-brand-dark hover:bg-brand-pink/10 transition-all"><FiEdit2 size={10} /></button>
                          <button onClick={(e) => { e.stopPropagation(); handleDelete(cat._id); }} className="p-1 text-red-500 hover:bg-red-50 transition-all"><FiTrash2 size={10} /></button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <button
                onClick={() => { setEditingCat(null); setForm({ name: '', image: '' }); setIsAdding(true); }}
                className="h-full min-h-[90px] border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-brand-pink/30 hover:text-brand-pink hover:bg-brand-pink/[0.02] transition-all group bg-white"
              >
                <FiPlus size={14} className="group-hover:scale-110 transition-transform" />
                <span className="text-[7px] font-black uppercase tracking-[0.1em]">Divine New</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="add"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-md mx-auto bg-white rounded-2xl border border-brand-pink/10 shadow-2xl p-5 relative overflow-hidden font-sans"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-dark" />
            <button
              onClick={() => setIsAdding(false)}
              className="absolute top-4 right-4 p-1.5 bg-gray-50 text-brand-dark rounded-lg hover:bg-brand-pink/10 transition-all font-bold"
            >
              <FiX size={12} />
            </button>

            <div className="mb-5 text-center pt-1 font-serif">
              <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center text-brand-dark mx-auto mb-2 border border-brand-pink/5 shadow-inner">
                <FiGrid size={18} />
              </div>
              <h2 className="text-lg font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
                {editingCat ? 'Edit Category' : 'New Category'}
              </h2>
              <p className="text-[7px] text-gray-400 font-black uppercase tracking-[0.2em] opacity-60">Store hierarchy hub</p>
            </div>

            <form onSubmit={handleAdd} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[8px] font-black text-brand-dark/40 uppercase tracking-widest ml-1">Title</label>
                <div className="relative">
                  <FiEdit2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={12} />
                  <input
                    type="text"
                    placeholder="e.g. Organic Soaps"
                    className="w-full bg-gray-50 border border-gray-100 p-2.5 pl-10 rounded-lg text-[10px] font-black uppercase tracking-wider outline-none focus:border-brand-pink/30 focus:bg-white transition-all shadow-inner"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[8px] font-black text-brand-dark/40 uppercase tracking-widest ml-1">Category Visual</label>
                <div
                  onClick={() => document.getElementById('category-upload').click()}
                  className="relative h-24 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-brand-pink/[0.02] hover:border-brand-pink/30 transition-all overflow-hidden"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-1 animate-pulse">
                      <FiUploadCloud className="text-brand-pink animate-bounce" size={20} />
                      <span className="text-[7px] font-black text-brand-pink uppercase">Uploading...</span>
                    </div>
                  ) : form.image ? (
                    <div className="w-full h-full p-2">
                      <img src={form.image} alt="Preview" className="w-full h-full object-contain" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <FiUploadCloud className="text-white" size={20} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <FiImage className="text-gray-300" size={20} />
                      <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Select Visual Asset</span>
                    </>
                  )}
                  <input
                    id="category-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="w-full bg-brand-dark text-white py-3 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-dark/20 flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98] group disabled:opacity-50 font-serif"
                >
                  {isSubmitting ? 'Syncing...' : (isUploading ? 'Waiting for Upload...' : (editingCat ? 'Save Hierarchy' : 'Create Category'))}
                  <FiX size={10} className="rotate-45 group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCategories;
