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
            At Saundarya Shringar Private Limited, your privacy is our responsibility and
            commitment. This Privacy Policy explains how we collect, use, store, and protect your
            personal information when you access or use our website <a href="https://www.saundaryashringar.com" className="text-brand-pink hover:underline">www.saundaryashringar.com</a>.
          </p>
          <p className={paragraphStyle}>
            By using our website, you agree to the terms of this Privacy Policy. If you do not agree,
            please discontinue use of the platform.
          </p>
        </section>

        {/* 1. About Us */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiEye className={iconStyle} size={20} />
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
            We specialize in cosmetics and beauty-related products and are committed to ensuring a safe,
            secure, and personalized shopping experience.
          </p>
        </section>

        {/* 2. Eligibility */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiUserCheck className={iconStyle} size={20} />
            <h2>2. Eligibility (18+ Use)</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>Our website and products are primarily intended for individuals 18 years of age and above</li>
            <li>If you are below 18 years, you may use this website and make purchases under the guidance and supervision of a parent or legal guardian</li>
            <li>We do not knowingly collect personal information from minors without appropriate supervision. If such data is identified, it will be handled in accordance with applicable laws</li>
          </ul>
        </section>

        {/* 3. Information We Collect */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiDatabase className={iconStyle} size={20} />
            <h2>3. Information We Collect</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-brand-pink uppercase tracking-wider">Personal Information</h3>
              <ul className={bulletListStyle}>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Shipping and billing address</li>
                <li>Payment details (processed securely via third-party gateways)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-brand-pink uppercase tracking-wider">Non-Personal Information</h3>
              <ul className={bulletListStyle}>
                <li>IP address</li>
                <li>Device, browser, and operating system details</li>
                <li>Pages visited, browsing behavior, and interaction data</li>
                <li>Date, time, and session activity</li>
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
          <p className={paragraphStyle}>We use your information to:</p>
          <ul className={bulletListStyle}>
            <li>Process, ship, and deliver your orders</li>
            <li>Provide customer support and resolve queries</li>
            <li>Improve website performance and user experience</li>
            <li>Personalize product recommendations (including beauty and cosmetic preferences)</li>
            <li>Prevent fraud and ensure platform security</li>
            <li>Send order updates, service notifications, and promotional offers (with opt-out option)</li>
          </ul>
        </section>

        {/* 5. Cookies */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShield className={iconStyle} size={20} />
            <h2>5. Cookies & Tracking Technologies</h2>
          </div>
          <p className={paragraphStyle}>We use cookies and similar technologies to:</p>
          <ul className={bulletListStyle}>
            <li>Enhance browsing experience</li>
            <li>Remember user preferences and login sessions</li>
            <li>Analyze website performance</li>
            <li>Provide relevant product suggestions</li>
          </ul>
          <p className={paragraphStyle}>
            You may disable cookies through your browser settings; however, some features may not
            function properly.
          </p>
        </section>

        {/* 6. Sharing */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShare2 className={iconStyle} size={20} />
            <h2>6. Sharing of Information</h2>
          </div>
          <p className={paragraphStyle}>We may share your information with trusted third parties strictly for operational purposes:</p>
          <ul className={bulletListStyle}>
            <li>Payment gateway providers</li>
            <li>Courier and logistics partners</li>
            <li>IT, analytics, and support service providers</li>
          </ul>
          <p className={paragraphStyle}>
            These parties are authorized to use your information only to provide services on our behalf
            and are obligated to maintain confidentiality.
          </p>
        </section>

        {/* 7. Communication */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiMail className={iconStyle} size={20} />
            <h2>7. Communication Preferences</h2>
          </div>
          <p className={paragraphStyle}>By using our website, you consent to receive:</p>
          <ul className={bulletListStyle}>
            <li>Order confirmations and service-related updates</li>
            <li>Promotional emails, SMS, or offers</li>
          </ul>
          <p className={paragraphStyle}>
            You may opt out of marketing communications at any time through unsubscribe options or
            by contacting us.
          </p>
        </section>

        {/* 8. Legal Disclosures */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiLock className={iconStyle} size={20} />
            <h2>8. Legal Disclosures</h2>
          </div>
          <p className={paragraphStyle}>We may disclose your information if required to:</p>
          <ul className={bulletListStyle}>
            <li>Comply with applicable laws, regulations, or legal processes</li>
            <li>Enforce our Terms & Conditions</li>
            <li>Protect our rights, users, or business interests</li>
            <li>Facilitate business transfers (such as mergers or acquisitions)</li>
          </ul>
        </section>

        {/* 9. Third-Party Links */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiExternalLink className={iconStyle} size={20} />
            <h2>9. Third-Party Links</h2>
          </div>
          <p className={paragraphStyle}>
            Our website may contain links to external websites. We are not responsible for their privacy
            practices and recommend reviewing their policies before sharing any information.
          </p>
        </section>

        {/* 10. Data Security */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShield className={iconStyle} size={20} />
            <h2>10. Data Security</h2>
          </div>
          <p className={paragraphStyle}>We implement reasonable technical and organizational measures to protect your data from:</p>
          <ul className={bulletListStyle}>
            <li>Unauthorized access</li>
            <li>Misuse, alteration, or disclosure</li>
            <li>Data breaches</li>
          </ul>
          <p className={paragraphStyle}>
            However, no method of transmission over the internet is completely secure, and absolute
            security cannot be guaranteed.
          </p>
        </section>

        {/* 11. Data Retention */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiClock className={iconStyle} size={20} />
            <h2>11. Data Retention</h2>
          </div>
          <p className={paragraphStyle}>We retain your personal information only for as long as necessary to:</p>
          <ul className={bulletListStyle}>
            <li>Fulfill the purposes outlined in this policy</li>
            <li>Comply with legal, regulatory, and accounting requirements</li>
          </ul>
        </section>

        {/* 12. Your Rights */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiHelpCircle className={iconStyle} size={20} />
            <h2>12. Your Rights</h2>
          </div>
          <p className={paragraphStyle}>Subject to applicable laws, you may:</p>
          <ul className={bulletListStyle}>
            <li>Request access to your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>
          <p className={paragraphStyle}>For such requests, please contact us using the details below.</p>
        </section>

        {/* 13. Updates */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiClock className={iconStyle} size={20} />
            <h2>13. Updates to This Policy</h2>
          </div>
          <p className={paragraphStyle}>
            We may update this Privacy Policy from time to time to reflect changes in practices,
            technology, or legal requirements. Continued use of the website signifies your acceptance of
            the updated policy.
          </p>
        </section>

        {/* 14. Governing Law */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShield className={iconStyle} size={20} />
            <h2>14. Governing Law</h2>
          </div>
          <p className={paragraphStyle}>
            This Privacy Policy is governed by the laws of India.
            All disputes shall be subject to the jurisdiction of courts in Fatehabad, Haryana.
          </p>
        </section>

        {/* 15. Contact Us */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiMail className={iconStyle} size={20} />
            <h2>15. Contact Us</h2>
          </div>
          <p className={paragraphStyle}>For any privacy-related queries or requests:</p>
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
            © 2026 Saundarya Shringar Private Limited. Sculpting Beauty, Securing Trust.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

