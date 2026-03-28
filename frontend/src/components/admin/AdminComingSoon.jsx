import React from 'react';
import AdminLayout from './AdminLayout';
import { FiClock, FiSettings, FiUsers, FiImage } from 'react-icons/fi';

const AdminComingSoon = ({ title, icon }) => {
  return (
    <div className="max-w-4xl mx-auto py-20 text-center">
      <div className="flex justify-center mb-6">
         <div className="bg-brand-pink/10 p-4 rounded-3xl animate-pulse text-brand-pink">
           {icon || <FiClock size={40} />}
         </div>
      </div>
      <h1 className="text-3xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-4">
        {title} Feature
      </h1>
      <p className="text-gray-400 text-xs font-black uppercase tracking-[0.4em] mb-10 opacity-70 flex items-center justify-center gap-2">
          <span className="w-10 h-[1px] bg-brand-pink/20" /> Under Development <span className="w-10 h-[1px] bg-brand-pink/20" />
      </p>
      <button className="bg-brand-dark text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-brand-dark/20 hover:scale-105 transition-all">
        Coming Soon to Saundarya
      </button>
    </div>
  );
};

export default AdminComingSoon;
