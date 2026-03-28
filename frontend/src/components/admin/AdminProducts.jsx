import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiX,
  FiImage,
  FiChevronDown,
  FiFilter,
  FiStar,
  FiArrowLeft,
  FiUploadCloud
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';
import { uploadToCloudinary } from '../../utils/cloudinary';

const AdminProducts = () => {
  const { products, categories, fetchData } = useShop();
  const [searchParams] = useSearchParams();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filter, setFilter] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: '',
    subCategory: '',
    price: '',
    stock: true,
    image: '',
    description: '',
    badge: '',
    about: []
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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

  const handleAboutChange = (index, value) => {
    const newAbout = [...form.about];
    newAbout[index] = value;
    setForm(prev => ({ ...prev, about: newAbout }));
  };

  const addAboutPoint = () => {
    setForm(prev => ({ ...prev, about: [...(prev.about || []), ''] }));
  };

  const removeAboutPoint = (index) => {
    const newAbout = form.about.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, about: newAbout }));
  };

  // Handle Filtering and Searching
  const filteredProducts = products.filter(p => {
    // Category Filter
    const matchesFilter = filter === 'All Categories' || p.category === filter;

    // Search Query (Name, ID, or direct price match)
    const searchLower = searchQuery.toLowerCase().trim();
    const nameMatch = (p.name || '').toLowerCase().includes(searchLower);
    const skuMatch = String(p._id).toLowerCase().includes(searchLower);
    const priceMatch = searchQuery !== '' && String(p.price).includes(searchLower);
    const matchesSearch = searchQuery === '' || nameMatch || skuMatch || priceMatch;

    // Range Filters
    const pPrice = Number(p.price);
    const min = minPrice !== '' ? Number(minPrice) : -Infinity;
    const max = maxPrice !== '' ? Number(maxPrice) : Infinity;

    const matchesMinPrice = pPrice >= min;
    const matchesMaxPrice = pPrice <= max;

    return matchesFilter && matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  const handleDelete = async (id) => {
    if (window.confirm('Remove this product permanently from the sacred catalog?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchData(); // Refresh global products
      } catch (err) {
        alert('Failed to remove product: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      subCategory: product.subCategory || '',
      price: product.price,
      stock: product.stock > 0,
      image: product.image,
      description: product.description || '',
      badge: product.badge || '',
      about: product.about || []
    });
    setIsAdding(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || !form.image) {
      alert('Please fill out Name, Category, Price, and Image.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: form.stock ? 100 : 0, // Simplified stock for now
        status: 'active',
        about: form.about.filter(point => point.trim() !== '') // Clean empty points
      };

      if (editingProduct) {
        await api.patch(`/products/${editingProduct._id}`, payload);
      } else {
        await api.post('/products', payload);
      }

      setIsAdding(false);
      setEditingProduct(null);
      setForm({ name: '', category: '', subCategory: '', price: '', stock: true, image: '', description: '', badge: '', about: [] });
      fetchData();
    } catch (err) {
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      setIsAdding(true);
      setEditingProduct(null);
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto space-y-5 pb-10">
      <AnimatePresence mode="wait">
        {!isAdding ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
                  PRODUCTS
                </h1>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider leading-none">
                  MANAGE YOUR INVENTORY, PRICING, AND PRODUCT DETAILS.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setForm({ name: '', category: '', subCategory: '', price: '', stock: true, image: '', description: '', badge: '', about: [] });
                  setIsAdding(true);
                }}
                className="bg-brand-dark text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-black/10 hover:bg-black transition-all"
              >
                <FiPlus size={16} /> Add New Product
              </button>
            </div>

            {/* Compact Filter Bar */}
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                <input
                  type="text"
                  placeholder="Search products by name..."
                  className="w-full bg-gray-50 border border-transparent focus:border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[11px] font-medium outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  className="bg-gray-50 border border-transparent focus:border-gray-200 rounded-lg px-3 py-2 text-[11px] font-bold outline-none cursor-pointer"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All Categories</option>
                  {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                </select>

                <button
                  onClick={() => { setFilter('All Categories'); setSearchQuery(''); setMinPrice(''); setMaxPrice(''); }}
                  className="bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg px-4 py-2 text-[11px] font-bold text-gray-600 transition-all"
                >
                  All
                </button>

                <div className="flex items-center gap-1 bg-gray-50 border border-transparent rounded-lg px-2 py-1">
                  <span className="text-[10px] text-gray-400 font-bold px-1">₹</span>
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-12 bg-transparent border-none outline-none text-[11px] font-bold"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="text-gray-300">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-12 bg-transparent border-none outline-none text-[11px] font-bold"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Product Table - High Density */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PRODUCT NAME</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">CATEGORY</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PLACEMENT</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PRICE</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">STOCK</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredProducts.length > 0 ? filteredProducts.map(p => (
                      <tr key={p._id} className="hover:bg-gray-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-1 flex-shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-gray-800 group-hover:text-brand-pink transition-colors line-clamp-1">{p.name}</span>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: {p._id.slice(-6)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-gray-600">{p.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[9px] font-bold uppercase rounded leading-none">{p.subCategory || 'General'}</span>
                            {p.badge && (
                              <span className="px-2 py-0.5 bg-brand-pink/5 text-brand-pink text-[9px] font-bold uppercase rounded leading-none max-w-[80px] truncate">{p.badge}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-gray-800">₹{p.price}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex px-2 py-1 rounded-lg text-[9px] font-bold uppercase leading-none ${p.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 text-gray-300">
                            <button onClick={() => handleEdit(p)} className="p-1.5 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors"><FiEdit2 size={14} /></button>
                            <button onClick={() => handleDelete(p._id)} className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"><FiTrash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="6" className="py-12 text-center text-[10px] font-black uppercase text-gray-400 tracking-widest">No Products Match The Filter</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="add"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Create Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsAdding(false)}
                  className="w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-800 hover:shadow-md transition-all shadow-sm flex-shrink-0"
                >
                  <FiArrowLeft size={16} />
                </button>
                <div>
                  <h1 className="text-xl font-serif font-black text-brand-dark tracking-tight mb-0.5 uppercase">
                    {editingProduct ? 'Update Product Details' : 'CREATE NEW PRODUCT'}
                  </h1>
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider leading-none">
                    STORE METADATA & INVENTORY MANAGEMENT
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setIsAdding(false)} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-brand-dark">Discard</button>
                <button
                  onClick={handleSaveProduct}
                  disabled={isSubmitting || isUploading}
                  className="bg-brand-dark text-white px-7 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-black/10 hover:bg-black transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Syncing...' : (isUploading ? 'Uploading Visual...' : (editingProduct ? 'Commit Edits' : 'Publish Product'))}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-sans">
              {/* Left Column: Visuals & Labels */}
              <div className="lg:col-span-4 space-y-4">
                {/* Visual Gallery */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">Visual Gallery</h3>
                  <div
                    onClick={() => document.getElementById('product-upload').click()}
                    className="aspect-[4/3] bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 overflow-hidden relative cursor-pointer hover:bg-brand-pink/[0.02] transition-all"
                  >
                    {isUploading ? (
                      <div className="flex flex-col items-center animate-pulse gap-2">
                        <FiUploadCloud className="text-brand-pink animate-bounce" size={32} />
                        <span className="text-[10px] font-black text-brand-pink uppercase tracking-widest">Uploading Asset...</span>
                      </div>
                    ) : form.image ? (
                      <img src={form.image} alt="Preview" className="w-full h-full object-contain p-2" />
                    ) : (
                      <div className="flex flex-col items-center space-y-2 text-gray-300">
                        <FiImage size={32} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Select Visual Product</span>
                      </div>
                    )}

                    {!isUploading && form.image && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <FiUploadCloud className="text-white" size={32} />
                      </div>
                    )}
                    <input
                      id="product-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* Card Display Labels */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">Card Display Properties</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-400 lowercase italic">Badge Promo (e.g. BESTSELLER)</label>
                      <input type="text" name="badge" value={form.badge} onChange={handleInputChange} placeholder="NEW ARRIVAL" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[10px] font-bold outline-none focus:border-gray-300 transition-all uppercase" />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <input type="checkbox" name="stock" checked={form.stock} onChange={handleInputChange} id="stock-check" className="w-4 h-4 accent-brand-dark" />
                      <label htmlFor="stock-check" className="text-[10px] font-bold text-gray-600 uppercase tracking-widest cursor-pointer">Live In Stock</label>
                    </div>
                  </div>
                </div>

                {/* About This Item Selection */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">ABOUT THIS ITEM</h3>
                    <button type="button" onClick={addAboutPoint} className="text-[9px] font-black text-brand-pink uppercase hover:underline flex items-center gap-1">
                      <FiPlus size={10} /> Add Point
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.about?.map((point, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => handleAboutChange(idx, e.target.value)}
                          placeholder={`Point ${idx + 1}...`}
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[10px] font-bold outline-none focus:border-gray-300 transition-all shadow-inner"
                        />
                        <button type="button" onClick={() => removeAboutPoint(idx)} className="text-red-300 hover:text-red-500 transition-colors">
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    ))}
                    {form.about?.length === 0 && (
                      <p className="text-center py-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 text-[8px] font-bold text-gray-300 uppercase tracking-widest">No Bullet Points Added</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Core Info */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">Core Information</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500">Product Title <span className="text-red-500">*</span></label>
                        <input type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="e.g. Gold Floral Ring" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[13px] font-bold outline-none focus:border-gray-300 transition-all shadow-inner" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500">Price (₹) <span className="text-red-500">*</span></label>
                        <input type="number" name="price" value={form.price} onChange={handleInputChange} placeholder="999" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[13px] font-bold outline-none focus:border-gray-300 transition-all shadow-inner" required />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500">Description</label>
                      <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Tell us more about the product features..." className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[11px] font-medium outline-none h-24 focus:border-gray-300 transition-all resize-none shadow-inner"></textarea>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-gray-500">Master Category <span className="text-red-500">*</span></label>
                      </div>
                      <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-2">
                        <div className="relative">
                          <select name="category" value={form.category} onChange={handleInputChange} className="w-full bg-white border border-gray-100 rounded-lg px-3 py-2.5 text-xs font-bold outline-none focus:border-gray-300 transition-all appearance-none cursor-pointer text-gray-700 shadow-sm" required>
                            <option value="">Select Category Assignment Form</option>
                            {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                          </select>
                          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider flex justify-between">
                    <span>Navigation Sub-Placement</span>
                    <span className="text-gray-400 font-normal normal-case">Optional</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['SKINCARE', 'MAKEUP', 'SOAPS', 'WELLNESS', 'JEWELLERY', 'INNERWEAR', 'HAIRCARE', 'COMBOS', 'NEW LAUNCH'].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, subCategory: tag }))}
                        className={`py-2 px-3 border rounded-lg transition-all text-[9px] font-bold uppercase tracking-widest leading-none ${form.subCategory === tag ? 'bg-brand-pink/10 border-brand-pink/40 text-brand-pink shadow-inner' : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-white hover:border-gray-300'}`}
                      >
                        {tag}
                      </button>
                    ))}
                    {form.subCategory && (
                      <button type="button" onClick={() => setForm(prev => ({ ...prev, subCategory: '' }))} className="py-2 px-3 bg-red-50 text-red-500 text-[9px] font-bold uppercase tracking-widest rounded-lg hover:bg-red-100 transition-all border border-red-100">
                        Clear Tag
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
