import React from 'react';
import { FiRefreshCcw, FiPackage, FiSlash, FiTarget, FiBox, FiXCircle, FiCheckSquare, FiCreditCard, FiClock, FiDollarSign, FiTruck, FiBell, FiShield, FiMail } from 'react-icons/fi';

const sectionStyle = 'space-y-4';
const headingStyle = 'text-base md:text-lg font-bold uppercase tracking-widest text-brand-dark flex items-center gap-3';
const paragraphStyle = 'text-gray-700 text-sm leading-relaxed';
const bulletListStyle = 'list-disc pl-5 text-gray-700 text-sm leading-relaxed space-y-2';
const iconStyle = 'text-brand-pink shrink-0';

const ReturnPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-serif font-black text-brand-dark uppercase tracking-widest mb-3">Return & Refund Policy</h1>
        <div className="h-1.5 w-20 bg-brand-pink mx-auto rounded-full mb-4" />
        <p className="text-gray-500 text-xs uppercase tracking-[0.25em]">Effective Date: April 23, 2026</p>
      </div>

      <div className="space-y-10 bg-white/60 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-brand-pink/10 shadow-2xl shadow-brand-pink/[0.03]">
        {/* Introduction */}
        <section className={sectionStyle}>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium italic border-l-4 border-brand-pink pl-6 py-2 bg-brand-pink/[0.02] rounded-r-xl">
            At Saundarya Shringar Private Limited, customer satisfaction is our priority. This Return
            & Refund Policy outlines the terms and conditions governing returns, exchanges,
            cancellations, and refunds for purchases made through <a href="https://www.saundaryashringar.com" className="text-brand-pink hover:underline">www.saundaryashringar.com</a>.
          </p>
          <p className={paragraphStyle}>
            By placing an order on our website, you agree to the terms set forth below.
          </p>
        </section>

        {/* 1. About Us */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShield className={iconStyle} size={20} />
            <h2>1. About Us</h2>
          </div>
          <p className={paragraphStyle}>
            Saundarya Shringar Private Limited is a company incorporated under the laws of India, with
            its registered office at:
          </p>
          <p className={`${paragraphStyle} font-semibold text-brand-dark`}>
            Lajpat Nagar, Near Radha Swamibhawan, Fatehabad – 125050, Haryana, India.
          </p>
          <p className={paragraphStyle}>
            We are committed to offering high-quality, carefully curated products to our customers.
          </p>
        </section>

        {/* 2. Return Eligibility */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiPackage className={iconStyle} size={20} />
            <h2>2. Return Eligibility</h2>
          </div>
          <p className={paragraphStyle}>Returns are accepted subject to the following conditions:</p>
          <ul className={bulletListStyle}>
            <li className="font-semibold text-brand-pink">Return request must be initiated within 2 working days of delivery (including the delivery date).</li>
            <li>The product must be unused, undamaged, and in its original packaging.</li>
            <li>The original invoice must be provided.</li>
          </ul>
          <p className={paragraphStyle}>
            Once approved, replacement/exchange products are typically delivered within <span className="font-bold">10–15 working days</span>.
          </p>
        </section>

        {/* 3. Non-Returnable Conditions */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiSlash className={iconStyle} size={20} />
            <h2>3. Non-Returnable Conditions</h2>
          </div>
          <p className={paragraphStyle}>Returns will not be accepted under the following circumstances:</p>
          <ul className={bulletListStyle}>
            <li>The product has been used beyond basic inspection.</li>
            <li>Original packaging, tags, or accessories are missing or damaged.</li>
            <li>Serial numbers or barcodes do not match our records.</li>
            <li>The product shows signs of physical damage or tampering.</li>
            <li>Free gifts or bundled items are not returned along with the product.</li>
            <li>Items categorized as non-returnable.</li>
          </ul>
        </section>

        {/* 4. Special Category Returns */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiTarget className={iconStyle} size={20} />
            <h2>4. Special Category Returns</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>Electronic products are eligible for return only in case of manufacturing defects.</li>
            <li>Products must be returned in their original sealed condition.</li>
          </ul>
        </section>

        {/* 5. Bundled & Promotional Products */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiBox className={iconStyle} size={20} />
            <h2>5. Bundled & Promotional Products</h2>
          </div>
          <p className={paragraphStyle}>For orders containing combo offers or promotional bundles:</p>
          <ul className={bulletListStyle}>
            <li>All items must be returned together to be eligible for a refund.</li>
            <li>Partial returns are not accepted for bundled products.</li>
          </ul>
        </section>

        {/* 6. Order Cancellation */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiXCircle className={iconStyle} size={20} />
            <h2>6. Order Cancellation</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider">Before Dispatch</h3>
              <ul className={bulletListStyle}>
                <li>Orders may be canceled fully or partially prior to dispatch.</li>
                <li>Refunds will be initiated within 15 working days after approval.</li>
              </ul>
            </div>
            <div className="space-y-3 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider">After Dispatch</h3>
              <ul className={bulletListStyle}>
                <li>Orders cannot be canceled once shipped.</li>
                <li>Returns can be initiated after delivery as per this policy.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 7. Quality Check */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiCheckSquare className={iconStyle} size={20} />
            <h2>7. Quality Check & Approval</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>All returned items are subject to quality inspection.</li>
            <li>Refunds are processed only after the product passes inspection.</li>
            <li>Returns failing the quality check may be rejected.</li>
          </ul>
        </section>

        {/* 8. Refund Policy */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiCreditCard className={iconStyle} size={20} />
            <h2>8. Refund Policy</h2>
          </div>
          <p className={paragraphStyle}>Refunds will be processed in the following cases:</p>
          <ul className={bulletListStyle}>
            <li>The product is defective or damaged upon delivery.</li>
            <li>The return request meets all eligibility criteria.</li>
          </ul>
          <div className="mt-4 p-4 bg-brand-pink/[0.03] rounded-xl border border-brand-pink/5">
            <p className="text-xs font-bold text-brand-pink uppercase tracking-widest mb-2">Exclusions:</p>
            <ul className={bulletListStyle}>
              <li>Shipping and handling charges are non-refundable.</li>
              <li>Deductions may apply for missing items, accessories, or damages.</li>
            </ul>
          </div>
        </section>

        {/* 9. Refund Timeline */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiClock className={iconStyle} size={20} />
            <h2>9. Refund Timeline</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>Refunds are initiated within <span className="font-bold">5–7 business days</span> after approval.</li>
            <li>The amount will be credited to the original payment method.</li>
            <li>Final credit timelines may vary depending on your bank or payment provider.</li>
          </ul>
        </section>

        {/* 10. Refund Method */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiDollarSign className={iconStyle} size={20} />
            <h2>10. Refund Method</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>Refunds are processed via standard banking/payment channels.</li>
            <li>In case of split payments, the refund method may be determined at our discretion.</li>
          </ul>
        </section>

        {/* 11. Reverse Pickup */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiTruck className={iconStyle} size={20} />
            <h2>11. Reverse Pickup</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>Returns are facilitated through our logistics partners.</li>
            <li>Pickup will be scheduled after return approval.</li>
            <li>Customers must ensure the product is securely packed for collection.</li>
          </ul>
        </section>

        {/* 12. Updates */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiBell className={iconStyle} size={20} />
            <h2>12. Updates & Communication</h2>
          </div>
          <p className={paragraphStyle}>We will keep you informed regarding:</p>
          <ul className={bulletListStyle}>
            <li>Return request status</li>
            <li>Refund progress</li>
          </ul>
          <p className={paragraphStyle}>All updates will be shared via your registered email or mobile number.</p>
        </section>

        {/* 13. Governing Law */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShield className={iconStyle} size={20} />
            <h2>13. Governing Law</h2>
          </div>
          <p className={paragraphStyle}>
            This policy is governed by the laws of India. Any disputes arising shall be subject to the
            exclusive jurisdiction of courts in Fatehabad, Haryana.
          </p>
        </section>

        {/* 14. Contact Us */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiMail className={iconStyle} size={20} />
            <h2>14. Contact Us</h2>
          </div>
          <p className={paragraphStyle}>For any queries related to returns, refunds, or support, please contact:</p>
          <div className="grid md:grid-cols-3 gap-6 bg-brand-pink/[0.02] p-6 rounded-2xl border border-brand-pink/5">
            <div>
              <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest mb-1">Email</p>
              <a href="mailto:care@saundaryashringar.com" className="text-sm text-brand-dark hover:text-brand-pink transition-colors">care@saundaryashringar.com</a>
            </div>
            <div>
              <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest mb-1">WhatsApp</p>
              <a href="https://wa.me/919896472169" className="text-sm text-brand-dark hover:text-brand-pink transition-colors">+91-9896472169</a>
            </div>
            <div>
              <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest mb-1">Address</p>
              <p className="text-sm text-brand-dark">Lajpat Nagar, Near Radha Swamibhawan, Fatehabad, Haryana</p>
            </div>
          </div>
        </section>

        <div className="pt-10 border-t border-brand-pink/10 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
            © 2026 Saundarya Shringar Private Limited. Quality Uncompromised, Service Guaranteed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;

