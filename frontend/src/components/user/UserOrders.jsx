import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiBox, FiX, FiUploadCloud, FiImage, FiPlusCircle, FiCreditCard } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';
import { uploadToCloudinary } from '../../utils/cloudinary';

const RMAModal = ({ order, onClose }) => {
    const { user } = useShop();
    const [reason, setReason] = useState('');
    const [action, setAction] = useState('Refund'); // Default
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Bank Details State (Prefilled from profile)
    const [bankDetails, setBankDetails] = useState({
        accountName: user?.bankDetails?.accountName || '',
        bankName: user?.bankDetails?.bankName || '',
        accountNumber: user?.bankDetails?.accountNumber || '',
        ifscCode: user?.bankDetails?.ifscCode || ''
    });

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setIsUploading(true);
        try {
            const uploadPromises = files.map(file => uploadToCloudinary(file));
            const urls = await Promise.all(uploadPromises);
            setImages(prev => [...prev, ...urls]);
        } catch (err) {
            alert("Visual verification upload failed. Please try smaller files.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async () => {
        if (!reason.trim()) return alert("Please clarify the ritual defect.");
        setIsSubmitting(true);
        try {
            const payload = {
                returnReason: reason,
                returnAction: action,
                returnImages: images
            };

            if (action === 'Refund') {
                if (!bankDetails.accountNumber || !bankDetails.ifscCode) {
                    return alert("Bank Details are essential for sacred refunds.");
                }
                payload.refundAccountDetails = bankDetails;
            }

            await api.patch(`/orders/${order._id}/request-return`, payload);
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "RMA Submission Failure.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-brand-dark/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-y-auto max-h-[88dvh] mx-auto scrollbar-hide"
                data-lenis-prevent
            >
                {/* Header */}
                <div className="bg-brand-dark px-5 py-3 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h2 className="text-white text-[10px] font-black uppercase tracking-widest leading-none mb-1">Ritual Restoration</h2>
                        <p className="text-white/40 text-[7px] font-bold uppercase tracking-widest">Order ID: {order.orderId}</p>
                    </div>
                    <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                        <FiX size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                    {/* Action Selector */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Desired Outcome</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setAction('Refund')}
                                className={`py-4 px-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${action === 'Refund' ? 'bg-brand-pink/10 border-brand-pink text-brand-pink shadow-inner' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200'}`}
                            >
                                <FiTruck size={16} />
                                <span className="text-[8px] font-black uppercase tracking-widest">Return & Refund</span>
                            </button>
                            <button
                                onClick={() => setAction('Replace')}
                                className={`py-3 px-3 border rounded-xl flex flex-col items-center gap-1.5 transition-all ${action === 'Replace' ? 'bg-brand-gold/10 border-brand-gold text-brand-gold shadow-inner' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200'}`}
                            >
                                <FiBox size={16} />
                                <span className="text-[8px] font-black uppercase tracking-widest">Replacement</span>
                            </button>
                        </div>
                    </div>

                    {/* Clarification */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Describe the Discrepancy</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Detail the issue..."
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-[10px] font-bold outline-none focus:border-brand-pink/30 h-20 resize-none transition-all"
                        />
                    </div>

                    {/* Images */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                            Visual Evidence {isUploading && <span className="text-[8px] animate-pulse text-brand-pink uppercase">Uploading...</span>}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {images.map((img, i) => (
                                <div key={i} className="w-14 h-14 rounded-lg overflow-hidden border border-gray-100 relative group">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <button onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><FiX size={10} /></button>
                                </div>
                            ))}
                            <label className="w-14 h-14 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-brand-pink/20 text-gray-300">
                                <FiUploadCloud size={16} />
                                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Bank Details for Refund */}
                    {action === 'Refund' && (
                        <div className="p-4 bg-brand-pink/5 rounded-2xl border border-brand-pink/10 space-y-4">
                            <h4 className="text-[9px] font-black text-brand-dark uppercase tracking-[0.2em] flex items-center gap-2">
                                <FiCreditCard className="text-brand-pink" /> Sacred Refund Destination
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[7.5px] font-black uppercase text-gray-400">Account Holder</label>
                                    <input
                                        type="text"
                                        value={bankDetails.accountName}
                                        onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                                        className="w-full bg-white border border-gray-100 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-brand-dark focus:border-brand-pink/30 outline-none"
                                        placeholder="Name on account"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[7.5px] font-black uppercase text-gray-400">Account Number</label>
                                    <input
                                        type="text"
                                        value={bankDetails.accountNumber}
                                        onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                        className="w-full bg-white border border-gray-100 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-brand-dark focus:border-brand-pink/30 outline-none"
                                        placeholder="000000000000"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[7.5px] font-black uppercase text-gray-400">Bank Name</label>
                                    <input
                                        type="text"
                                        value={bankDetails.bankName}
                                        onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                                        className="w-full bg-white border border-gray-100 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-brand-dark focus:border-brand-pink/30 outline-none"
                                        placeholder="Bank Name"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[7.5px] font-black uppercase text-gray-400">IFSC Code</label>
                                    <input
                                        type="text"
                                        value={bankDetails.ifscCode}
                                        onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value.toUpperCase() })}
                                        className="w-full bg-white border border-gray-100 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-brand-dark focus:border-brand-pink/30 outline-none"
                                        placeholder="IFSC0000000"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-5 py-4 bg-gray-50 flex items-center justify-between sticky bottom-0 z-10 border-t border-gray-100">
                    <button onClick={onClose} className="text-[9px] font-black uppercase text-gray-400">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        disabled={isUploading || isSubmitting}
                        className="bg-brand-dark text-white px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl hover:bg-brand-pink transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showRmaModal, setShowRmaModal] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/orders/my-orders');
                setOrders(res.data.data.orders);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center bg-[#FDFCFB]">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5C2E3E]/40 animate-pulse">
                    Retrieving Sacred Scripts...
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center bg-[#FDFCFB] px-4">
                <div className="w-20 h-20 bg-brand-pink/10 rounded-full flex items-center justify-center text-brand-pink mb-6 shadow-inner">
                    <FiPackage size={40} />
                </div>
                <h2 className="text-2xl font-serif font-black text-brand-dark uppercase tracking-widest mb-2">No Sacred Orders Yet</h2>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-8 text-center max-w-sm">
                    Your ritual history is empty. Begin your journey into divine beauty.
                </p>
                <Link
                    to="/shop"
                    className="bg-brand-dark text-white px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-brand-pink transition-all"
                >
                    Discover Treasures
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-24 pb-20">
            <AnimatePresence>
                {showRmaModal && selectedOrder && (
                    <RMAModal order={selectedOrder} onClose={() => { setShowRmaModal(false); setSelectedOrder(null); }} />
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif font-black text-brand-dark uppercase tracking-tighter">
                            Your <span className="text-brand-pink italic">Journeys</span>
                        </h1>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                            Ritual History : {orders.length} Dispatched
                        </p>
                    </div>
                    <Link to="/profile" className="text-[9px] font-black text-[#5C2E3E] uppercase border-b border-[#5C2E3E] hover:text-brand-pink hover:border-brand-pink transition-all hidden md:block">
                        Back to Sanctuary
                    </Link>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group"
                        >
                            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-inner ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                        order.status === 'Processing' ? 'bg-orange-50 text-orange-500' :
                                            'bg-brand-pink/10 text-brand-pink'
                                        }`}>
                                        {order.status === 'Delivered' ? <FiCheckCircle size={18} /> : order.status === 'Processing' ? <FiClock size={18} /> : <FiTruck size={18} />}
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Order ID</p>
                                        <p className="text-[11px] font-black text-brand-dark tracking-widest">{order.orderId}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Manifest Placed</p>
                                        <p className="text-[11px] font-bold text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Total Value</p>
                                        <p className="text-[13px] font-black text-brand-gold">₹{order.totalAmount}</p>
                                    </div>
                                    <Link
                                        to={`/track-order?id=${order.orderId}`}
                                        className="bg-[#5C2E3E] text-white px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-brand-pink transition-colors shadow-md shadow-brand-pink/20"
                                    >
                                        Track
                                    </Link>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <Link 
                                            key={index} 
                                            to={`/track-order?id=${order.orderId}`}
                                            className="flex gap-4 items-center p-3 hover:bg-gray-50 transition-colors rounded-xl group/item border border-transparent hover:border-brand-pink/10"
                                        >
                                            <div className="w-16 h-16 bg-[#F9F6F4] rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                                <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h4 className="text-[11px] font-black font-serif text-[#5C2E3E] uppercase tracking-widest group-hover/item:text-brand-pink transition-colors">{item.name}</h4>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[11px] font-black text-gray-600">₹{item.price}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {order.status === 'Shipped' && order.trackingId && (
                                    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <span className="text-[9px] font-black text-[#5C2E3E]/60 uppercase tracking-widest flex items-center gap-2">
                                            <FiBox /> Tracking Constellation
                                        </span>
                                        <span className="text-[10px] font-bold text-brand-pink uppercase tracking-widest px-3 py-1 bg-brand-pink/5 rounded-md border border-brand-pink/10">
                                            {order.trackingId}
                                        </span>
                                    </div>
                                )}

                                {order.status === 'Delivered' && (
                                    <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <span className="text-[9px] font-black text-[#5C2E3E]/60 uppercase tracking-widest flex items-center gap-2">
                                            {(!order.returnStatus || order.returnStatus === 'Not Requested') ? 'Need Support?' : 'RMA Status'}
                                        </span>

                                        {(!order.returnStatus || order.returnStatus === 'Not Requested') ? (
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => { setSelectedOrder(order); setShowRmaModal(true); }}
                                                    className="text-[9px] font-bold text-brand-dark uppercase tracking-widest px-6 py-2.5 bg-brand-light border border-brand-dark hover:bg-brand-dark hover:text-white transition-all shadow-sm flex items-center gap-2"
                                                >
                                                    <FiPlusCircle /> Initiate Restoration
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    {order.returnImages?.length > 0 && <FiImage className="text-brand-pink" size={14} title="Evidence Attached" />}
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm border ${['Returned', 'Replaced'].includes(order.returnStatus) ? 'bg-green-50 text-green-600 border-green-200' : order.returnStatus?.includes('Rejected') ? 'bg-red-50 text-red-500 border-red-200' : 'bg-brand-gold/10 text-brand-gold border-brand-gold/20'}`}>
                                                        {order.returnStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserOrders;
