import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <section className="py-6 bg-brand-pink/15">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-[11px] md:text-[13px] font-black mb-1 text-brand-dark uppercase tracking-[0.3em]">Join Our Community</h2>
          <p className="text-[8px] md:text-[9px] text-gray-400 mb-4 font-bold uppercase tracking-widest">Get our latest organic launches.</p>
          
          <form className="flex flex-col md:flex-row gap-2 max-w-xs mx-auto">
            <input 
              type="email" 
              placeholder="Email address"
              className="flex-1 px-3 py-1.5 rounded-none border border-brand-pink/10 focus:ring-0.5 focus:ring-brand-gold outline-none bg-white text-[8px] tracking-widest uppercase"
              required
            />
            <button 
              type="submit"
              className="bg-brand-dark text-white px-5 py-1.5 rounded-none text-[8px] font-black uppercase tracking-widest hover:bg-brand-gold transition-all active:scale-95 shadow-sm"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[7px] text-gray-400 mt-2 italic uppercase tracking-tighter opacity-70">Agree to Terms & Privacy</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
