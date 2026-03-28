import React from 'react';
import { FiRefreshCcw, FiTruck, FiCreditCard, FiAlertCircle } from 'react-icons/fi';

const ReturnPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-widest mb-2">Return & Refund Policy</h1>
        <div className="h-1 w-12 bg-brand-pink mx-auto rounded-full" />
        <p className="text-gray-400 text-[9px] mt-2 uppercase tracking-[0.2em]">Our Commitment to Quality</p>
      </div>

      <div className="space-y-4 bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-brand-pink/10 shadow-xl shadow-brand-pink/[0.02]">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiRefreshCcw className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Eligibility for Returns</h2>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">
            Due to the nature of skin and haircare products, returns are only accepted for products that are defective, damaged during transit, or incorrect items received. Products must be in their original packaging and unused.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiTruck className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Return Process</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Please report any issues within 48 hours of delivery at customercare@saundaryashringar.com. Mention your order ID and attach photos of the issue. Our team will review and arrange a replacement or refund as per eligibility.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiCreditCard className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Refund Timeline</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Once approved, refunds are processed within 7-10 business days to the original payment method used during checkout. Please note that shipping charges are non-refundable.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-brand-dark">
            <FiAlertCircle className="text-brand-pink" size={20} />
            <h2 className="text-lg font-bold uppercase tracking-widest">Exchanges</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            We only replace items if they are defective or damaged. If you need an exchange, please contact us at our customer care number: +91 9896472169.
          </p>
        </section>

        <div className="pt-8 border-t border-brand-pink/5 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                Registered Office: Lajpat Nagar Near Radha Swami Bhawan,<br/>Fatehabad-125050 Haryana
            </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
