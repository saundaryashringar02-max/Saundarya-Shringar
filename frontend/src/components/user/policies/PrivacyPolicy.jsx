import React from 'react';
import { FiShield, FiLock, FiEye, FiCheckCircle, FiUserCheck, FiDatabase, FiShare2, FiMail, FiExternalLink, FiClock, FiHelpCircle } from 'react-icons/fi';

const sectionStyle = 'space-y-4';
const headingStyle = 'text-base md:text-lg font-bold uppercase tracking-widest text-brand-dark flex items-center gap-3';
const paragraphStyle = 'text-gray-700 text-sm leading-relaxed';
const bulletListStyle = 'list-disc pl-5 text-gray-700 text-sm leading-relaxed space-y-2';
const iconStyle = 'text-brand-pink shrink-0';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-serif font-black text-brand-dark uppercase tracking-widest mb-3">Privacy Policy</h1>
        <div className="h-1.5 w-20 bg-brand-pink mx-auto rounded-full mb-4" />
        <p className="text-gray-500 text-xs uppercase tracking-[0.25em]">Effective Date: April 23, 2026</p>
      </div>

      <div className="space-y-10 bg-white/60 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-brand-pink/10 shadow-2xl shadow-brand-pink/[0.03]">
        {/* Introduction */}
        <section className={sectionStyle}>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium italic border-l-4 border-brand-pink pl-6 py-2 bg-brand-pink/[0.02] rounded-r-xl">
            At Saundarya Shringar Private Limited, your privacy is our responsibility and commitment. This Privacy Policy explains how we collect, use, store, and protect your personal information.
          </p>
          <p className={paragraphStyle}>By using our website, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of the platform.</p>
        </section>

        {/* 1. About Us */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiEye className={iconStyle} size={20} />
            <h2>1. About Us</h2>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-pink mb-3">SAUNDARYA SHRINGAR PRIVATE LIMITED</p>
          <p className={paragraphStyle}>Saundarya Shringar Private Limited is a company incorporated under the laws of India.</p>
          <div className="p-4 bg-brand-pink/[0.02] rounded-xl border border-brand-pink/5 space-y-3">
            <div>
              <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest mb-1">CIN</p>
              <p className="text-sm font-semibold text-brand-dark">U47722HR2026PTC142451</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest mb-1">Registered Office</p>
              <p className="text-sm font-semibold text-brand-dark">Lajpat Nagar, Near Radha Swamibhawan, Fatehabad – 125050, Haryana, India</p>
            </div>
          </div>
          <p className={paragraphStyle}>We specialize in cosmetics and beauty-related products and are committed to ensuring a safe, secure, and personalized shopping experience.</p>
        </section>

        {/* 2. Eligibility */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiUserCheck className={iconStyle} size={20} />
            <h2>2. Eligibility (18+ Use)</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>Our website and products are intended for individuals 18 years and above</li>
            <li>Minors may use under parental or guardian supervision</li>
            <li>We do not knowingly collect personal information from minors without appropriate supervision</li>
          </ul>
        </section>

        {/* 3. Information We Collect */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiDatabase className={iconStyle} size={20} />
            <h2>3. Information We Collect</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-bold text-brand-pink uppercase tracking-wider mb-2">Personal Information</h3>
              <ul className={bulletListStyle}>
                <li>Name and Email</li>
                <li>Phone number</li>
                <li>Shipping and billing address</li>
                <li>Payment details (via gateways)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand-pink uppercase tracking-wider mb-2">Non-Personal Information</h3>
              <ul className={bulletListStyle}>
                <li>IP address</li>
                <li>Device and browser details</li>
                <li>Browsing behavior</li>
                <li>Session data</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. How We Use */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiCheckCircle className={iconStyle} size={20} />
            <h2>4. How We Use Your Information</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>Process and deliver orders</li>
            <li>Provide customer support</li>
            <li>Improve website performance</li>
            <li>Personalize recommendations</li>
            <li>Prevent fraud and ensure security</li>
            <li>Send order updates and notifications</li>
          </ul>
        </section>

        {/* 5. Cookies */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShield className={iconStyle} size={20} />
            <h2>5. Cookies & Tracking</h2>
          </div>
          <p className={paragraphStyle}>We use cookies to enhance browsing, remember preferences, analyze performance, and provide relevant suggestions. You can disable cookies in browser settings.</p>
        </section>

        {/* 6. Sharing */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShare2 className={iconStyle} size={20} />
            <h2>6. Sharing of Information</h2>
          </div>
          <p className={paragraphStyle}>We share information with payment gateways, courier partners, and IT/analytics providers only for operational service delivery.</p>
        </section>

        {/* 7. Communication */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiMail className={iconStyle} size={20} />
            <h2>7. Communication Preferences</h2>
          </div>
          <p className={paragraphStyle}>You consent to order confirmations and promotional communications. You can opt out anytime via unsubscribe options.</p>
        </section>

        {/* 8. Legal Disclosures */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiLock className={iconStyle} size={20} />
            <h2>8. Legal Disclosures</h2>
          </div>
          <p className={paragraphStyle}>We may disclose information to comply with law, enforce terms, protect rights, or facilitate business transfers.</p>
        </section>

        {/* 9. Third-Party Links */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiExternalLink className={iconStyle} size={20} />
            <h2>9. Third-Party Links</h2>
          </div>
          <p className={paragraphStyle}>Our website may contain links to external sites. We are not responsible for their privacy practices.</p>
        </section>

        {/* 10. Data Security */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShield className={iconStyle} size={20} />
            <h2>10. Data Security</h2>
          </div>
          <p className={paragraphStyle}>We implement reasonable security measures to protect data from unauthorized access, misuse, and breaches. No internet transmission is completely secure.</p>
        </section>

        {/* 11. Data Retention */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiClock className={iconStyle} size={20} />
            <h2>11. Data Retention</h2>
          </div>
          <p className={paragraphStyle}>We retain your personal and customer data only for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. Specifically: Account information and general customer data are retained for the active duration of the account plus 2 years after closure. Order and transaction data are kept for 7 years as required by Indian tax law. Data related to return disputes is retained for a minimum of 3 years. Data deletion requests are processed within 30 days where legally permissible.</p>
        </section>

        {/* 12. Your Rights */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiHelpCircle className={iconStyle} size={20} />
            <h2>12. Your Rights</h2>
          </div>
          <p className={paragraphStyle}>You may request access to your personal data, request correction or deletion, and withdraw consent for marketing communications.</p>
        </section>

        {/* 13. Updates */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiClock className={iconStyle} size={20} />
            <h2>13. Updates to This Policy</h2>
          </div>
          <p className={paragraphStyle}>We may update this Privacy Policy from time to time. Continued use of the website signifies your acceptance of the updated policy.</p>
        </section>

        {/* 14. Governing Law */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShield className={iconStyle} size={20} />
            <h2>14. Governing Law</h2>
          </div>
          <p className={paragraphStyle}>This Privacy Policy is governed by the laws of India. All disputes shall be subject to the jurisdiction of courts in Fatehabad, Haryana.</p>
        </section>

        {/* 15. Contact Us */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiMail className={iconStyle} size={20} />
            <h2>15. Contact Us</h2>
          </div>
          <div className="p-6 bg-brand-pink/[0.02] rounded-2xl border border-brand-pink/5 text-center">
            <p className="text-[10px] text-brand-pink font-bold uppercase tracking-widest mb-4">For Privacy-Related Queries</p>
            <div className="flex flex-col md:flex-row justify-center gap-6 text-sm">
              <a href="mailto:care@saundaryashringar.com,saundaryashringar02@gmail.com" className="text-brand-dark hover:text-brand-pink transition-colors">care@saundaryashringar.com, saundaryashringar02@gmail.com</a>
              <a href="https://api.whatsapp.com/send?phone=919896472169" target="_blank" rel="noreferrer" className="text-brand-dark hover:text-brand-pink transition-colors">+91-9896472169</a>
              <span className="text-brand-dark">Lajpat Nagar, Fatehabad, Haryana</span>
            </div>
          </div>
        </section>

        <div className="pt-10 border-t border-brand-pink/10 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
            © 2026 Saundarya Shringar Private Limited. Sculpting Beauty, Securing Trust.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
