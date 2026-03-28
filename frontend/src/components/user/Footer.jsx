import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin, FiShield, FiHelpCircle } from 'react-icons/fi';
import footerBg from '../../assets/images/footer_bg.jpg';

const Footer = () => {
  return (
    <footer className="relative bg-[#FBD5DA] text-[#2D1810] pt-8 pb-4 border-t border-brand-pink/10 overflow-hidden">
      {/* Sketched Cosmetic Background */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: '250px',
          backgroundRepeat: 'repeat',
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">

          {/* Column 1: Get to Know Us */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.2em] text-[#2D1810]">Get to Know Us</h3>
            <ul className="space-y-1.5 text-[9px] font-bold uppercase tracking-widest text-[#2D1810]/80">
              <li><Link to="/about" className="hover:text-brand-pink transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-brand-pink transition-colors">Our Catalog</Link></li>
              <li><Link to="/blog" className="hover:text-brand-pink transition-colors">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-brand-pink transition-colors">Contact US</Link></li>
            </ul>
          </div>

          {/* Column 2: Connect with Us */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.2em] text-[#2D1810]">Connect with Us</h3>
            <ul className="space-y-1.5 text-[9px] font-bold uppercase tracking-widest text-[#2D1810]/80">
              <li><a href="https://facebook.com/saundaryashringarpvtltd/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-pink transition-colors group"><FiFacebook className="group-hover:scale-110 transition-transform" /> Facebook</a></li>
              <li><a href="https://instagram.com/saundaryashringarpvtltd/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-pink transition-colors group"><FiInstagram className="group-hover:scale-110 transition-transform" /> Instagram</a></li>
              <li><a href="https://twitter.com/saundaryashringar" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-pink transition-colors group"><FiTwitter className="group-hover:scale-110 transition-transform" /> Twitter/X</a></li>
            </ul>
          </div>

          {/* Column 3: Let Us Help You */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.2em] text-[#2D1810]">Let Us Help You</h3>
            <ul className="space-y-1.5 text-[9px] font-bold uppercase tracking-widest text-[#2D1810]/80">
              <li><Link to="/profile" className="hover:text-brand-pink transition-colors">Your Account</Link></li>
              <li><Link to="/return-policy" className="hover:text-brand-pink transition-colors">Returns Centre</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-brand-pink transition-colors">Purchase Protection</Link></li>
              <li><Link to="/contact" className="hover:text-brand-pink transition-colors">Help Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Registered Office */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.2em] text-[#2D1810]">Registered Office</h3>
            <div className="space-y-2.5 text-[9px] font-bold uppercase tracking-widest text-[#2D1810]/80 leading-relaxed">
              <p className="flex gap-2">
                <FiMapPin className="shrink-0 opacity-60" size={10} />
                <span>Fatehabad-125050 Haryana</span>
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="shrink-0 opacity-60" size={10} />
                <span>+91 9896472169</span>
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="shrink-0 opacity-60" size={10} />
                <span className="break-all">care@saundaryashringar.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-brand-pink/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start leading-none group transition-transform hover:scale-105">
            <span className="text-sm md:text-base font-black tracking-[0.2em] text-[#5C2E3E] uppercase" style={{ fontFamily: "'Cinzel Decorative', serif" }}>Saundarya</span>
            <span className="text-[7px] md:text-[8px] tracking-[0.5em] text-[#5C2E3E]/60 uppercase mt-1 font-bold" style={{ fontFamily: "'Cinzel', serif" }}>Shrinagar</span>
          </div>

          <div className="flex gap-4 text-[8px] font-black uppercase tracking-widest text-[#2D1810]/40">
            <Link to="/privacy-policy" className="hover:text-brand-pink transition-colors">Privacy</Link>
            <Link to="/terms-conditions" className="hover:text-brand-pink transition-colors">Terms</Link>
            <Link to="/return-policy" className="hover:text-brand-pink transition-colors">Returns</Link>
            <Link to="/cancellation-policy" className="hover:text-brand-pink transition-colors">Cancellation</Link>
          </div>

          <p className="text-[8px] font-bold text-[#2D1810]/50 uppercase tracking-wider">
            © 2026 Saundarya Shringar.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
