import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import api from '../../utils/api';

const AdminCategoryVisibility = () => {
  const { categories, fetchData } = useShop();
  const [loadingId, setLoadingId] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggle = async (catId, currentVisibility) => {
    setLoadingId(catId);
    try {
      await api.patch(`/categories/${catId}/visibility`, { isVisible: !currentVisibility });
      await fetchData(); // Sync context data
      showNotification(`Category is now ${!currentVisibility ? 'Visible' : 'Hidden'}!`);
    } catch (err) {
      showNotification('Failed to update visibility', 'error');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Category Visibility Control
          </h1>
          <p className="text-[8px] text-gray-400 font-medium uppercase tracking-[0.2em]">Manage which categories appear for users</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-white rounded-xl border ${cat.isVisible ? 'border-brand-pink/20' : 'border-gray-200'} shadow-sm overflow-hidden flex flex-col`}
          >
            <div className="h-24 bg-brand-light/10 relative overflow-hidden flex items-center justify-center p-2">
              <img
                src={cat.image || 'https://via.placeholder.com/150'}
                alt={cat.name}
                className={`h-full object-contain transition-all duration-300 ${!cat.isVisible && 'grayscale opacity-50'}`}
              />
              {!cat.isVisible && (
                <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center">
                  <span className="bg-black text-white text-[8px] font-black uppercase tracking-widest px-2 py-1">HIDDEN</span>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-50 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[11px] font-black text-brand-dark uppercase tracking-wider leading-none mb-2">{cat.name}</h3>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-[9px] font-bold uppercase tracking-widest ${cat.isVisible ? 'text-green-600' : 'text-gray-400'}`}>
                  {cat.isVisible ? 'Visible to Users' : 'Hidden from Users'}
                </span>
                
                <button
                  onClick={() => handleToggle(cat._id, cat.isVisible)}
                  disabled={loadingId === cat._id}
                  className={`p-2 rounded-lg transition-all ${
                    loadingId === cat._id ? 'opacity-50 cursor-wait' : ''
                  } ${
                    cat.isVisible 
                      ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                  }`}
                  title={cat.isVisible ? 'Hide Category' : 'Show Category'}
                >
                  {cat.isVisible ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[1001] bg-white border-l-4 border-brand-pink shadow-2xl px-6 py-4 flex items-center gap-4"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notification.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-brand-pink/10 text-brand-pink'}`}>
              {notification.type === 'error' ? '!' : <FiCheckCircle size={18} />}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Update Result</p>
              <p className="text-xs font-serif italic text-gray-500">{notification.msg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCategoryVisibility;
