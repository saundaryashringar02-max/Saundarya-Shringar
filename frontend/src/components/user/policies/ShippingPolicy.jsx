import React from 'react';
import { FiTruck, FiGlobe, FiMapPin, FiPackage, FiHelpCircle, FiShield, FiMail, FiPhone } from 'react-icons/fi';

const sectionStyle = 'space-y-4';
const headingStyle = 'text-base md:text-lg font-bold uppercase tracking-widest text-brand-dark flex items-center gap-3';
const paragraphStyle = 'text-gray-700 text-sm leading-relaxed';
const bulletListStyle = 'list-disc pl-5 text-gray-700 text-sm leading-relaxed space-y-2';
const iconStyle = 'text-brand-pink shrink-0';

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-serif font-black text-brand-dark uppercase tracking-widest mb-3">Shipping Policy</h1>
        <div className="h-1.5 w-20 bg-brand-pink mx-auto rounded-full mb-4" />
        <p className="text-gray-500 text-xs uppercase tracking-[0.25em]">Effective Date: April 23, 2026</p>
      </div>

      <div className="space-y-10 bg-white/60 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-brand-pink/10 shadow-2xl shadow-brand-pink/[0.03]">
        {/* Introduction */}
        <section className={sectionStyle}>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium italic border-l-4 border-brand-pink pl-6 py-2 bg-brand-pink/[0.02] rounded-r-xl">
            At Saundarya Shringar Private Limited, we are committed to delivering your orders in a
            timely, safe, and reliable manner. This Shipping Policy outlines our order processing,
            dispatch, and delivery procedures.
          </p>
        </section>

        {/* 1. Shipping Within India */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiTruck className={iconStyle} size={20} />
            <h2>1. Shipping Within India</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-gray-50/30 p-6 rounded-2xl border border-gray-100">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-brand-pink uppercase tracking-widest flex items-center gap-2">
                <FiPackage size={14} /> Order Processing
              </h3>
              <ul className={bulletListStyle}>
                <li className="font-semibold text-brand-dark">Orders are processed and dispatched within 20 working days from order confirmation.</li>
                <li>Working days: Monday to Friday (excluding public holidays).</li>
                <li>Orders placed on Sundays or public holidays will be processed on the next working day.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-brand-pink uppercase tracking-widest flex items-center gap-2">
                <FiMapPin size={14} /> Delivery Timelines
              </h3>
              <ul className={bulletListStyle}>
                <li><span className="font-bold">Metro Cities:</span> 3–5 business days</li>
                <li><span className="font-bold">Non-Metro Locations:</span> 7–10 business days</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-brand-pink/[0.02] rounded-xl border border-brand-pink/5">
            <p className="text-xs font-bold text-brand-pink uppercase tracking-widest mb-2">Possible Delays:</p>
            <ul className={bulletListStyle}>
              <li>High demand periods (festivals, sales, promotions).</li>
              <li>Temporary stock unavailability (dispatch may take 2–6 weeks).</li>
              <li>Unforeseen logistics or external factors.</li>
            </ul>
            <p className="text-[10px] text-gray-500 italic mt-3">In such cases, customers will be informed via email or phone updates.</p>
          </div>
        </section>

        {/* 2. International Shipping */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiGlobe className={iconStyle} size={20} />
            <h2>2. International Shipping</h2>
          </div>
          <p className={paragraphStyle}>
            We ship globally, including regions such as the USA, Europe, Singapore, and the Middle
            East.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Shipping Charges</h3>
              <ul className={bulletListStyle}>
                <li>International shipping charges are borne by the customer.</li>
                <li>Additional handling or service charges may apply.</li>
                <li>Final shipping cost is calculated based on weight and destination and displayed at checkout.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-brand-dark uppercase tracking-wider">Customs & Duties</h3>
              <ul className={bulletListStyle}>
                <li>Customers are responsible for providing required documents for customs clearance.</li>
                <li>Custom duties, taxes, and import charges must be borne by the customer.</li>
                <li>If a shipment is held at customs, the customer is responsible for coordinating clearance.</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 border-l-2 border-brand-pink bg-brand-pink/[0.01]">
            <p className="text-xs font-serif italic text-gray-500">
              Note: Due to varying international regulations, delivery timelines cannot be guaranteed for
              international orders.
            </p>
          </div>
        </section>

        {/* 3. Order Tracking */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiPackage className={iconStyle} size={20} />
            <h2>3. Order Tracking</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>Once dispatched, a tracking ID/link will be shared via email or SMS.</li>
            <li>Customers can track their shipment status in real time.</li>
          </ul>
        </section>

        {/* 4. Delivery Support */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiHelpCircle className={iconStyle} size={20} />
            <h2>4. Delivery Support & Issues</h2>
          </div>
          <p className={paragraphStyle}>
            If you face any delays, tracking issues, or delivery concerns, please contact us:
          </p>
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-brand-dark/5 rounded-2xl">
            <a href="mailto:care@saundaryashringar.com" className="flex items-center gap-3 text-sm text-brand-dark hover:text-brand-pink transition-colors">
              <FiMail className="text-brand-pink" /> care@saundaryashringar.com
            </a>
            <a href="https://wa.me/919896472169" className="flex items-center gap-3 text-sm text-brand-dark hover:text-brand-pink transition-colors">
              <FiPhone className="text-brand-pink" /> +91-9896472169
            </a>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center mt-2">We aim to respond promptly and assist you with resolution.</p>
        </section>

        {/* 5. Governing Law */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShield className={iconStyle} size={20} />
            <h2>5. Governing Law</h2>
          </div>
          <p className={paragraphStyle}>
            This Shipping Policy is governed by the laws of India.
            All disputes shall be subject to the jurisdiction of courts in Fatehabad, Haryana.
          </p>
        </section>

        {/* 6. Contact Information */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiMail className={iconStyle} size={20} />
            <h2>6. Contact Information</h2>
          </div>
          <div className="bg-brand-pink/[0.03] p-8 rounded-3xl border border-brand-pink/5 relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <h3 className="font-serif text-lg text-brand-dark font-black tracking-widest uppercase">Saundarya Shringar Private Limited</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest">Address</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Lajpat Nagar, Near Radha Swamibhawan<br />
                    Fatehabad – 125050, Haryana, India
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest">Direct Contact</p>
                  <p className="text-sm text-gray-700">Email: care@saundaryashringar.com</p>
                  <p className="text-sm text-gray-700">Phone: +91-9896472169</p>
                </div>
              </div>
            </div>
            {/* Subtle background decoration */}
            <FiTruck className="absolute -bottom-4 -right-4 text-brand-pink/5 w-32 h-32 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>
        </section>

        <div className="pt-10 border-t border-brand-pink/10 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
            © 2026 Saundarya Shringar Private Limited. Global Luxury, Delivered.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
