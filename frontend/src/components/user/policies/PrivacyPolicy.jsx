import React from 'react';
import { FiShield, FiLock, FiEye, FiCheckCircle } from 'react-icons/fi';

const sectionStyle = 'space-y-3';
const headingStyle = 'text-base md:text-lg font-bold uppercase tracking-widest text-brand-dark';
const paragraphStyle = 'text-gray-700 text-sm leading-relaxed';
const bulletListStyle = 'list-disc pl-5 text-gray-700 text-sm leading-relaxed space-y-1';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-widest mb-2">Privacy Policy</h1>
        <div className="h-1 w-12 bg-brand-pink mx-auto rounded-full" />
        <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.2em]">Effective Date: 01/04/2026</p>
      </div>

      <div className="space-y-6 bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-brand-pink/10 shadow-xl shadow-brand-pink/[0.02]">
        <section className={sectionStyle}>
          <p className={paragraphStyle}>
            At Saundarya Shringar Private Limited, your privacy is not just a priority, it is a commitment.
            This policy explains how we collect, use, store, and protect your information when you use our
            website: www.saundaryashringar.com.
          </p>
          <p className={paragraphStyle}>
            By using our website, you agree to the practices described in this policy. If you do not agree,
            please discontinue use of the platform.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiEye className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>1. About Us</h2>
          </div>
          <p className={paragraphStyle}>
            Saundarya Shringar Private Limited is a company incorporated under the Companies Act of India,
            with its registered office at Lajpat Nagar, Near Radha Swamibhawan, Fatehabad - 125050,
            Haryana, India.
          </p>
          <p className={paragraphStyle}>
            We are dedicated to safeguarding your personal information while delivering a seamless and
            secure shopping experience.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiCheckCircle className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>2. What Information We Collect</h2>
          </div>
          <p className={paragraphStyle}>Personal information may include:</p>
          <ul className={bulletListStyle}>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Shipping and billing address</li>
            <li>Payment details (processed securely via gateways)</li>
          </ul>
          <p className={paragraphStyle}>Non-personal information may include:</p>
          <ul className={bulletListStyle}>
            <li>IP address</li>
            <li>Device and browser details</li>
            <li>Pages visited and time spent</li>
            <li>Date, time, and interaction data</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiLock className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>3. How We Use Your Information</h2>
          </div>
          <p className={paragraphStyle}>We use your information to:</p>
          <ul className={bulletListStyle}>
            <li>Process and deliver your orders</li>
            <li>Provide customer support</li>
            <li>Improve website functionality and user experience</li>
            <li>Personalize content and recommendations</li>
            <li>Prevent fraud and ensure security</li>
            <li>Send updates, offers, and important notifications</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiShield className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>4. Cookies and Tracking Technologies</h2>
          </div>
          <p className={paragraphStyle}>We use cookies to improve your browsing experience by:</p>
          <ul className={bulletListStyle}>
            <li>Remembering login details</li>
            <li>Customizing content</li>
            <li>Enhancing website performance</li>
            <li>Ensuring security</li>
          </ul>
          <p className={paragraphStyle}>
            You may disable cookies through your browser settings, though some features may not function properly.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>5. Sharing Your Information</h2>
          <p className={paragraphStyle}>Your data may be shared with:</p>
          <ul className={bulletListStyle}>
            <li>Payment gateway providers</li>
            <li>Courier and logistics partners</li>
            <li>IT and support service providers</li>
          </ul>
          <p className={paragraphStyle}>
            These third parties only use your data to perform services on our behalf.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>6. Communication</h2>
          <p className={paragraphStyle}>By using our website, you agree to receive:</p>
          <ul className={bulletListStyle}>
            <li>Order updates and service notifications</li>
            <li>Promotional emails, SMS, or offers</li>
          </ul>
          <p className={paragraphStyle}>You may opt out of marketing communications at any time.</p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>7. Legal Disclosures</h2>
          <p className={paragraphStyle}>We may disclose your information if required:</p>
          <ul className={bulletListStyle}>
            <li>By law, court order, or legal process</li>
            <li>To protect our rights, users, or platform</li>
            <li>During business transfers (merger, acquisition, restructuring)</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>8. Third-Party Links</h2>
          <p className={paragraphStyle}>
            Our website may contain links to third-party websites. We are not responsible for their privacy
            practices and recommend reviewing their policies before sharing information.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>9. Data Security</h2>
          <p className={paragraphStyle}>We implement appropriate security measures to protect your information from:</p>
          <ul className={bulletListStyle}>
            <li>Unauthorized access</li>
            <li>Misuse or alteration</li>
            <li>Data breaches</li>
          </ul>
          <p className={paragraphStyle}>
            However, due to the nature of the internet, absolute security cannot be guaranteed.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>10. Children's Privacy</h2>
          <p className={paragraphStyle}>
            Our website is not intended for individuals under 18 years of age. We do not knowingly collect
            data from minors. If such data is identified, it will be deleted promptly.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>11. Updates to This Policy</h2>
          <p className={paragraphStyle}>
            We may update this Privacy Policy from time to time to reflect changes in practices or
            regulations. Continued use of the website signifies acceptance of the updated policy.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>12. Governing Law</h2>
          <p className={paragraphStyle}>
            This Privacy Policy is governed by the laws of India. Any disputes shall be subject to the
            jurisdiction of courts in Fatehabad, Haryana.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>13. Contact Us</h2>
          <p className={paragraphStyle}>If you have any privacy-related questions, concerns, or requests:</p>
          <ul className={bulletListStyle}>
            <li>Email: care@saundaryashringar.com</li>
            <li>Phone/WhatsApp: +91-9896472169</li>
            <li>Address: Lajpat Nagar, Near Radha Swamibhawan, Fatehabad, Haryana</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-brand-pink/5 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            © 2026 Saundarya Shringar Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
