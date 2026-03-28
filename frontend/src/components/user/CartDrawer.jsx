import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { isCartDrawerOpen, setIsCartDrawerOpen, cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useShop();

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-[#FDFCFB] z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <FiShoppingBag className="text-brand-pink text-xl" />
                <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#5C2E3E]">
                  Your Selection <span className="text-brand-pink/50 ml-1">({cartCount})</span>
                </h2>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <FiX className="text-[#5C2E3E]" size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item._id}
                    className="flex gap-4 items-center bg-white p-3 rounded-2xl border border-gray-50 shadow-sm"
                  >
                    <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#F9F6F4] shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[10px] md:text-xs font-black text-[#5C2E3E] uppercase truncate tracking-tight mb-1">
                        {item.name}
                      </h3>
                      <p className="text-[9px] text-gray-400 font-serif italic mb-3">{item.subCategory}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1">
                          <button onClick={() => updateQuantity(item._id, -1)} className="text-gray-400 hover:text-brand-pink">
                            <FiMinus size={10} />
                          </button>
                          <span className="text-[10px] font-bold text-[#5C2E3E] w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, 1)} className="text-gray-400 hover:text-brand-pink">
                            <FiPlus size={10} />
                          </button>
                        </div>
                        <span className="text-[11px] font-black text-brand-gold">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-brand-pink/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiShoppingBag className="text-brand-pink/20" size={32} />
                  </div>
                  <h3 className="text-xl font-serif font-black text-[#5C2E3E] mb-2 italic opacity-40">Your bag is empty</h3>
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-8">Ready to start your journey?</p>
                  <button
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="px-8 py-3 bg-[#5C2E3E] text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full"
                  >
                    Explore Shop
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-center px-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]/60">Subtotal</span>
                  <span className="text-xl font-black text-brand-gold">₹{cartTotal}</span>
                </div>
                <p className="text-[9px] text-gray-400 text-center font-serif italic mb-2">
                  *Shipping & taxes calculated at checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full bg-[#5C2E3E] text-white py-4 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-brand-pink transition-all flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
