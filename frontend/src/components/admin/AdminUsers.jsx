import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import { FiSearch, FiUser, FiMail, FiPhone, FiDollarSign, FiShoppingBag, FiArrowLeft, FiClock, FiStar, FiFilter, FiTrendingUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      setUserList(res.data.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const fetchUserDetails = async (user) => {
    try {
      const res = await api.get(`/users/${user._id}`);
      setSelectedUser({
        ...user,
        recentOrders: res.data.data.orders,
        totalSpent: res.data.data.orders.reduce((acc, o) => acc + o.totalAmount, 0),
        orderCount: res.data.data.orders.length
      });
    } catch (err) {
      alert('Failed to load user details');
    }
  };

  const filteredUsers = userList.filter(u =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = async (id) => {
    if (window.confirm('Securely terminate this user account and revoke all access?')) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers();
        setSelectedUser(null);
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const handleAction = (type) => {
    alert(`${type} protocol initiated for ${selectedUser?.name || 'user'}. Synchronizing secure databases.`);
  };

  if (selectedUser) {
    return (
      <div className="max-w-7xl mx-auto space-y-3 pb-8 font-serif">
        <div className="flex justify-between items-center mb-1">
          <button
            onClick={() => setSelectedUser(null)}
            className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-dark/40 hover:text-brand-pink transition-all"
          >
            <FiArrowLeft /> Back to Directory
          </button>
          <button
            onClick={() => handleDeleteUser(selectedUser._id)}
            className="text-[9px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-all flex items-center gap-2"
          >
            Revoke Access
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* User Profile Card */}
          <div className="lg:col-span-1 space-y-3 font-sans">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-xl bg-brand-light flex items-center justify-center mx-auto mb-3 border border-brand-pink/5 shadow-md">
                <span className="text-lg font-serif font-black text-brand-dark">{selectedUser.name?.[0]}</span>
              </div>
              <h2 className="text-sm font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">{selectedUser.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="bg-brand-gold text-white text-[7px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-brand-gold/20">
                  <FiStar className="fill-current" /> {selectedUser.role === 'customer' ? 'Premium Guest' : 'Staff Member'}
                </span>
              </div>

              <div className="space-y-2 text-left border-t border-gray-50 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-brand-pink"><FiMail size={12} /></div>
                  <div className="overflow-hidden">
                    <p className="text-[6px] font-black uppercase tracking-widest text-gray-400">Communication</p>
                    <p className="text-[10px] font-bold text-brand-dark truncate">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-brand-gold"><FiPhone size={12} /></div>
                  <div>
                    <p className="text-[6px] font-black uppercase tracking-widest text-gray-400">Secure Line</p>
                    <p className="text-[10px] font-bold text-brand-dark">{selectedUser.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Finance Snapshot */}
            <div className="bg-brand-dark rounded-2xl p-4 text-white border border-white/5 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-4 opacity-5"><FiDollarSign size={32} /></div>
              <h3 className="text-[7px] font-black uppercase tracking-[0.2em] text-brand-gold/60 mb-3 border-b border-white/5 pb-2">Financial Insights</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[6px] font-black uppercase tracking-widest text-white/40 mb-0.5">LTV Spent</p>
                  <p className="text-sm font-serif font-black text-brand-gold">₹{selectedUser.totalSpent || 0}</p>
                </div>
                <div>
                  <p className="text-[6px] font-black uppercase tracking-widest text-white/40 mb-0.5">Orders</p>
                  <p className="text-sm font-serif font-black text-white">{selectedUser.orderCount || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Details Column */}
          <div className="lg:col-span-3 space-y-3 font-sans">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[10px] font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">Transaction History</h3>
                  <p className="text-[6px] text-gray-400 font-black uppercase tracking-[0.2em]">Verified Secure Logs</p>
                </div>
                <button onClick={() => handleAction('Filter')} className="text-gray-300 hover:text-brand-pink transition-colors"><FiFilter size={12} /></button>
              </div>

              <div className="space-y-2">
                {selectedUser.recentOrders?.map((order, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100 hover:border-brand-pink/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-brand-pink shadow-sm"><FiShoppingBag size={10} /></div>
                      <div>
                        <p className="text-[10px] font-bold text-brand-dark uppercase tracking-wide">#{order._id.slice(-6)}</p>
                        <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-brand-dark">₹{order.totalAmount}</p>
                      </div>
                      <div className={`px-2 py-0.5 rounded-lg text-[7px] font-black uppercase tracking-widest border ${order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-brand-pink/10 text-brand-pink border-brand-pink/20'}`}>
                        {order.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-3 font-serif">
      <div className="flex justify-between items-end mb-1">
        <div>
          <h1 className="text-lg font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Customer Database
          </h1>
          <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-60">Verified Identity Vault</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-100 w-64 shadow-sm group font-sans">
          <FiSearch className="text-gray-300 group-focus-within:text-brand-pink transition-colors" size={12} />
          <input
            type="text"
            placeholder="Query Database..."
            className="bg-transparent border-none outline-none text-[9px] font-black uppercase w-full placeholder:opacity-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 font-sans">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => (
            <motion.div
              key={u._id}
              whileHover={{ y: -3 }}
              onClick={() => fetchUserDetails(u)}
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-xl hover:border-brand-pink/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-12 h-12 bg-brand-pink/5 rounded-full -mr-6 -mt-6 group-hover:scale-125 transition-transform"></div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-sm font-serif font-black text-brand-dark shadow-inner border border-brand-pink/5 group-hover:bg-brand-dark group-hover:text-brand-gold transition-all">
                  {u.name?.[0]}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-[10px] font-serif font-black text-brand-dark uppercase tracking-wider leading-none mb-1 group-hover:text-brand-pink transition-colors truncate">{u.name}</h3>
                  <span className="text-[6px] font-black text-brand-gold uppercase tracking-tighter bg-brand-gold/5 px-1.5 py-0.5 rounded-lg">{u.role === 'customer' ? 'Customer' : 'Staff'}</span>
                </div>
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex justify-between items-end border-b border-gray-50 pb-1">
                  <span className="text-[6px] font-black text-gray-400 uppercase tracking-widest">Joined</span>
                  <span className="text-[9px] font-serif font-black text-brand-dark">{new Date(u.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <span className="text-[7px] font-black uppercase tracking-widest text-brand-dark/30 group-hover:text-brand-pink flex items-center gap-1 transition-all">Profile Vault <FiArrowLeft className="rotate-180" size={8} /></span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center opacity-40 italic text-brand-dark text-[10px] font-black uppercase tracking-[0.3em]">No Identities Found In This Sector</div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
