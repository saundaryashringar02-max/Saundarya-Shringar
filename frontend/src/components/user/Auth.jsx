import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiUser, FiMail, FiLock, FiCheckCircle, FiPhone } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import logoPink from '../../assets/images/logo_pink.png';
import authGirl from '../../assets/images/auth_girl.png';
import registerGirlMakeup from '../../assets/images/register_girl_makeup.png';
import catSkincare from '../../assets/images/cat_skincare_new.png';
import catMakeup from '../../assets/images/cat_makeup_new.png';

import api from '../../utils/api';
import { requestForToken } from '../../utils/firebase-config';

const Auth = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useShop();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPath = location.pathname.includes('/admin');

  useEffect(() => {
    if (isAdminPath) {
      setIsLogin(true);
    }
    if (isAuthenticated && !isAdminPath) {
      navigate('/');
    }
  }, [isAuthenticated, isAdminPath, navigate]);

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP (for customer)
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const leftPanelImage = isLogin ? authGirl : registerGirlMakeup;

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus move
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (step === 1) {
        if (form.phone && form.phone.length === 10) {
          await api.post('/auth/send-otp', { phone: form.phone, isLogin: isLogin });
          setStep(2);
          showNotification("OTP sent successfully! (Check terminal for mock)");
        } else {
          showNotification("Please enter a valid 10-digit phone number.", 'error');
        }
      } else {
        const fullOtp = otp.join('');
        const response = await api.post('/auth/verify-otp', {
          phone: form.phone,
          otp: fullOtp,
          name: form.name
        });

        const { token, data } = response.data;
        localStorage.setItem('customer_token', token);
        setUser(data.user);
        setIsAuthenticated(true);

        // FCM Token Registration
        const fcmToken = await requestForToken();
        if (fcmToken) {
          await api.post('/auth/save-fcm-token', { token: fcmToken, platform: 'web' }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        showNotification("Ritual Success! Welcome to Saundarya Shringar.");
        const from = location.state?.from || '/';
        const forwardState = location.state?.formData ? { formData: location.state.formData } : null;
        setTimeout(() => navigate(from, { state: forwardState }), 1000);
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Error processing request.", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      showNotification("Please enter a valid email address.", "error");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        if (!form.email || !form.password) {
          showNotification("Please enter both email and password.", 'error');
          return;
        }

        const response = await api.post('/auth/admin-login', {
          email: form.email,
          password: form.password
        });

        const { token, data } = response.data;
        localStorage.setItem('admin_token', token);
        setUser(data.user);
        setIsAuthenticated(true);

        // FCM Token Registration
        const fcmToken = await requestForToken();
        if (fcmToken) {
          await api.post('/auth/save-fcm-token', { token: fcmToken, platform: 'web' }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }

        showNotification("Login Successful! Welcome to the Admin Portal.");
        const forwardState = location.state?.formData ? { formData: location.state.formData } : null;
        setTimeout(() => navigate('/admin', { state: forwardState }), 1200);
      } else {
        // Assume registering admin (requires special backend check or invite usually)
        if (form.name && form.email && form.password) {
          const response = await api.post('/auth/register', {
            name: form.name,
            email: form.email,
            password: form.password,
            role: 'admin' // Manually specify for seeding/testing
          });

          const { token, data } = response.data;
          localStorage.setItem('admin_token', token);
          setUser(data.user);
          setIsAuthenticated(true);

          // FCM Token Registration
          const fcmToken = await requestForToken();
          if (fcmToken) {
            await api.post('/auth/save-fcm-token', { token: fcmToken, platform: 'web' }, {
              headers: { Authorization: `Bearer ${token}` }
            });
          }

          showNotification("Account Created & Authenticated Successfully!");
          const forwardState = location.state?.formData ? { formData: location.state.formData } : null;
          setTimeout(() => navigate('/admin', { state: forwardState }), 1200);
        }
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Invalid credentials.", 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdminPath) {
    return (
      <>
        <div className="fixed inset-0 z-[999] w-full h-[100dvh] bg-[#5C2E3E] font-['Inter',_sans-serif] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden !m-0 !p-0 select-none">

          {/* LEFT PANEL (Makeup Image) */}
          <div className="bg-[#FAF7F8] md:w-[45%] lg:w-[40%] flex flex-col relative z-10 
            rounded-br-[2.5rem] lg:rounded-br-[8rem] 
            lg:rounded-none lg:rounded-tr-[5rem] lg:rounded-br-[5rem]
            px-6 pt-3 pb-6 md:pt-4 md:pb-10 min-h-[35vh] md:min-h-[50vh] transition-all shadow-xl shrink-0 overflow-hidden"
          >
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-6 md:mb-8 md:px-6">
              <img src="/logo.png" alt="Logo" className="h-4 md:h-10 w-auto logo-blend" />
              <div className="flex flex-col leading-none">
                <h2 className="text-[10px] md:text-lg font-black text-[#5C2E3E] uppercase tracking-[0.12em]" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
                  Saundarya
                </h2>
                <span className="text-[4px] md:text-[8px] text-[#5C2E3E]/70 font-bold uppercase tracking-[0.45em] mt-0.5" style={{ fontFamily: "'Cinzel', serif" }}>
                  Shringar
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative px-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative mb-6"
              >
                <div className="w-28 h-28 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-white/50">
                  <img src={leftPanelImage} alt="Aesthetics" className="w-full h-full object-cover" key={isAdminPath ? 'admin' : 'user'} />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-12 md:h-12 bg-[#92B89D] text-white rounded-full flex items-center justify-center border-4 border-[#FAF7F8]">
                  <FiCheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </motion.div>
              <h3 className="hidden md:block text-[#5C2E3E] font-black uppercase tracking-[0.3em] text-[10px] opacity-40">
                {isLogin ? 'Verified Access Only' : 'Welcome to the Sanctuary'}
              </h3>
            </div>

            <div className="absolute bottom-4 left-8">
              <Link to="/" className="flex items-center gap-2 font-black text-[8px] uppercase tracking-widest text-[#5C2E3E] hover:text-[#5C2E3E]/70 transition-colors">
                &larr; Back to sanctuary
              </Link>
            </div>
          </div>

          {/* RIGHT PANEL (Form) */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-24 py-8 md:py-16 text-white min-h-[55vh] md:min-h-[50vh]">
            <div className="w-full max-w-sm md:max-w-[340px]">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-end justify-between mb-8">
                  <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {isLogin ? 'Login' : 'Join'}
                  </h1>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all pb-1 relative ${isLogin ? 'text-[#92B89D]' : 'text-white/40 hover:text-white/70'}`}
                    >
                      Sign In
                      {isLogin && <span className="absolute bottom-0 left-0 w-full h-[0.5px] bg-[#92B89D] rounded-full" />}
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all pb-1 relative ${!isLogin ? 'text-[#92B89D]' : 'text-white/40 hover:text-white/70'}`}
                    >
                      Create
                      {!isLogin && <span className="absolute bottom-0 left-0 w-full h-[0.5px] bg-[#92B89D] rounded-full" />}
                    </button>
                  </div>
                </div>

                <p className="text-[9px] md:text-[10px] text-white/50 font-bold uppercase tracking-[0.3em] mb-8">
                  {isLogin ? (step === 1 ? 'Access your radiant account' : `OTP sent to ${form.phone}`) : 'Create your sacred profile'}
                </p>

                <form onSubmit={handleCustomerSubmit} className="space-y-4">
                  {!isLogin && step === 1 && (
                    <div className="space-y-2">
                      <label className="text-[8px] md:text-[9px] text-white/80 font-black uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          required={!isLogin}
                          placeholder="Enter your name"
                          className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3.5 rounded-xl text-xs font-bold outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-white/20"
                        />
                      </div>
                    </div>
                  )}

                  {step === 1 ? (
                    <div className="space-y-2">
                      <label className="text-[8px] md:text-[9px] text-white/80 font-black uppercase tracking-widest ml-1">Phone Essence</label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="tel"
                          inputMode="numeric"
                          name="phone"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                          required
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3.5 rounded-xl text-xs font-bold outline-none focus:bg-white/10 focus:border-white/30 transition-all text-white placeholder:text-white/20"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="text-[8px] md:text-[9px] text-white/80 font-black uppercase tracking-widest ml-1">Secret Key (OTP)</label>
                      <div className="flex justify-between gap-2 md:gap-3">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            autoComplete={index === 0 ? "one-time-code" : "off"}
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-full h-11 md:h-14 bg-white/5 border border-white/10 rounded-xl text-center text-lg md:text-xl font-bold focus:bg-white/10 focus:border-white/30 transition-all text-white outline-none"
                          />
                        ))}
                      </div>
                      <button type="button" onClick={() => { setStep(1); setOtp(['', '', '', '', '', '']); }} className="text-[8px] text-white/40 font-bold uppercase tracking-widest hover:text-white transition-colors ml-1 mt-2 underline underline-offset-4">Change Number</button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-white text-[#5C2E3E] py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-white/90 active:scale-95 transition-all mt-4 disabled:opacity-50`}
                  >
                    {loading ? 'Processing...' : (step === 1 ? 'Send OTP' : 'Verify OTP')}
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                  <p className="text-[8px] text-white/30 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    Saundarya Secure Verified Access
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed bottom-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-[1001] bg-white border-l-4 border-brand-gold shadow-2xl px-6 md:px-8 py-4 md:py-5 flex items-center gap-4 md:min-w-[400px]"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notification.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-brand-pink/10 text-brand-pink'}`}>
                {notification.type === 'error' ? '!' : <FiCheckCircle size={18} />}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark">{notification.type === 'error' ? 'Sanctuary Alert' : 'Ritual Success'}</p>
                <p className="text-xs font-serif italic text-gray-500">{notification.msg}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-[999] w-full h-[100dvh] bg-[#5C2E3E] font-['Inter',_sans-serif] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden !m-0 !p-0 select-none">

        {/* 
            TOP/LEFT PANEL (White background)
          */}
        <div className="bg-[#FAF7F8] md:w-[45%] lg:w-[40%] flex flex-col relative z-10 
            rounded-br-[2.5rem] lg:rounded-br-[8rem] 
            lg:rounded-none lg:rounded-tr-[5rem] lg:rounded-br-[5rem]
            px-6 pt-3 pb-6 md:pt-4 md:pb-10 min-h-[35vh] md:min-h-[50vh] transition-all shadow-xl shrink-0"
        >
          {/* Header / Logo */}
          <div className="flex items-center gap-3 mb-6 md:mb-8 md:px-6">
            <img src="/logo.png" alt="Saundarya Shringar Logo" className="h-4 md:h-10 w-auto logo-blend" />
            <div className="flex flex-col leading-none">
              <h2 className="text-[10px] md:text-lg font-black text-[#5C2E3E] uppercase tracking-[0.12em]" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
                Saundarya
              </h2>
              <span className="text-[4px] md:text-[8px] text-[#5C2E3E]/70 font-bold uppercase tracking-[0.45em] mt-0.5" style={{ fontFamily: "'Cinzel', serif" }}>
                Shringar
              </span>
            </div>
          </div>

          {/* Center Image Module */}
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block"
            >
              <div className="w-24 h-24 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl border-2 md:border-[3px] border-white bg-white/50">
                <img src={leftPanelImage} alt="Brand Aesthetics" className="w-full h-full object-cover origin-center hover:scale-105 transition-transform duration-700" key={isAdminPath ? 'admin' : 'user'} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-10 md:h-10 bg-[#92B89D] text-white rounded-full flex items-center justify-center shadow-md border-2 md:border-[3px] border-[#FAF7F8]">
                <FiCheckCircle className="w-3 h-3 md:w-4 md:h-4" strokeWidth={3} />
              </div>
            </motion.div>
          </div>

          {/* Visit Site Footer */}
          <div className="absolute bottom-3 left-6 md:absolute md:bottom-4 md:left-12">
            <Link to="/" className="flex items-center gap-1.5 font-black text-[7px] md:text-[8px] uppercase tracking-widest text-[#5C2E3E] hover:text-brand-pink transition-colors">
              <FiArrowUpRight size={10} className="opacity-70" /> Visit site
            </Link>
          </div>
        </div>

        {/* 
            BOTTOM/RIGHT PANEL (Dark background)
          */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-20 py-4 md:py-16 text-white min-h-[55vh] md:min-h-[50vh]">
          <div className="w-full mx-auto max-w-sm md:max-w-[340px] lg:max-w-[360px]">

            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-end justify-between mb-4 md:mb-5">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-none">
                  Login
                </h1>

                <div className="flex gap-4">
                  <button
                    type="button"
                    className="text-[8px] md:text-[8px] font-black uppercase tracking-widest transition-all pb-0.5 md:pb-1 relative text-[#92B89D]"
                  >
                    Sign In
                    <span className="absolute bottom-0 left-0 w-full h-[1px] md:h-0.5 bg-[#92B89D] rounded-full" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-3.5">

                <div className="space-y-1 md:space-y-1">
                  <label className="text-[8px] md:text-[9px] text-white/80 font-medium tracking-wide">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-white/50 text-xs" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      required
                      placeholder="admin@saundaryashringar.com"
                      className="w-full bg-white/10 border border-white/5 pl-9 md:pl-10 pr-4 py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs font-medium focus:bg-white/20 focus:border-white/20 outline-none transition-all text-white placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-1 md:space-y-1">
                  <label className="text-[8px] md:text-[9px] text-white/80 font-medium tracking-wide">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-white/50 text-xs" />
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleInputChange}
                      required
                      placeholder="••••••••"
                      className="w-full bg-white/10 border border-white/5 pl-9 md:pl-10 pr-4 py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs font-medium focus:bg-white/20 focus:border-white/20 outline-none transition-all text-white placeholder:text-white/30"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || (!form.email || !form.password)}
                  className="w-full bg-gradient-to-r from-[#82a88d] to-[#92B89D] text-white py-2.5 md:py-3 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] text-center mt-3 md:mt-5 disabled:opacity-50 hover:brightness-110 transition-all shadow-lg active:scale-95"
                >
                  {loading ? 'Processing...' : 'Login to Portal'}
                </button>
              </form>
            </motion.div>

            <div className="mt-6 md:mt-10 text-center">
              <p className="text-[5px] md:text-[6.5px] text-white/30 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-1.5 md:gap-2">
                &copy; Saundarya Module <span className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/20 rounded-full" /> Authorized Access
              </p>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-[1001] bg-white border-l-4 border-brand-gold shadow-2xl px-6 md:px-8 py-4 md:py-5 flex items-center gap-4 md:min-w-[400px]"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notification.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-brand-pink/10 text-brand-pink'}`}>
              {notification.type === 'error' ? '!' : <FiCheckCircle size={18} />}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark">{notification.type === 'error' ? 'Sanctuary Alert' : 'Ritual Success'}</p>
              <p className="text-xs font-serif italic text-gray-500">{notification.msg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Auth;
