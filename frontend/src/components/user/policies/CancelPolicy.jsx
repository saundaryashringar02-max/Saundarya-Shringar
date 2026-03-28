import React from 'react';

const CancelPolicy = () => {
  return (
    <div className="min-h-screen bg-brand-light py-6 md:py-10 px-4 md:px-0">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 shadow-xl border border-brand-pink/5">
        <h1 className="text-2xl md:text-3xl font-serif font-black text-brand-dark mb-6 tracking-widest text-center border-b pb-4 border-brand-pink/10 uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
          Cancellation Policy
        </h1>
        
        <div className="space-y-6 text-brand-dark/70 font-sans leading-relaxed text-[13px] md:text-sm">
          <section>
            <h2 className="text-xs md:text-sm font-black text-brand-dark uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-brand-gold"></span> 1. Order Cancellation
            </h2>
            <p className="pl-6">
              You can cancel your order at any time before it has been dispatched from our warehouse. To cancel your order, please log into your account and navigate to the "Recent Orders" section, or contact our customer support immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xs md:text-sm font-black text-brand-dark uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-brand-gold"></span> 2. Post-Dispatch
            </h2>
            <p className="pl-6">
              Once an order has been dispatched, it cannot be cancelled. However, you may refuse the delivery of the package or return it within 7 days of receipt as per our Return Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xs md:text-sm font-black text-brand-dark uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-brand-gold"></span> 3. Refunds
            </h2>
            <p className="pl-6">
              For prepaid orders, the refund will be initiated within 2-3 business days after the cancellation request is successfully processed. The amount will be credited back to the original payment method used during the transaction.
            </p>
          </section>

          <section>
            <h2 className="text-xs md:text-sm font-black text-brand-dark uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-4 h-[2px] bg-brand-gold"></span> 4. Store's Rights
            </h2>
            <p className="pl-6">
              Under rare circumstances, Saundarya Shringar reserves the right to cancel an order due to stock unavailability, pricing errors, or suspicion of fraudulent activity. You will be notified via email or phone if such a situation arises.
            </p>
          </section>

          <div className="mt-8 p-4 bg-brand-pink/5 border-l-2 border-brand-gold italic text-[12px] opacity-80">
            "We strive to provide a seamless shopping experience. For any queries regarding your order status, please reach out to us at care@saundaryashringar.com"
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelPolicy;
