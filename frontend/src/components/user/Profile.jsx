import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiMail, FiMapPin, FiShoppingBag, FiHeart, FiLogOut, FiEdit2 } from 'react-icons/fi';
import api from '../../utils/api';

const Profile = () => {
  const { user, isAuthenticated, setIsAuthenticated, setUser, wishlistCount } = useShop();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '123, Rose Valley Apartments, Koramangala, Bangalore, Karnataka - 560034'
  });

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    if (user) {
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
      // Fetch dynamic order count
      api.get('/orders/my-orders').then(res => {
        if (res.data.status === 'success') {
          setTotalOrders(res.data.data.orders.length);
        }
      }).catch(err => console.error(err));
    }
  }, [isAuthenticated, navigate, user]);

  if (!user) return null;

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const handleSave = async () => {
    try {
      const res = await api.patch('/users/update-me', editForm);
      setUser(res.data.data.user);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-4 md:pt-8 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-serif font-black text-[#5C2E3E] uppercase tracking-tighter mb-4 border-b border-gray-100 pb-2">
          Your <span className="text-brand-pink italic">Sanctuary</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Main User Card - More Compact */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white rounded-[1.5rem] p-6 text-center border border-gray-100 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-24 bg-brand-pink/10 -z-10 group-hover:bg-brand-pink/20 transition-colors"></div>

              <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md mx-auto mb-3 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[#5C2E3E] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-serif text-brand-gold italic">
                    {editForm.name ? editForm.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-0 right-0 p-1 bg-brand-gold text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform"
                  >
                    <FiEdit2 size={10} />
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3 mb-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full text-center font-serif font-bold text-[#5C2E3E] border-b border-brand-pink/30 focus:border-brand-pink outline-none bg-transparent py-1 text-sm"
                    placeholder="Full Name"
                  />
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Editing Mode</p>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-serif font-bold text-[#5C2E3E] mb-0.5">{user?.name}</h2>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-4">{user?.role === 'customer' ? 'VIP Member' : 'Admin'}</p>
                </>
              )}

              <div className="space-y-3 text-left border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#F9F6F4] flex items-center justify-center text-[#5C2E3E]">
                    <FiPhone size={12} />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[7px] font-black uppercase tracking-widest text-[#5C2E3E]/50">Mobile</span>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="text-[11px] font-bold text-brand-dark border-b border-brand-pink/20 focus:border-brand-pink outline-none bg-transparent w-full"
                      />
                    ) : (
                      <span className="text-[11px] font-bold text-brand-dark">+91 {user?.phone}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#F9F6F4] flex items-center justify-center text-[#5C2E3E]">
                    <FiMail size={12} />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[7px] font-black uppercase tracking-widest text-[#5C2E3E]/50">Email</span>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="text-[11px] font-bold text-brand-dark border-b border-brand-pink/20 focus:border-brand-pink outline-none bg-transparent w-full"
                      />
                    ) : (
                      <span className="text-[11px] font-bold text-brand-dark truncate block max-w-[140px]">{user?.email || 'Not Provided'}</span>
                    )}
                  </div>
                </div>
              </div>

              {isEditing ? (
                <div className="grid grid-cols-2 gap-2 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="py-2.5 bg-gray-50 text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="py-2.5 bg-[#5C2E3E] text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-brand-pink shadow-lg shadow-brand-pink/20 transition-all"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full mt-6 py-2.5 bg-red-50 text-red-500 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <FiLogOut /> Logout
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats & Details - More Compact */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Link to="/orders" className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-brand-pink/30 hover:shadow-lg transition-all cursor-pointer group">
                <div className="w-10 h-10 bg-brand-pink/10 rounded-full flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-colors">
                  <FiShoppingBag size={18} />
                </div>
                <div>
                  <span className="block text-[8px] font-black uppercase tracking-widest text-gray-400">Total Orders</span>
                  <span className="text-xl font-serif text-[#5C2E3E] font-bold">{totalOrders}</span>
                </div>
              </Link>
              <Link to="/wishlist" className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-brand-pink/30 hover:shadow-lg transition-all cursor-pointer group">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  <FiHeart size={18} />
                </div>
                <div>
                  <span className="block text-[8px] font-black uppercase tracking-widest text-gray-400">Wishlist</span>
                  <span className="text-xl font-serif text-[#5C2E3E] font-bold">{wishlistCount || 0}</span>
                </div>
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#5C2E3E] flex items-center gap-2">
                  <FiMapPin /> Saved Addresses
                </h3>
                {!isEditing && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-[9px] font-black uppercase tracking-widest text-[#5C2E3E] border-b border-[#5C2E3E] hover:text-brand-pink hover:border-brand-pink transition-colors"
                    >
                      Edit Address
                    </button>
                  </div>
                )}
              </div>

              <div className={`border rounded-xl p-4 relative transition-all ${isEditing ? 'border-brand-pink bg-white shadow-inner' : 'border-brand-pink/20 bg-brand-pink/5'}`}>
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-brand-pink">
                      Editing Address
                    </div>
                    <h4 className="font-bold text-[#5C2E3E] text-xs uppercase tracking-widest">Primary Address</h4>
                    <textarea
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      className="w-full bg-white border border-gray-100 rounded-lg p-3 text-[11px] font-medium text-gray-600 focus:border-brand-pink outline-none min-h-[80px]"
                      placeholder="Enter your full address..."
                    />
                  </div>
                ) : (
                  <>
                    <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-[#5C2E3E] bg-white px-2 py-0.5 rounded-full shadow-sm">
                      Primary
                    </div>
                    <h4 className="font-bold text-[#5C2E3E] mb-1 text-sm">{user?.name}</h4>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[280px]">
                      {editForm.address || 'No address saved.'}
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 border-t border-brand-pink/20 pt-2 w-max text-left mt-3 block w-full">+91 {user?.phone}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
