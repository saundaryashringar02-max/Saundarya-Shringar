import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRotateCcw, FiRefreshCw, FiSearch, FiCheck, FiX, FiMessageSquare, FiImage } from 'react-icons/fi';
import api from '../../utils/api';

const AdminReturns = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Refunds'); // 'Refunds' or 'Replacements'

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await api.get('/orders');
            // Filter out orders that are NOT null and NOT 'Not Requested' safely
            const rmaOrders = res.data.data.orders.filter(
                o => ['Refund', 'Replace'].includes(o.returnAction) && o.returnStatus !== 'Not Requested'
            );
            setOrders(rmaOrders);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateReturnStatus = async (id, newStatus) => {
        try {
            await api.patch(`/orders/${id}/process-return`, { returnStatus: newStatus });
            fetchRequests();
        } catch (error) {
            alert("Failed to update status: " + (error.response?.data?.message || error.message));
        }
    };

    // Split items into tabs dynamically securely safely.
    const displayedOrders = orders.filter(o =>
        (activeTab === 'Refunds' ? o.returnAction === 'Refund' : o.returnAction === 'Replace') &&
        (
            o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.returnReason?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-serif text-[#5C2E3E] font-black uppercase tracking-tighter flex items-center gap-3">
                        <FiRotateCcw className="text-brand-pink" /> RMA <span className="text-brand-gold italic">Centre</span>
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#5C2E3E]/40 mt-2">
                        Process Returns, Refunds & Replacements comprehensively
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="SEARCH BY ID OR REASON..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-gray-100 pl-10 pr-4 py-2.5 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-brand-pink transition-colors h-10 shadow-sm"
                        />
                    </div>
                    <button onClick={fetchRequests} className="h-10 px-4 bg-[#5C2E3E] text-white flex items-center justify-center hover:bg-brand-pink transition-colors shadow-md">
                        <FiRefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 mb-6">
                <button
                    onClick={() => setActiveTab('Refunds')}
                    className={`flex-1 md:flex-none px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'Refunds' ? 'text-white bg-brand-pink shadow-md' : 'text-gray-400 hover:text-brand-pink hover:bg-brand-pink/5'
                        }`}
                >
                    Return & Refund
                </button>
                <button
                    onClick={() => setActiveTab('Replacements')}
                    className={`flex-1 md:flex-none px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'Replacements' ? 'text-white bg-brand-gold shadow-md' : 'text-gray-400 hover:text-brand-gold hover:bg-brand-gold/5'
                        }`}
                >
                    Replacements
                </button>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center bg-white border border-gray-100 shadow-sm">
                    <div className="w-8 h-8 rounded-full border-2 border-brand-pink border-t-transparent animate-spin"></div>
                </div>
            ) : displayedOrders.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center bg-white border border-gray-100 shadow-sm">
                    {activeTab === 'Refunds' ? <FiRotateCcw className="text-4xl text-gray-200 mb-3" /> : <FiRefreshCw className="text-4xl text-gray-200 mb-3" />}
                    <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase">No Active {activeTab} Selected</p>
                </div>
            ) : (
                <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#FDFCFB] border-b border-gray-100">
                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Issue Details</th>
                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400 text-center">Amount</th>
                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400 text-center">Status</th>
                                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <AnimatePresence>
                                    {displayedOrders.map((order) => (
                                        <motion.tr
                                            key={order._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`group transition-colors ${order.returnStatus?.includes('Requested') ? 'bg-orange-50/50 hover:bg-orange-50' : 'hover:bg-gray-50'}`}
                                        >
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-black text-[#5C2E3E] tracking-widest uppercase">{order.orderId}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-gray-800">{order.shippingAddress?.name || order.user?.name}</span>
                                                    <span className="text-[9px] text-gray-500 truncate max-w-[120px]">{order.shippingAddress?.phone || order.user?.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-sm">
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="flex gap-2 items-center flex-wrap">
                                                        {order.items.slice(0, 2).map((item, idx) => (
                                                            <div key={idx} className="flex items-center gap-1.5 bg-white border border-gray-100 p-1 rounded-sm">
                                                                <img src={item.image} alt="" className="w-6 h-6 object-cover bg-gray-50" />
                                                                <span className="text-[8px] font-bold truncate max-w-[60px]">{item.name}</span>
                                                            </div>
                                                        ))}
                                                        {order.items.length > 2 && <span className="text-[8px] font-bold text-gray-400">+{order.items.length - 2} more</span>}
                                                    </div>
                                                    {order.returnReason && (
                                                        <div className="mt-1 flex gap-2 items-start bg-red-50 p-2 rounded-sm border border-red-100/50">
                                                            <FiMessageSquare className="text-red-400 mt-0.5 shrink-0" size={10} />
                                                            <p className="text-[10px] font-serif italic text-red-900 leading-snug break-words">"{order.returnReason}"</p>
                                                        </div>
                                                    )}
                                                    {order.returnImages?.length > 0 && (
                                                        <div className="mt-2 flex gap-1.5 flex-wrap">
                                                            {order.returnImages.map((img, i) => (
                                                                <a key={i} href={img} target="_blank" rel="noreferrer" className="w-10 h-10 rounded border border-gray-100 overflow-hidden hover:scale-110 transition-transform shadow-sm">
                                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-[11px] font-black text-brand-gold">₹{order.totalAmount}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-block px-2.5 py-1 text-[8px] font-black uppercase tracking-widest rounded-sm ${['Returned', 'Replaced'].includes(order.returnStatus) ? 'bg-green-100 text-green-700' :
                                                    order.returnStatus?.includes('Rejected') ? 'bg-red-100 text-red-700' :
                                                        order.returnStatus?.includes('Approved') ? 'bg-blue-100 text-blue-700' :
                                                            'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {order.returnStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {order.returnStatus?.includes('Requested') && (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => updateReturnStatus(order._id, activeTab === 'Refunds' ? 'Return Approved' : 'Replacement Approved')}
                                                            className="p-1.5 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded-md transition-all border border-green-200 hover:border-green-500 shadow-sm"
                                                            title={`Approve ${activeTab}`}
                                                        >
                                                            <FiCheck size={12} strokeWidth={3} />
                                                        </button>
                                                        <button
                                                            onClick={() => updateReturnStatus(order._id, activeTab === 'Refunds' ? 'Return Rejected' : 'Replacement Rejected')}
                                                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-md transition-all border border-red-200 hover:border-red-500 shadow-sm"
                                                            title={`Reject ${activeTab}`}
                                                        >
                                                            <FiX size={12} strokeWidth={3} />
                                                        </button>
                                                    </div>
                                                )}

                                                {order.returnStatus?.includes('Approved') && (
                                                    <button
                                                        onClick={() => updateReturnStatus(order._id, activeTab === 'Refunds' ? 'Returned' : 'Replaced')}
                                                        className="px-3 py-1.5 bg-brand-dark text-white text-[8px] font-black uppercase tracking-widest rounded-md hover:bg-green-600 shadow-md transition-colors w-[100px]"
                                                    >
                                                        {activeTab === 'Refunds' ? 'Mark Refunded' : 'Dispatch Exchange'}
                                                    </button>
                                                )}

                                                {['Returned', 'Replaced', 'Return Rejected', 'Replacement Rejected'].includes(order.returnStatus) && (
                                                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-300">Resolved</span>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminReturns;
