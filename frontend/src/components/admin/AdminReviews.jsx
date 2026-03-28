import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import { FiStar, FiTrash2, FiCheckCircle, FiXCircle, FiMessageSquare, FiRefreshCw, FiArrowLeft, FiUser } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get('/reviews');
            setReviews(res.data.data.reviews);
        } catch (err) {
            console.error("Failed to fetch product reviews:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleDelete = async (id) => {
        if (window.confirm("Permanently archive this product feedback? This might affect product ratings.")) {
            try {
                await api.delete(`/reviews/${id}`);
                fetchReviews();
            } catch (err) {
                alert("Failed to archive review.");
            }
        }
    };

    const handleToggleApproval = async (id) => {
        try {
            await api.patch(`/reviews/${id}/toggle-approval`);
            fetchReviews();
        } catch (err) {
            alert("Failed to toggle approval status.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-4 font-serif min-h-screen">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-black text-brand-dark uppercase tracking-widest leading-none mb-1">Feedback Ledger</h1>
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-60">Verified Product Ratings & Commentary</p>
                </div>
                <button onClick={fetchReviews} className="flex items-center gap-1.5 bg-brand-light/20 px-3 py-1.5 border border-brand-pink/10 text-[8px] font-black uppercase tracking-widest text-brand-dark shadow-sm hover:bg-white transition-colors">
                    <FiRefreshCw size={10} className={loading ? 'animate-spin' : ''} /> Sync Reviews
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-1 pb-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-brand-dark/40">Product Info</th>
                                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-brand-dark/40">Customer</th>
                                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-brand-dark/40">Rating / Commentary</th>
                                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-brand-dark/40">Status</th>
                                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-brand-dark/40 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">Syncing Global Feedback...</td></tr>
                            ) : reviews.length > 0 ? (
                                reviews.map((r) => (
                                    <tr key={r._id} className="hover:bg-brand-pink/[0.01] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-50 rounded-lg p-1 border border-brand-pink/10">
                                                    <img src={r.product?.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <span className="text-[10px] font-black text-brand-dark uppercase tracking-tighter truncate max-w-[120px]">
                                                    {r.product?.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-gray-700">{r.user?.name}</span>
                                                <span className="text-[7px] text-gray-400 font-bold uppercase tracking-widest">{r.user?.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <div className="flex items-center gap-0.5 text-brand-gold mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <FiStar key={i} size={8} className={i < r.rating ? 'fill-brand-gold' : 'text-gray-200'} />
                                                ))}
                                                <span className="text-[8px] font-black text-brand-gold ml-1">{r.rating}.0</span>
                                            </div>
                                            <p className="text-[10px] text-gray-600 line-clamp-2 italic">"{r.review}"</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleToggleApproval(r._id)} className="focus:outline-none">
                                                {r.isApproved ? (
                                                    <span className="px-2 py-1 text-[6px] font-black uppercase tracking-widest bg-green-50 text-green-600 border border-green-100 rounded-lg flex items-center gap-1 w-fit cursor-pointer hover:bg-green-100 transition-colors">
                                                        <FiCheckCircle size={8} /> Internal Live
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 text-[6px] font-black uppercase tracking-widest bg-red-50 text-red-600 border border-red-100 rounded-lg flex items-center gap-1 w-fit cursor-pointer hover:bg-red-100 transition-colors">
                                                        <FiXCircle size={8} /> Hidden
                                                    </span>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(r._id)}
                                                className="p-1.5 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <FiTrash2 size={12} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest italic leading-relaxed">No Product Feedback Record Found In Current Audit</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminReviews;
