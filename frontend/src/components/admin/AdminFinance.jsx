import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiShoppingBag, FiCreditCard, FiArrowUpRight, FiMoreVertical, FiCalendar, FiClock as FiClockIcon, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const AdminFinance = () => {
  const [data, setData] = useState({ stats: [], recentTransactions: [] });
  const [loading, setLoading] = useState(true);

  const fetchFinanceData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/admins/finance-stats');
      setData(res.data.data);
    } catch (err) {
      console.error("Failed to fetch finance stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFinanceData();
  }, [fetchFinanceData]);

  const handlePaymentStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}`, { paymentStatus: newStatus });
      fetchFinanceData(); // Soft refresh backend stats calculation
    } catch (err) {
      alert("Failed to update payment ledger");
    }
  };

  const totalRevenue = data.stats.find(s => s._id === 'Completed')?.total || 0;
  const pendingRevenue = data.stats.find(s => s._id === 'Pending')?.total || 0;
  const totalOrders = data.stats.reduce((acc, s) => acc + s.count, 0);
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : 0;

  const financeStatsCards = [
    { title: 'Gross Revenue', value: `₹${totalRevenue.toLocaleString()}`, change: '+100%', icon: <FiDollarSign />, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Net Liquidity', value: `₹${totalRevenue.toLocaleString()}`, change: '+100%', icon: <FiTrendingUp />, color: 'text-brand-pink', bg: 'bg-brand-light' },
    { title: 'Avg. Order', value: `₹${avgOrderValue.toLocaleString()}`, change: 'Real-time', icon: <FiShoppingBag />, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Pending Dues', value: `₹${pendingRevenue.toLocaleString()}`, change: `${data.stats.find(s => s._id === 'Pending')?.count || 0} items`, icon: <FiClockIcon />, color: 'text-blue-600', bg: 'bg-blue-50' }
  ];

  if (loading) return <div className="h-96 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark/20 animate-pulse">Synchronizing Ledgers...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Store Finance
          </h1>
          <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">Live Revenue & Transaction Audits</p>
        </div>
        <button onClick={fetchFinanceData} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-none border border-brand-pink/10 text-[8px] font-black uppercase tracking-widest shadow-sm hover:bg-brand-pink/[0.02] transition-colors active:scale-95">
          <FiRefreshCw /> REFRESH LEDGER
        </button>
      </div>

      {/* Finance Cards - Dashboard Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {financeStatsCards.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group cursor-default"
          >
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.title}</span>
              <div className="flex items-end gap-1.5">
                <span className="text-lg font-bold text-gray-800 leading-none">{stat.value}</span>
                <span className={`text-[7px] font-black flex items-center gap-0.5 mb-0.5 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-blue-500'}`}>
                  {stat.change.startsWith('+') ? <FiArrowUpRight size={8} /> : <FiClockIcon size={8} />} {stat.change}
                </span>
              </div>
            </div>
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
              {React.cloneElement(stat.icon, { size: 18 })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-brand-dark rounded-none p-5 text-white border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-serif font-black text-brand-gold uppercase tracking-widest leading-none mb-1">Audit Logs</h3>
            <p className="text-[8px] text-gray-500 font-black uppercase tracking-[0.2em]">Financial summary</p>
          </div>
          <div className="flex bg-white/5 p-1 rounded-none">
            <button className="px-3 py-1 bg-brand-gold text-brand-dark rounded-none text-[8px] font-black uppercase tracking-widest">Live</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 text-[6px] font-black uppercase tracking-widest text-brand-gold/50">Txn ID</th>
                <th className="px-4 py-3 text-[6px] font-black uppercase tracking-widest text-brand-gold/50">User</th>
                <th className="px-4 py-3 text-[6px] font-black uppercase tracking-widest text-brand-gold/50">Amount</th>
                <th className="px-4 py-3 text-[6px] font-black uppercase tracking-widest text-brand-gold/50 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.recentTransactions?.length > 0 ? (
                data.recentTransactions.map((tr) => (
                  <tr key={tr._id} className="hover:bg-white/[0.02] transition-colors group text-[9px]">
                    <td className="px-4 py-3 font-black text-brand-gold uppercase">#{tr._id.slice(-6)}</td>
                    <td className="px-4 py-3 font-bold text-gray-300 uppercase">{tr.user?.name || 'Guest'}</td>
                    <td className="px-4 py-3 font-black">₹{tr.totalAmount}</td>
                    <td className="px-4 py-3 text-right">
                      <select
                        value={tr.paymentStatus}
                        onChange={(e) => handlePaymentStatusUpdate(tr._id, e.target.value)}
                        className={`px-2 py-1 rounded-none text-[7px] font-black uppercase tracking-widest border border-white/20 outline-none cursor-pointer transition-colors ${tr.paymentStatus === 'Completed' ? 'bg-green-500/10 text-green-500' : tr.paymentStatus === 'Failed' || tr.paymentStatus === 'Refunded' ? 'bg-red-500/10 text-red-500' : 'bg-brand-gold/10 text-brand-gold'}`}
                      >
                        <option value="Pending" className="bg-brand-dark text-brand-gold">Pending</option>
                        <option value="Completed" className="bg-brand-dark text-green-500">Completed</option>
                        <option value="Failed" className="bg-brand-dark text-red-500">Failed</option>
                        <option value="Refunded" className="bg-brand-dark text-red-500">Refunded</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center opacity-40 italic text-brand-gold text-[10px] font-black uppercase tracking-[0.3em]">No Transactions Logged</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;
