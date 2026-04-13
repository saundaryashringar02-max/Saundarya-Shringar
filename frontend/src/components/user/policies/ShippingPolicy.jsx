import React from 'react';
import { FiTruck, FiGlobe, FiPackage, FiAlertCircle } from 'react-icons/fi';

const sectionStyle = 'space-y-3';
const headingStyle = 'text-base md:text-lg font-bold uppercase tracking-widest text-brand-dark';
const paragraphStyle = 'text-gray-700 text-sm leading-relaxed';
const bulletListStyle = 'list-disc pl-5 text-gray-700 text-sm leading-relaxed space-y-1';

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-widest mb-2">Shipping Policy</h1>
        <div className="h-1 w-12 bg-brand-pink mx-auto rounded-full" />
        <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.2em]">Effective Date: 01/04/2026</p>
      </div>

      <div className="space-y-6 bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-brand-pink/10 shadow-xl shadow-brand-pink/[0.02]">
        <section className={sectionStyle}>
          <p className={paragraphStyle}>
            At Saundarya Shringar Private Limited, we are committed to delivering your orders with care,
            efficiency, and reliability. This Shipping Policy outlines how we process, dispatch, and deliver
            your purchases.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiTruck className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>1. Shipping Within India</h2>
          </div>
          <p className={paragraphStyle}>Order Processing:</p>
          <ul className={bulletListStyle}>
            <li>Orders are typically processed and shipped within 15 working days from order confirmation</li>
            <li>Working days are Monday to Friday (excluding public holidays)</li>
            <li>Orders placed on Sundays or holidays are processed on the next working day</li>
          </ul>
          <p className={paragraphStyle}>Estimated Delivery Timelines after dispatch:</p>
          <ul className={bulletListStyle}>
            <li>Metro cities: 3-5 business days</li>
            <li>Non-metro locations: 7-10 business days</li>
          </ul>
          <p className={paragraphStyle}>Special situations that may affect timelines:</p>
          <ul className={bulletListStyle}>
            <li>High-demand periods such as festivals or sales</li>
            <li>Out-of-stock items (dispatch may take 2-6 weeks)</li>
            <li>Unforeseen logistics or external circumstances</li>
          </ul>
          <p className={paragraphStyle}>
            In all such cases, our team will keep you informed via email or phone updates.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiGlobe className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>2. International Shipping</h2>
          </div>
          <p className={paragraphStyle}>
            We serve customers globally, including the USA, Europe, Singapore, and the Middle East.
          </p>
          <p className={paragraphStyle}>Key points:</p>
          <ul className={bulletListStyle}>
            <li>International shipping charges are borne by the customer</li>
            <li>Additional handling charges may apply for customs and airport clearance</li>
            <li>Final shipping cost depends on package weight and destination zone, shown at checkout</li>
          </ul>
          <p className={paragraphStyle}>Customs and import responsibilities:</p>
          <ul className={bulletListStyle}>
            <li>Customers must provide documents required for customs clearance</li>
            <li>Duties, taxes, and import charges are customer responsibility</li>
            <li>If shipment is held at customs, customer must coordinate clearance</li>
          </ul>
          <p className={paragraphStyle}>
            Due to varying international regulations, we cannot guarantee delivery timelines for international orders.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiPackage className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>3. Order Tracking</h2>
          </div>
          <p className={paragraphStyle}>
            Once your order is dispatched, a tracking number will be shared via email or SMS so you can
            monitor shipment status in real time.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiAlertCircle className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>4. Delivery Support and Issues</h2>
          </div>
          <p className={paragraphStyle}>
            For delays, tracking issues, or missing shipments, please contact us promptly:
          </p>
          <ul className={bulletListStyle}>
            <li>Email: care@saundaryashringar.com</li>
            <li>Phone/WhatsApp: +91-9896472169</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>5. Governing Law</h2>
          <p className={paragraphStyle}>
            This Shipping Policy is governed by the laws of India. Any disputes arising from shipping or
            delivery shall fall under the jurisdiction of courts in Fatehabad, Haryana.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>6. Contact Information</h2>
          <p className={paragraphStyle}>For any shipping-related assistance:</p>
          <ul className={bulletListStyle}>
            <li>Saundarya Shringar Private Limited</li>
            <li>Lajpat Nagar, Near Radha Swamibhawan</li>
            <li>Fatehabad - 125050, Haryana</li>
            <li>Email: care@saundaryashringar.com</li>
            <li>Phone: +91-9896472169</li>
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

export default ShippingPolicy;