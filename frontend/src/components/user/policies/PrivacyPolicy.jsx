import React from 'react';
import { FiShield, FiLock, FiEye, FiCheckCircle } from 'react-icons/fi';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-widest mb-2">Privacy Policy</h1>
        <div className="h-1 w-12 bg-brand-pink mx-auto rounded-full" />
        <p className="text-gray-400 text-[9px] mt-2 uppercase tracking-[0.2em]">Effective Date: January 1, 2024</p>
      </div>

      <div className="space-y-4 bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-brand-pink/10 shadow-xl shadow-brand-pink/[0.02]">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiEye className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Information We Collect</h2>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">
            We collect personal information that you provide to us directly, such as your name, email address, phone number, and shipping address when you make a purchase or create an account at Saundarya Shrinagar.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiCheckCircle className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">How We Use Your Info</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your information is used purely to process orders, improve our services, and communicate with you about your account or promotional offers (with your consent). We never sell your data to third parties.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiLock className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Data Security</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            We implement high-level security measures to protect your personal information. Transactions are encrypted using Secure Socket Layer (SSL) technology to ensure your payment details are safe.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
             <FiShield className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Your Rights</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            You have the right to access, correct, or delete your personal information held by us. Simply contact us if you wish to exercise these rights at customercare@saundaryashringar.com.
          </p>
        </section>

        <div className="pt-8 border-t border-brand-pink/5 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                © 2024 Saundarya Shringar Pvt Ltd. All Rights Reserved.
            </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
