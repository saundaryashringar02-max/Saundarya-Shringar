import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';
import {
  FiPackage,
  FiAlertTriangle,
  FiArrowUp,
  FiArrowDown,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDatabase,
  FiShoppingBag,
  FiActivity,
  FiEdit3,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const AdminInventory = () => {
  const { products, fetchData } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All'); // All, Low Stock, Out of Stock
  const [editingId, setEditingId] = useState(null);
  const [editStockValue, setEditStockValue] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync with live DB products
  const inventoryItems = products.map(p => ({
    ...p,
    id: p._id,
    stock: p.stock !== undefined ? p.stock : 100,
    reserved: 0,
    warehouse: 'Primary Vault',
    lastUpdated: new Date(p.updatedAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().includes(searchQuery);

    if (filter === 'Low Stock') return matchesSearch && item.stock < 10 && item.stock > 0;
    if (filter === 'Out of Stock') return matchesSearch && item.stock === 0;
    return matchesSearch;
  });

  const handleUpdateStock = async (id) => {
    if (editStockValue === '' || isNaN(editStockValue)) return;
    setIsUpdating(true);
    try {
      await api.patch(`/products/${id}`, { stock: Number(editStockValue) });
      fetchData(); // Sync globally
      setEditingId(null);
    } catch (error) {
      alert("Failed to patch inventory bounds.");
    } finally {
      setIsUpdating(false);
    }
  };

  const totalValuation = inventoryItems.reduce((acc, item) => acc + (item.price * item.stock), 0);

  const stats = [
    { title: 'Total SKUs', value: inventoryItems.length, icon: <FiPackage />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Critical Stock', value: inventoryItems.filter(i => i.stock < 10 && i.stock > 0).length, icon: <FiAlertTriangle />, color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Out of Stock', value: inventoryItems.filter(i => i.stock === 0).length, icon: <FiActivity />, color: 'text-brand-pink', bg: 'bg-brand-light' },
    { title: 'Vault Valuation', value: `₹${(totalValuation / 100000).toFixed(2)}L`, icon: <FiDatabase />, color: 'text-green-600', bg: 'bg-green-50' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Inventory Vault
          </h1>
          <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">Real-time Stock Audits & Warehousing</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => fetchData()} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-none border border-brand-pink/5 text-[8px] font-black uppercase tracking-widest shadow-sm hover:bg-brand-pink/[0.02] transition-colors active:scale-95">
            <FiRefreshCw /> REFRESH LIVE DATA
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
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
              <span className="text-xl font-bold text-gray-800">{stat.value}</span>
            </div>
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
              {React.cloneElement(stat.icon, { size: 18 })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inventory Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-3 border border-brand-pink/5 shadow-sm">
        <div className="flex items-center gap-2 w-full md:w-96">
          <div className="flex-1 bg-brand-light/20 border border-brand-pink/5 p-2 flex items-center gap-2 group focus-within:border-brand-pink/20 transition-all">
            <FiSearch size={14} className="text-gray-300" />
            <input
              type="text"
              placeholder="Filter by SKU or Product Name..."
              className="bg-transparent border-none outline-none text-[9px] font-bold uppercase tracking-widest w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {['All', 'Low Stock', 'Out of Stock'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest border transition-all ${filter === f ? 'bg-brand-dark text-white border-brand-dark' : 'bg-transparent text-gray-400 border-gray-100 hover:border-brand-pink/20'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-none border border-brand-pink/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-dark text-white">
                <th className="px-6 py-4 text-[8px] font-black uppercase tracking-[0.2em]">Asset info</th>
                <th className="px-6 py-4 text-[8px] font-black uppercase tracking-[0.2em]">Warehouse</th>
                <th className="px-6 py-4 text-[8px] font-black uppercase tracking-[0.2em]">Stock Level</th>
                <th className="px-6 py-4 text-[8px] font-black uppercase tracking-[0.2em]">Reserved</th>
                <th className="px-6 py-4 text-[8px] font-black uppercase tracking-[0.2em] text-right">Valuation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-pink/5">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-brand-light/10 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-light/20 p-1 border border-brand-pink/5 shrink-0 relative">
                        <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply opacity-80" />
                        {item.stock < 10 && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-ping" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-brand-dark uppercase truncate max-w-[180px] leading-tight mb-1">{item.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[7px] font-black text-brand-pink uppercase">ID: {item.id}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full" />
                          <span className="text-[7px] font-medium text-gray-400">CAT: {item.category}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest">{item.warehouse}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5 min-w-[140px]">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            autoFocus
                            value={editStockValue}
                            onChange={(e) => setEditStockValue(e.target.value)}
                            className="w-16 bg-white border border-brand-pink/20 rounded px-2 py-1 text-xs font-bold outline-none ring-1 ring-brand-pink/10"
                            disabled={isUpdating}
                          />
                          <button onClick={() => handleUpdateStock(item.id)} disabled={isUpdating} className="text-green-500 hover:text-green-600 disabled:opacity-50">
                            <FiCheck size={14} />
                          </button>
                          <button onClick={() => setEditingId(null)} disabled={isUpdating} className="text-red-400 hover:text-red-500 disabled:opacity-50">
                            <FiX size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center text-[8px] font-black uppercase group/edit cursor-pointer" onClick={() => { setEditingId(item.id); setEditStockValue(String(item.stock)); }}>
                          <span className={`${item.stock < 10 ? 'text-red-500 font-black animate-pulse' : 'text-gray-500'} flex items-center gap-1`}>
                            {item.stock} Units <FiEdit3 size={10} className="opacity-0 group-hover/edit:opacity-100 transition-opacity text-brand-pink" />
                          </span>
                          <span className={`${item.stock < 10 ? 'text-red-400' : 'text-gray-300'}`}>{item.stock === 0 ? 'Depleted' : 'In Stock'}</span>
                        </div>
                      )}

                      <div className="h-1 bg-gray-100 rounded-none overflow-hidden flex">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (item.stock / 50) * 100)}%` }}
                          className={`h-full ${item.stock < 10 ? 'bg-red-500' : item.stock < 25 ? 'bg-amber-400' : 'bg-brand-pink'}`}
                        />
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className={`text-[6px] font-black uppercase tracking-tighter ${item.stock > 40 ? 'text-green-500' : 'text-gray-400'}`}>
                          {item.stock > 40 ? 'High Demand' : item.stock > 15 ? 'Stable' : 'Risk Factor'}
                        </span>
                        <span className="text-[6px] text-gray-300 font-bold uppercase truncate max-w-[60px]">Update: {item.lastUpdated}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">
                        {item.reserved} <span className="text-[7px] font-medium opacity-50 ml-0.5">RES</span>
                      </span>
                      <span className={`text-[6px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded-full w-fit ${item.stock < 10 ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                        {item.stock < 10 ? 'Critical' : 'Secured'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-[11px] font-black text-brand-dark leading-none">₹{item.price * item.stock}</p>
                    <p className="text-[7px] text-gray-400 uppercase tracking-tighter mt-1">Live Valuation</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredItems.length === 0 && (
          <div className="p-20 text-center">
            <div className="text-gray-200 mb-4 flex justify-center"><FiShoppingBag size={48} /></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">No Assets Found In Current Audit</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInventory;
