import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import {
    FiZap,
    FiSearch,
    FiCheckCircle,
    FiTarget,
    FiStar,
    FiImage,
    FiArrowRight,
    FiLoader,
    FiEdit2,
    FiX
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';
import { Link } from 'react-router-dom';

const AdminOffers = () => {
    const { products, fetchData } = useShop();
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpdating, setIsUpdating] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({ price: '', oldPrice: '' });

    // Toggle flashSale status
    const toggleOffer = async (product) => {
        setIsUpdating(product._id);
        try {
            await api.patch(`/products/${product._id}`, {
                flashSale: !product.flashSale
            });
            await fetchData(); // Refresh data
        } catch (err) {
            alert('Failed to update offer status: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsUpdating(null);
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setEditForm({
            price: product.price,
            oldPrice: product.oldPrice || ''
        });
    };

    const handleUpdateProduct = async () => {
        setIsUpdating(editingProduct._id);
        try {
            await api.patch(`/products/${editingProduct._id}`, {
                price: Number(editForm.price),
                oldPrice: editForm.oldPrice ? Number(editForm.oldPrice) : null
            });
            setEditingProduct(null);
            await fetchData();
        } catch (err) {
            alert('Update failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsUpdating(null);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const offerProducts = products.filter(p => p.flashSale);

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-20">
            {/* Dynamic Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
                        Divine Offers Management
                    </h1>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider leading-none">
                        Manage your sales, daily deals, and promotional spotlights.
                    </p>
                </div>

                <Link to="/admin/banners" className="bg-brand-pink text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-brand-pink/20 hover:opacity-90 transition-all">
                    <FiImage size={16} /> Manage Offer Banners
                </Link>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                        <FiZap size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Offers</p>
                        <p className="text-2xl font-serif font-black text-brand-dark">{offerProducts.length}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                        <FiTarget size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Reach</p>
                        <p className="text-2xl font-serif font-black text-brand-dark">High</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500">
                        <FiStar size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Strategy</p>
                        <p className="text-2xl font-serif font-black text-brand-dark italic">Divine Savings</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Active Offers Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                            <h3 className="text-[11px] font-black text-brand-dark uppercase tracking-widest">Current Spotlights</h3>
                        </div>
                        <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto custom-sidebar-scrollbar">
                            {offerProducts.length > 0 ? offerProducts.map(p => (
                                <div key={p._id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="w-10 h-10 bg-white rounded-lg p-1 overflow-hidden shrink-0">
                                        <img src={p.image} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold text-gray-800 truncate">{p.name}</p>
                                        <p className="text-[9px] font-black text-brand-pink">₹{p.price} <span className="text-gray-400 line-through ml-1">{p.oldPrice ? `₹${p.oldPrice}` : ''}</span></p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => handleEditClick(p)} className="p-1.5 text-gray-400 hover:text-brand-dark"><FiEdit2 size={12} /></button>
                                        <button
                                            onClick={() => toggleOffer(p)}
                                            className="p-1.5 text-red-300 hover:text-red-500 transition-colors"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-10">
                                    <FiZap className="mx-auto text-gray-200 mb-2" size={32} />
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                                        No active offers detected. <br /> Spotlight some products below.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-brand-dark rounded-2xl p-6 text-white overflow-hidden relative">
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-brand-gold italic">Pro Tip</h3>
                        <p className="text-[10px] font-medium text-white/70 leading-relaxed">
                            Products in this list will automatically be prioritized on the user's "Divine Savings" page. Ensure your titles are catchy!
                        </p>
                    </div>
                </div>

                {/* Product Selection List */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h3 className="text-[11px] font-black text-brand-dark uppercase tracking-widest">Select Products for Sale</h3>
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                                <input
                                    type="text"
                                    placeholder="Filter by name..."
                                    className="bg-gray-50 border border-transparent focus:border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[11px] font-medium outline-none transition-all w-full md:w-64"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">PRODUCT</th>
                                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">CATEGORY</th>
                                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">PRICE</th>
                                        <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredProducts.map(p => (
                                        <tr key={p._id} className={`hover:bg-gray-50/50 transition-colors ${p.flashSale ? 'bg-orange-50/10' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={p.image} className="w-8 h-8 rounded p-0.5 bg-gray-50 object-contain" alt="" />
                                                    <span className="text-[11px] font-bold text-gray-800 line-clamp-1">{p.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">{p.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-xs text-brand-dark">₹{p.price}</span>
                                                    {p.oldPrice && <span className="text-[9px] text-gray-400 line-through">₹{p.oldPrice}</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center items-center gap-3">
                                                    <button onClick={() => handleEditClick(p)} className="p-2 bg-gray-100 hover:bg-brand-dark hover:text-white rounded-lg transition-all"><FiEdit2 size={14} /></button>
                                                    <button
                                                        onClick={() => toggleOffer(p)}
                                                        disabled={isUpdating === p._id}
                                                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all ${p.flashSale
                                                            ? 'bg-orange-500 text-white shadow-md'
                                                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        {isUpdating === p._id ? (
                                                            <FiLoader className="animate-spin" />
                                                        ) : (
                                                            p.flashSale ? <><FiCheckCircle /> Listed</> : 'Market as Offer'
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setEditingProduct(null)}
                            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest">Adjust Offer Price</h3>
                                <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-brand-dark"><FiX size={20} /></button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sale Price (Current)</label>
                                    <input
                                        type="number"
                                        value={editForm.price}
                                        onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-brand-pink transition-all"
                                        placeholder="Enter Sale Price"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Original Price (Strike-through)</label>
                                    <input
                                        type="number"
                                        value={editForm.oldPrice}
                                        onChange={e => setEditForm({ ...editForm, oldPrice: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-brand-pink transition-all"
                                        placeholder="Enter Original Price (optional)"
                                    />
                                </div>

                                <button
                                    onClick={handleUpdateProduct}
                                    disabled={isUpdating === editingProduct._id}
                                    className="w-full bg-brand-dark text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-xl shadow-brand-dark/20 disabled:opacity-50 mt-4"
                                >
                                    {isUpdating === editingProduct._id ? 'Updating Database...' : 'Commit Price Changes'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Internal icon for specific removal
const FiTrash2 = ({ size }) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={size} width={size}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

export default AdminOffers;
