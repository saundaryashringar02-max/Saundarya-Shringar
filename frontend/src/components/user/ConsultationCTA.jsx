import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle } from 'react-icons/fi';

const ConsultationCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
    }, 3000);
  };

  return (
    <section className="container mx-auto px-4 md:px-8 py-10">
      <div className="bg-[#5C2E3E] rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-brand-pink opacity-0 group-hover:opacity-5 transition-opacity duration-1000"></div>
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-white mb-4 leading-tight italic">
            Divine <span className="text-brand-gold">Personalization</span>
          </h2>
          <p className="text-white/60 text-[10px] md:text-xs mb-8 font-serif leading-relaxed px-4">
            Connect with our master consultants for a bespoke organic curation tailored to your unique skin essence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-brand-gold text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[9px] shadow-2xl hover:bg-white hover:text-brand-gold transition-all text-center"
            >
              Book Ritual
            </button>
            <a 
              href="https://wa.me/919896472169?text=Hello%20Saundarya%20Shringar,%20I%20have%20an%20inquiry%20regarding%20your%20products."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white/5 text-white backdrop-blur-md px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[9px] border border-white/10 text-center"
            >
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-3xl p-8 relative shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark transition-colors"
              >
                <FiX size={20} />
              </button>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500"
                  >
                    <FiCheckCircle size={32} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-serif font-black text-brand-dark mb-2">Ritual Requested</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                      Our gurus have received your essence. <br /> We will connect with you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[7px] mb-2 block">Curation Concierge</span>
                    <h3 className="text-2xl font-serif font-black text-[#5C2E3E]">Book Your Ritual</h3>
                    <div className="w-8 h-1 bg-brand-pink mt-3"></div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Anjali Sharma" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-brand-pink transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Mobile Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+91 00000 00000" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-brand-pink transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Skin Essence / Type</label>
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-brand-pink transition-all appearance-none cursor-pointer">
                        <option>Dry & Radiant</option>
                        <option>Oily & Balance</option>
                        <option>Combination Bliss</option>
                        <option>Sensitive Care</option>
                        <option>Glow (All Types)</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-brand-dark text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-brand-pink transition-all mt-4"
                    >
                      Summon Consultant
                    </button>
                    <p className="text-[8px] text-gray-400 font-bold text-center uppercase tracking-widest mt-4">
                      By submitting, you agree to our spiritual sanctuary guidelines.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ConsultationCTA;
