import React from 'react';
import { FiFileText, FiUserCheck, FiTarget, FiInfo, FiLock, FiDollarSign, FiShoppingBag, FiRefreshCcw, FiGlobe, FiAlertTriangle, FiCpu, FiExternalLink, FiShield, FiMail, FiMapPin } from 'react-icons/fi';

const sectionStyle = 'space-y-4';
const headingStyle = 'text-base md:text-lg font-bold uppercase tracking-widest text-brand-dark flex items-center gap-3';
const paragraphStyle = 'text-gray-700 text-sm leading-relaxed';
const bulletListStyle = 'list-disc pl-5 text-gray-700 text-sm leading-relaxed space-y-2';
const iconStyle = 'text-brand-pink shrink-0';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-serif font-black text-brand-dark uppercase tracking-widest mb-3">Terms & Conditions</h1>
        <div className="h-1.5 w-20 bg-brand-pink mx-auto rounded-full mb-4" />
        <p className="text-gray-500 text-xs uppercase tracking-[0.25em]">Effective Date: April 23, 2026</p>
      </div>

      <div className="space-y-10 bg-white/60 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-brand-pink/10 shadow-2xl shadow-brand-pink/[0.03]">
        {/* Introduction */}
        <section className={sectionStyle}>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium italic border-l-4 border-brand-pink pl-6 py-2 bg-brand-pink/[0.02] rounded-r-xl">
            Welcome to Saundarya Shringar Private Limited, where elegance meets authenticity.
            These Terms & Conditions (“Terms”) govern your access to and use of our website
            <a href="https://www.saundaryashringar.com" className="text-brand-pink hover:underline ml-1">www.saundaryashringar.com</a>.
          </p>
          <p className={paragraphStyle}>
            By accessing, browsing, or purchasing from our website, you agree to be bound by these
            Terms along with our Privacy Policy. If you do not agree, please discontinue use of the
            platform.
          </p>
        </section>

        {/* 1. About Us */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiInfo className={iconStyle} size={20} />
            <h2>1. About Us</h2>
          </div>
          <p className={paragraphStyle}>
            Saundarya Shringar Private Limited is committed to delivering quality products and a
            seamless digital experience.
          </p>
          <div className="p-4 bg-brand-pink/[0.02] rounded-xl border border-brand-pink/5">
            <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest mb-1">Registered Office</p>
            <p className="text-sm font-semibold text-brand-dark">
              Lajpat Nagar, Near Radha Swamibhawan<br />
              Fatehabad – 125050, Haryana, India
            </p>
          </div>
        </section>

        {/* 2. Acceptance of Terms */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiFileText className={iconStyle} size={20} />
            <h2>2. Acceptance of Terms</h2>
          </div>
          <p className={paragraphStyle}>By using our website, you:</p>
          <ul className={bulletListStyle}>
            <li>Agree to comply with these Terms and applicable laws</li>
            <li>Accept any updates or modifications made from time to time</li>
            <li>Acknowledge that continued use constitutes acceptance of revised Terms</li>
          </ul>
          <p className="text-xs text-gray-500 italic">We reserve the right to update these Terms at our sole discretion.</p>
        </section>

        {/* 3. Eligibility */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiUserCheck className={iconStyle} size={20} />
            <h2>3. Eligibility</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>Users must be 18 years or older to make purchases</li>
            <li>Minors may use the website only under parental or guardian supervision</li>
            <li>We reserve the right to restrict or terminate access if eligibility criteria are not met</li>
          </ul>
        </section>

        {/* 4. User Conduct */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiTarget className={iconStyle} size={20} />
            <h2>4. User Conduct</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3 bg-green-50/30 p-6 rounded-2xl border border-green-100/50">
              <h3 className="text-xs font-bold text-green-700 uppercase tracking-widest">You Agree To</h3>
              <ul className={bulletListStyle}>
                <li>Provide accurate information</li>
                <li>Use for lawful purposes only</li>
                <li>Maintain platform security</li>
              </ul>
            </div>
            <div className="space-y-3 bg-red-50/30 p-6 rounded-2xl border border-red-100/50">
              <h3 className="text-xs font-bold text-red-700 uppercase tracking-widest">You Agree Not To</h3>
              <ul className={bulletListStyle}>
                <li>Post harmful or abusive content</li>
                <li>Upload viruses or malware</li>
                <li>Impersonate others</li>
                <li>Engage in fraudulent activities</li>
              </ul>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">Violation may result in suspension or termination of access.</p>
        </section>

        {/* 5. Account & Security */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiLock className={iconStyle} size={20} />
            <h2>5. Account & Security</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>All activities under your account are your responsibility</li>
            <li>We reserve the right to suspend accounts with false or misleading information</li>
          </ul>
        </section>

        {/* 6. Orders & Pricing */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiDollarSign className={iconStyle} size={20} />
            <h2>6. Orders, Pricing & Payments</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-brand-pink uppercase tracking-widest mb-3">Pricing</h3>
              <p className={paragraphStyle}>All prices are listed on the website. Additional charges such as taxes, shipping, and handling may apply.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand-pink uppercase tracking-widest mb-3">Order Acceptance</h3>
              <p className={paragraphStyle}>Placing an order constitutes an offer to purchase. We reserve the right to accept, reject, or cancel orders within 1 business day.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand-pink uppercase tracking-widest mb-3">Payments</h3>
              <p className={paragraphStyle}>Payments are processed via secure third-party payment gateways. You agree to use only authorized payment methods. We are not liable for unauthorized transactions due to user negligence.</p>
            </div>
          </div>
        </section>

        {/* 7. Product Info */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShoppingBag className={iconStyle} size={20} />
            <h2>7. Product Information</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>We strive to ensure accurate product descriptions and images</li>
            <li>Minor variations may occur due to display settings or availability</li>
            <li>Products are intended for personal use only and not for resale unless permitted</li>
          </ul>
        </section>

        {/* 8. Returns & Refunds */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiRefreshCcw className={iconStyle} size={20} />
            <h2>8. Returns, Refunds & Cancellations</h2>
          </div>
          <p className={paragraphStyle}>
            All returns, refunds, and cancellations are governed by our <a href="/return-policy" className="text-brand-pink font-bold hover:underline">Return & Refund Policy</a>.
            Refunds are subject to verification and approval.
          </p>
        </section>

        {/* 9. Availability */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiGlobe className={iconStyle} size={20} />
            <h2>9. Website Availability</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>The website may undergo maintenance, updates, or interruptions</li>
            <li>We do not guarantee uninterrupted or error-free access</li>
            <li>We are not liable for delays or disruptions beyond our control</li>
          </ul>
        </section>

        {/* 10. Disclaimer */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiAlertTriangle className={iconStyle} size={20} />
            <h2>10. Disclaimer of Warranties</h2>
          </div>
          <p className={paragraphStyle}>All services and content are provided on an “as is” and “as available” basis. We do not guarantee complete accuracy or secure operation.</p>
          <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
            <p className="text-xs font-bold text-brand-dark uppercase tracking-widest mb-3">We disclaim liability for:</p>
            <ul className={bulletListStyle}>
              <li>Financial loss or data loss</li>
              <li>Business interruption</li>
              <li>Unauthorized transactions</li>
              <li>Issues arising from third-party services</li>
            </ul>
          </div>
        </section>

        {/* 11. Intellectual Property */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiCpu className={iconStyle} size={20} />
            <h2>11. Intellectual Property</h2>
          </div>
          <p className={paragraphStyle}>All website content, including text, images, logos, and design, is the property of Saundarya Shringar Private Limited or its licensors.</p>
          <ul className={bulletListStyle}>
            <li><span className="font-bold">You may:</span> Access content for personal use.</li>
            <li><span className="font-bold text-red-600">You may NOT:</span> Copy, reproduce, distribute, or exploit content without prior written permission.</li>
          </ul>
        </section>

        {/* 12. Third-Party Services */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiExternalLink className={iconStyle} size={20} />
            <h2>12. Third-Party Services</h2>
          </div>
          <ul className={bulletListStyle}>
            <li>The website may contain links or integrations with third-party services</li>
            <li>We do not control or endorse such services</li>
            <li>Use of third-party platforms is at your own risk</li>
          </ul>
        </section>

        {/* 13. Limitation of Liability */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiAlertTriangle className={iconStyle} size={20} />
            <h2>13. Limitation of Liability</h2>
          </div>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed font-bold border-l-4 border-brand-pink pl-6 py-2 bg-brand-pink/[0.02] rounded-r-xl">
            To the maximum extent permitted by law, our liability shall be limited to the value of the
            purchased product. We shall not be liable for indirect or consequential damages.
          </p>
        </section>

        {/* 14. Governing Law */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiShield className={iconStyle} size={20} />
            <h2>14. Governing Law & Jurisdiction</h2>
          </div>
          <p className={paragraphStyle}>
            These Terms are governed by the laws of India.
            All disputes shall be subject to the exclusive jurisdiction of courts in Fatehabad, Haryana.
          </p>
        </section>

        {/* 15. Severability */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiFileText className={iconStyle} size={20} />
            <h2>15. Severability</h2>
          </div>
          <p className={paragraphStyle}>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
        </section>

        {/* 16. Contact Us */}
        <section className={sectionStyle}>
          <div className={headingStyle}>
            <FiMail className={iconStyle} size={20} />
            <h2>16. Contact Us</h2>
          </div>
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
              <p className="text-sm text-brand-dark flex gap-2"><FiMapPin className="mt-1 shrink-0" size={12} /> Lajpat Nagar, Near Radha Swamibhawan, Fatehabad, Haryana</p>
            </div>
          </div>
        </section>

        <div className="pt-10 border-t border-brand-pink/10 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
            © 2026 Saundarya Shringar Private Limited. Ethical Luxury, Defined.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
