import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from './AdminLayout';
import {
  FiArrowUpRight,
  FiPackage,
  FiUsers,
  FiLayers,
  FiImage,
  FiPlus,
  FiMoreVertical,
  FiLogOut,
  FiClock,
  FiRotateCcw,
  FiAlertTriangle,
  FiHome,
  FiShoppingBag,
  FiTag
} from 'react-icons/fi';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { categories, products } = useShop();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
    totalRevenue: '₹0'
  });
  const [financeData, setFinanceData] = useState({
    stats: [],
    recentTransactions: []
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsRes, financeRes] = await Promise.all([
        api.get('/admins/dashboard-stats'),
        api.get('/admins/finance-stats')
      ]);

      if (statsRes.data.status === 'success') {
        setStats(statsRes.data.data);
      }
      if (financeRes.data.status === 'success') {
        setFinanceData(financeRes.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleExport = () => {
    alert('Generating Inventory Vault Report... Download starting soon.');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-6">
      {/* Welcome Section */}
      <div className="pt-2">
        <h1 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
          Store Overview
        </h1>
        <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.2em] opacity-70">
          Platform Analytics & Quick Controls
        </p>
      </div>

      {/* Quick Management Section */}
      <div className="space-y-3">
        <h3 className="text-[9px] font-bold text-gray-600 uppercase tracking-widest px-1">QUICK MANAGEMENT</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { title: 'ADD PRODUCT', icon: <FiPlus />, color: 'bg-[#D1F2E1]', iconColor: 'text-[#50C878]', link: '/admin/products?add=true' },
            { title: 'CREATE COUPON', icon: <FiTag />, color: 'bg-[#FEE2EC]', iconColor: 'text-[#FF69B4]', link: '/admin/coupons' },
            { title: 'PENDING ORDERS', icon: <FiClock />, color: 'bg-[#FEF0D5]', iconColor: 'text-[#FFB347]', link: '/admin/orders' },
            { title: 'CHECK RETURNS', icon: <FiRotateCcw />, color: 'bg-[#FEE2E2]', iconColor: 'text-[#FF5C5C]', link: '/admin/returns' },
            { title: 'STOCK ALERTS', icon: <FiAlertTriangle />, color: 'bg-[#FEE7DC]', iconColor: 'text-[#FF8C69]', link: '/admin/products' },
            { title: 'MANAGE USERS', icon: <FiHome />, color: 'bg-[#E1F0FF]', iconColor: 'text-[#4A90E2]', link: '/admin/users' },
          ].map((item, i) => (
            <Link to={item.link} key={i}>
              <motion.div
                whileHover={{ y: -2 }}
                className={`${item.color} p-3 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm border border-black/5 cursor-pointer h-24`}
              >
                <div className={`p-1 rounded-lg ${item.iconColor}`}>
                  {React.cloneElement(item.icon, { size: 16 })}
                </div>
                <span className="text-[8px] font-black text-gray-800 uppercase tracking-wider text-center px-1 leading-tight">
                  {item.title}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { title: 'TOTAL USERS', value: stats.totalUsers, icon: <FiUsers />, iconBg: 'bg-[#D1E9FF]', iconColor: 'text-[#1976D2]', link: '/admin/users' },
          { title: 'TOTAL REVENUE', value: stats.totalRevenue, icon: <HiCurrencyRupee />, iconBg: 'bg-[#D7F2D9]', iconColor: 'text-[#43A047]', link: '/admin/finance' },
          { title: 'TOTAL ORDERS', value: stats.totalOrders, icon: <FiShoppingBag />, iconBg: 'bg-[#D1F0FF]', iconColor: 'text-[#039BE5]', link: '/admin/orders' },
          { title: 'PENDING ORDERS', value: stats.pendingOrders, icon: <FiClock />, iconBg: 'bg-[#FEE7C8]', iconColor: 'text-[#FB8C00]', link: '/admin/orders' }
        ].map((stat, i) => (
          <Link to={stat.link} key={i}>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">{stat.title}</span>
                <span className="text-xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <div className={`w-10 h-10 ${stat.iconBg} ${stat.iconColor} rounded-lg flex items-center justify-center shadow-inner`}>
                {React.cloneElement(stat.icon, { size: 18 })}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800">Revenue Analytics</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                {financeData.dailyRevenue?.length > 0
                  ? `Daily insights for last ${financeData.dailyRevenue.length} days`
                  : 'Platform financial performance overview'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-[9px] font-bold text-gray-600 uppercase">Daily</span>
            </div>
          </div>
          <div className="h-44 w-full relative">
            <div className="flex items-end justify-between h-44 w-full gap-2 md:gap-4 pt-4 px-2">
              {(() => {
                const hasData = financeData.dailyRevenue?.length > 1;
                const data = hasData
                  ? financeData.dailyRevenue
                  : [2400, 3100, 2800, 4200, 3600, 5100, 3900].map((v, i) => ({ _id: `Day ${i + 1}`, revenue: v }));

                const maxRevenue = Math.max(...data.map(d => d.revenue), 1000);

                return data.map((d, i) => {
                  const height = (d.revenue / maxRevenue) * 100;
                  const label = hasData ? new Date(d._id).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : d._id;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center group gap-3">
                      <div className="relative w-full flex flex-col items-center justify-end h-32">
                        {/* Tooltip on Hover */}
                        <div className="absolute -top-8 px-2 py-1 bg-brand-dark text-white text-[8px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl">
                          ₹{d.revenue}
                        </div>

                        {/* Bar */}
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                          className={`w-full max-w-[40px] rounded-t-lg shadow-sm transition-all duration-300 ${hasData
                            ? 'bg-blue-500 group-hover:bg-blue-600'
                            : 'bg-gray-100 group-hover:bg-brand-pink/20'
                            }`}
                        />
                      </div>
                      <span className="text-[7px] md:text-[8px] font-black text-gray-400 uppercase tracking-tighter whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-gray-800">Inventory Distribution</h3>
          <div className="flex-1 space-y-4 py-2 overflow-y-auto max-h-[220px]">
            {categories.slice(0, 6).map(cat => {
              const productCount = products.filter(p => p.category === cat.name || p.category?._id === cat._id).length;
              const percentage = products.length > 0 ? (productCount / products.length) * 100 : 0;

              return (
                <div key={cat._id} className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                    <span>{cat.name}</span>
                    <span>{productCount} items</span>
                  </div>
                  <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, percentage)}%` }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-brand-gold"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="/admin/products" className="w-full py-2.5 text-center text-[9px] font-bold uppercase tracking-widest text-[#4A90E2] border border-[#4A90E2]/10 rounded-xl hover:bg-blue-50 transition-colors">View inventory logs</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Recent Transactions</h3>
            <Link to="/admin/finance" className="text-[10px] font-bold text-[#4A90E2] uppercase tracking-wider">See all</Link>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-5 py-3 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Customer</th>
                  <th className="px-5 py-3 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Order ID</th>
                  <th className="px-5 py-3 text-[9px] font-bold text-gray-500 uppercase tracking-widest">Amount</th>
                  <th className="px-5 py-3 text-[9px] font-bold text-gray-500 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {financeData.recentTransactions.length > 0 ? (
                  financeData.recentTransactions.map((row, i) => (
                    <tr key={row._id || i} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-5 py-3.5 flex items-center gap-2">
                        <div className="w-7 h-7 bg-brand-pink/10 rounded-full flex items-center justify-center text-[10px] font-bold text-brand-pink">{row.user?.name?.[0] || 'U'}</div>
                        <span className="text-xs font-bold text-gray-700">{row.user?.name || 'Unknown'}</span>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-tighter">{row.orderId}</td>
                      <td className="px-5 py-3.5 text-xs font-bold text-gray-700">₹{row.totalAmount}</td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-bold uppercase ${row.paymentStatus === 'Completed' ? 'bg-green-50 text-green-600' :
                          row.paymentStatus === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                            'bg-red-50 text-red-600'
                          }`}>
                          <span className={`w-1 h-1 rounded-full ${row.paymentStatus === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                          {row.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-5 py-8 text-center text-gray-400 text-[10px] font-bold uppercase italic">No recent transactions found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Small Action List */}
        <div className="space-y-4">
          {/* Simulate and Manage buttons moved here or kept bottom */}
          <Link to="/admin/users" className="block">
            <motion.div
              whileHover={{ scale: 0.98 }}
              className="bg-[#EEF2FF] rounded-2xl p-6 border border-blue-100/50 shadow-sm flex flex-col items-center justify-center text-center gap-3 group cursor-pointer hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm mb-1">
                <FiHome size={24} />
              </div>
              <span className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em]">SIMULATE USER</span>
            </motion.div>
          </Link>
          <Link to="/admin/users" className="block">
            <motion.div
              whileHover={{ scale: 0.98 }}
              className="bg-[#E0F7FA] rounded-2xl p-6 border border-cyan-100/50 shadow-sm flex flex-col items-center justify-center text-center gap-3 group cursor-pointer hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-cyan-600 shadow-sm mb-1">
                <FiShoppingBag size={24} />
              </div>
              <span className="text-[10px] font-black text-cyan-900 uppercase tracking-[0.2em]">MANAGE USERS</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
