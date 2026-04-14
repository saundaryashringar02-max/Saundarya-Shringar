import React from 'react';
import { FiRefreshCcw, FiTruck, FiCreditCard, FiAlertCircle } from 'react-icons/fi';

const sectionStyle = 'space-y-3';
const headingStyle = 'text-base md:text-lg font-bold uppercase tracking-widest text-brand-dark';
const paragraphStyle = 'text-gray-700 text-sm leading-relaxed';
const bulletListStyle = 'list-disc pl-5 text-gray-700 text-sm leading-relaxed space-y-1';

const ReturnPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-widest mb-2">Return & Refund Policy</h1>
        <div className="h-1 w-12 bg-brand-pink mx-auto rounded-full" />
        <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.2em]">Effective Date: 01/04/2026</p>
      </div>

      <div className="space-y-6 bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-brand-pink/10 shadow-xl shadow-brand-pink/[0.02]">
        <section className={sectionStyle}>
          <p className={paragraphStyle}>
            At Saundarya Shringar Private Limited, we are committed to ensuring your satisfaction with every
            purchase. This policy explains return, exchange, and refund conditions for orders placed on
            www.saundaryashringar.com.
          </p>
          <p className={paragraphStyle}>
            By making a purchase on our website, you agree to the terms outlined in this policy.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiRefreshCcw className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>1. About Us</h2>
          </div>
          <p className={paragraphStyle}>
            Saundarya Shringar Private Limited is a company incorporated under the laws of India, with its
            registered office at Lajpat Nagar, Near Radha Swamibhawan, Fatehabad - 125050, Haryana, India.
          </p>
          <p className={paragraphStyle}>
            We specialize in offering carefully curated products designed to deliver quality and satisfaction.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>2. Return Eligibility</h2>
          <p className={paragraphStyle}>Return requests are accepted under the following conditions:</p>
          <ul className={bulletListStyle}>
            <li>Request must be initiated within 7 Working days from delivery</li>
            <li>Product must be unused, undamaged, and in original packaging</li>
            <li>Original invoice must be provided</li>
          </ul>
          <p className={paragraphStyle}>
            Once approved, exchanged products are typically delivered within 10-15 working days.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>3. Non-Returnable Conditions</h2>
          <p className={paragraphStyle}>Returns will not be accepted if:</p>
          <ul className={bulletListStyle}>
            <li>The product is used beyond basic inspection</li>
            <li>Original packaging, tags, or accessories are missing or damaged</li>
            <li>Serial numbers or barcodes do not match records</li>
            <li>Products show signs of physical damage</li>
            <li>Free gifts or bundled items are not returned</li>
            <li>Products fall under non-returnable categories</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>4. Special Category Returns</h2>
          <ul className={bulletListStyle}>
            <li>Electronic products are eligible only for manufacturing defects</li>
            <li>Products must be returned in original sealed condition</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>5. Bundled and Promotional Products</h2>
          <p className={paragraphStyle}>
            If an order includes combo or promotional bundles, all items must be returned together to qualify
            for a refund. Partial returns of bundled products are not accepted.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>6. Order Cancellation</h2>
          <p className={paragraphStyle}>Before dispatch:</p>
          <ul className={bulletListStyle}>
            <li>Orders can be canceled fully or partially before dispatch</li>
            <li>Refunds are initiated within 7 Working days after cancellation approval</li>
          </ul>
          <p className={paragraphStyle}>After dispatch:</p>
          <ul className={bulletListStyle}>
            <li>Orders cannot be canceled once shipped</li>
            <li>Return can be initiated after delivery as per policy</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>7. Quality Check and Approval</h2>
          <p className={paragraphStyle}>All returned products undergo quality inspection.</p>
          <ul className={bulletListStyle}>
            <li>Refunds are processed only if products pass inspection</li>
            <li>Refunds may be declined if the product fails quality check</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiCreditCard className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>8. Refund Policy</h2>
          </div>
          <p className={paragraphStyle}>Refunds are processed when:</p>
          <ul className={bulletListStyle}>
            <li>Product is defective or damaged upon delivery</li>
            <li>Return request meets eligibility criteria</li>
          </ul>
          <p className={paragraphStyle}>Exclusions:</p>
          <ul className={bulletListStyle}>
            <li>Shipping and handling charges are non-refundable</li>
            <li>Deductions may apply for missing accessories or items</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>9. Refund Timeline</h2>
          <ul className={bulletListStyle}>
            <li>Refunds are initiated within 5-7 business days after approval</li>
            <li>Amount is credited to the original payment method</li>
            <li>Final credit timing depends on bank or payment provider</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>10. Refund Method</h2>
          <ul className={bulletListStyle}>
            <li>Refunds are processed through standard banking channels</li>
            <li>For split payments, refund mode may be selected by us</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiTruck className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>11. Reverse Pickup</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>Returns are managed via reverse logistics partners</li>
            <li>Pickup is scheduled after return request approval</li>
            <li>Product must be securely packed for collection</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiAlertCircle className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>12. Updates and Communication</h2>
          </div>
          <p className={paragraphStyle}>We make reasonable efforts to keep you informed about:</p>
          <ul className={bulletListStyle}>
            <li>Return status</li>
            <li>Refund progress</li>
          </ul>
          <p className={paragraphStyle}>Updates are shared via email or registered mobile number.</p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>13. Governing Law</h2>
          <p className={paragraphStyle}>
            This policy is governed by the laws of India. Any disputes shall fall under the jurisdiction of
            courts in Fatehabad, Haryana.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>14. Contact Us</h2>
          <p className={paragraphStyle}>For returns, refunds, or assistance:</p>
          <ul className={bulletListStyle}>
            <li>Email: care@saundaryashringar.com</li>
            <li>Phone/WhatsApp: +91-9896472169</li>
            <li>Address: Lajpat Nagar, Near Radha Swamibhawan, Fatehabad, Haryana</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-brand-pink/5 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
            © 2026 Saundarya Shringar Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
