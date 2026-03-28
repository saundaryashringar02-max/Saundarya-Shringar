import React from 'react';
import { FiFileText, FiUserCheck, FiTarget, FiInfo } from 'react-icons/fi';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-widest mb-2">Terms and Conditions</h1>
        <div className="h-1 w-12 bg-brand-pink mx-auto rounded-full" />
        <p className="text-gray-400 text-[9px] mt-2 uppercase tracking-[0.2em]">Usage & Legal Guidelines</p>
      </div>

      <div className="space-y-4 bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-brand-pink/10 shadow-xl shadow-brand-pink/[0.02]">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiUserCheck className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Platform Usage</h2>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">
            By accessing or using the Saundarya Shrinagar website, you agree to comply with and be bound by these terms. This site is intended for personal use by individuals who wish to purchase high-quality cosmetics and organic products.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiTarget className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Product Accuracy</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            We strive to provide accurate information regarding our products, including descriptions and prices. However, we do not warrant that all content is free from errors or inaccuracies. All prices are in INR and subject to change.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiFileText className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Intellectual Property</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            All text, logos, imagery, and other content on Saundarya Shrinagar is the property of Saundarya Shrinagar Pvt Ltd and is protected by copyright laws. Unauthorized reproduction or use is strictly prohibited.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiInfo className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Order Termination</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            We reserve the right to refuse or cancel any order for reasons such as product unavailability, pricing errors, or suspicious activity. We will inform you promptly of any such cancellations.
          </p>
        </section>

        <div className="pt-8 border-t border-brand-pink/5 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">
                Questions? Contact customercare@saundaryashringar.com
            </p>
            <p className="text-[9px] text-brand-pink/60 font-black uppercase tracking-[0.3em]">
                Saundarya Shringar Pvt Ltd.
            </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
