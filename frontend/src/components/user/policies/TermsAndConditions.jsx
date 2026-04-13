import React from 'react';
import { FiFileText, FiUserCheck, FiTarget, FiInfo } from 'react-icons/fi';

const sectionStyle = 'space-y-3';
const headingStyle = 'text-base md:text-lg font-bold uppercase tracking-widest text-brand-dark';
const paragraphStyle = 'text-gray-700 text-sm leading-relaxed';
const bulletListStyle = 'list-disc pl-5 text-gray-700 text-sm leading-relaxed space-y-1';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-widest mb-2">Terms and Conditions</h1>
        <div className="h-1 w-12 bg-brand-pink mx-auto rounded-full" />
        <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.2em]">Effective Date: 01/04/2026</p>
      </div>

      <div className="space-y-6 bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-brand-pink/10 shadow-xl shadow-brand-pink/[0.02]">
        <section className={sectionStyle}>
          <p className={paragraphStyle}>
            Welcome to Saundarya Shringar Private Limited, where elegance meets authenticity. These Terms and Conditions outline
            the rules and regulations governing your access to and use of our website: www.saundaryashringar.com.
          </p>
          <p className={paragraphStyle}>
            By accessing, browsing, or purchasing from our website, you acknowledge that you have read, understood, and agreed
            to be bound by these Terms, along with our Privacy Policy. If you do not agree, we respectfully request that you
            discontinue use of the platform.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiInfo className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>1. About Us</h2>
          </div>
          <p className={paragraphStyle}>
            Saundarya Shringar Private Limited is dedicated to delivering quality and trust through a seamless digital experience.
          </p>
          <p className={paragraphStyle}>
            Registered Office: Lajpat Nagar, Near Radha Swamibhawan, Fatehabad - 125050, Haryana, India.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiUserCheck className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>2. Your Agreement with Us</h2>
          </div>
          <p className={paragraphStyle}>Your use of our website represents a legally binding agreement. By continuing to engage with our platform, you:</p>
          <ul className={bulletListStyle}>
            <li>Accept all present and future Terms and Conditions</li>
            <li>Agree to comply with applicable laws and regulations</li>
            <li>Consent to updates made to these Terms from time to time</li>
          </ul>
          <p className={paragraphStyle}>
            We reserve the right to revise these Terms at our sole discretion. Continued usage signifies your acceptance of any
            modifications.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiTarget className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>3. Eligibility and Access</h2>
          </div>
          <p className={paragraphStyle}>To ensure a safe and responsible environment:</p>
          <ul className={bulletListStyle}>
            <li>Users must be at least 18 years of age</li>
            <li>Minors may only use the website under parental or guardian supervision</li>
          </ul>
          <p className={paragraphStyle}>We reserve the right to restrict or terminate access if eligibility conditions are not met.</p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>4. User Conduct and Responsibilities</h2>
          <p className={paragraphStyle}>By using our website, you agree to:</p>
          <ul className={bulletListStyle}>
            <li>Provide accurate, authentic, and current information</li>
            <li>Use the website strictly for personal and lawful purposes</li>
            <li>Respect the integrity and security of the platform</li>
          </ul>
          <p className={paragraphStyle}>You agree not to:</p>
          <ul className={bulletListStyle}>
            <li>Post or transmit harmful, abusive, defamatory, or unlawful content</li>
            <li>Upload viruses, malware, or disruptive code</li>
            <li>Misrepresent your identity or impersonate others</li>
            <li>Engage in spam, fraudulent, or manipulative activities</li>
            <li>Use the platform for unauthorized commercial gain</li>
          </ul>
          <p className={paragraphStyle}>Any violation may result in immediate suspension or permanent termination of access.</p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>5. Account and Security</h2>
          <ul className={bulletListStyle}>
            <li>You must ensure your details are accurate and up to date</li>
            <li>You are solely responsible for maintaining the confidentiality of your login credentials</li>
            <li>Any activity under your account is deemed your responsibility</li>
          </ul>
          <p className={paragraphStyle}>We reserve the right to suspend accounts that provide false or misleading information.</p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>6. Orders, Pricing and Transactions</h2>
          <p className={paragraphStyle}>Pricing transparency:</p>
          <ul className={bulletListStyle}>
            <li>All prices are displayed on the website</li>
            <li>Additional charges such as taxes, shipping, and handling may apply</li>
          </ul>
          <p className={paragraphStyle}>Order acceptance:</p>
          <ul className={bulletListStyle}>
            <li>Placing an order signifies your commitment to purchase</li>
            <li>Orders may be reviewed and canceled by us within 1 business day if necessary</li>
          </ul>
          <p className={paragraphStyle}>Payments:</p>
          <ul className={bulletListStyle}>
            <li>Transactions are securely processed via trusted third-party payment gateways</li>
            <li>You agree to use only valid and authorized payment methods</li>
            <li>We disclaim liability for unauthorized transactions arising from user negligence</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>7. Product Experience</h2>
          <ul className={bulletListStyle}>
            <li>Product descriptions are provided with maximum accuracy</li>
            <li>Products are intended for individual use only</li>
            <li>Unless explicitly stated, products cannot be combined, exchanged, or redeemed for cash</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>8. Refund and Resolution Policy</h2>
          <p className={paragraphStyle}>Refunds may be initiated only under the following circumstances:</p>
          <ul className={bulletListStyle}>
            <li>Products received are damaged or defective</li>
            <li>There is a technical or operational error attributable to us</li>
            <li>Orders are canceled due to changes in availability or pricing</li>
          </ul>
          <p className={paragraphStyle}>All refund decisions are subject to verification and approval.</p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>9. Website Performance and Availability</h2>
          <ul className={bulletListStyle}>
            <li>The website may occasionally undergo maintenance or upgrades</li>
            <li>We do not guarantee uninterrupted, error-free, or virus-free access</li>
            <li>Certain features may be temporarily unavailable</li>
          </ul>
          <p className={paragraphStyle}>We are not liable for disruptions beyond our reasonable control.</p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>10. Disclaimer of Warranties</h2>
          <p className={paragraphStyle}>All content and services are provided on an as-is and as-available basis. We do not warrant:</p>
          <ul className={bulletListStyle}>
            <li>Absolute accuracy or completeness of information</li>
            <li>Continuous availability of services</li>
            <li>Error-free functionality</li>
          </ul>
          <p className={paragraphStyle}>We expressly disclaim liability for:</p>
          <ul className={bulletListStyle}>
            <li>Financial or data loss</li>
            <li>Business interruption</li>
            <li>Unauthorized payment usage</li>
            <li>Damages arising from third-party services</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiFileText className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>11. Intellectual Property Rights</h2>
          </div>
          <p className={paragraphStyle}>
            All content on this website including text, visuals, logos, and design is the intellectual property of
            Saundarya Shringar Private Limited or its licensors.
          </p>
          <p className={paragraphStyle}>You may:</p>
          <ul className={bulletListStyle}>
            <li>Access and use content for personal purposes</li>
          </ul>
          <p className={paragraphStyle}>You may not:</p>
          <ul className={bulletListStyle}>
            <li>Copy, reproduce, or commercially exploit content without prior written consent</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>12. Third-Party Integrations</h2>
          <ul className={bulletListStyle}>
            <li>Third-party links or integrations are provided for convenience only</li>
            <li>We do not control or endorse third-party content</li>
            <li>Use of such services is entirely at your own risk</li>
          </ul>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>13. Legal Jurisdiction</h2>
          <p className={paragraphStyle}>
            These Terms are governed by the laws of India. All disputes shall fall under the exclusive jurisdiction of the
            courts in Fatehabad, Haryana.
          </p>
        </section>

        <section className={sectionStyle}>
          <h2 className={headingStyle}>14. Severability</h2>
          <p className={paragraphStyle}>
            If any provision of these Terms is deemed invalid or unenforceable, the remaining provisions shall continue in
            full force and effect.
          </p>
        </section>

        <section className={sectionStyle}>
          <div className="flex items-center gap-3 text-brand-dark">
            <FiInfo className="text-brand-pink" size={18} />
            <h2 className={headingStyle}>15. Get in Touch</h2>
          </div>
          <p className={paragraphStyle}>For any queries or concerns:</p>
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

export default TermsAndConditions;
