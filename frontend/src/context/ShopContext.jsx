import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Order States
  const [lastOrder, setLastOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Authentication & User State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Fetch Core Data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, banRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories'),
        api.get('/banners')
      ]);

      setProducts(prodRes.data.data.products);
      setCategories(catRes.data.data.categories);
      setBanners(banRes.data.data.banners);
    } catch (err) {
      console.error("Failed to fetch store data:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check Authentication Status
  const checkAuth = useCallback(async () => {
    const isAdminScope = window.location.pathname.startsWith('/admin');
    const tokenKey = isAdminScope ? 'admin_token' : 'customer_token';
    const token = localStorage.getItem(tokenKey);

    if (token) {
      try {
        const res = await api.get('/auth/me');
        if (res.data.status === 'success') {
          setIsAuthenticated(true);
          setUser(res.data.data.user);
        }
      } catch (err) {
        localStorage.removeItem(tokenKey);
        setIsAuthenticated(false);
        setUser(null);
      }
    }

    // Auth has definitively concluded checking (even if no token existed)
    setIsAuthLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    checkAuth();

    // Load local storage items
    try {
      const savedCart = localStorage.getItem('saundarya_cart');
      const savedWishlist = localStorage.getItem('saundarya_wishlist');
      if (savedCart && savedCart !== "undefined") setCart(JSON.parse(savedCart));
      if (savedWishlist && savedWishlist !== "undefined") setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }, [fetchData, checkAuth]);

  // Sync Cart/Wishlist back to local storage
  useEffect(() => {
    localStorage.setItem('saundarya_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('saundarya_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const verifyAndClearCart = async (razorpayResponse, details, customTotal) => {
    try {
      if (!isAuthenticated) throw new Error("User unauthorized.");

      const payload = {
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_signature: razorpayResponse.razorpay_signature,
        orderDetails: {
          items: cart.map(item => ({
            product: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          totalAmount: customTotal,
          shippingAddress: details
        }
      };

      const res = await api.post('/orders/razorpay/verify', payload);
      const newId = res.data.data.order.orderId;

      setOrderId(newId);
      setOrderDetails(details);
      setLastOrder([...cart]);
      setCart([]);
      return newId;
    } catch (err) {
      console.error("Payment verification error:", err);
      alert('Payment Verification Failed: ' + (err.response?.data?.message || err.message));
      throw err;
    }
  };

  const clearCart = async (details, customTotal) => {
    try {
      if (!isAuthenticated) {
        alert("Please login or create an account to process your divine purchase.");
        throw new Error("User unauthorized.");
      }

      const defaultTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const totalAmount = customTotal !== undefined ? customTotal : defaultTotal;

      const payload = {
        items: cart.map(item => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: totalAmount,
        shippingAddress: details
      };

      const res = await api.post('/orders', payload);
      const newId = res.data.data.order.orderId;

      setOrderId(newId);
      setOrderDetails(details);
      setLastOrder([...cart]);
      setCart([]);
      return newId;
    } catch (err) {
      console.error("Clear cart error:", err);
      alert('Order generation failed: ' + (err.response?.data?.message || err.message));
      throw err;
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.filter(item => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const logout = () => {
    const isAdminScope = window.location.pathname.startsWith('/admin');
    const tokenKey = isAdminScope ? 'admin_token' : 'customer_token';
    localStorage.removeItem(tokenKey);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <ShopContext.Provider value={{
      fetchData,
      products,
      categories,
      banners,
      cart,
      wishlist,
      loading,
      isAuthLoading,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      logout,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      isInWishlist,
      lastOrder,
      orderId,
      setOrderId,
      orderDetails,
      clearCart,
      verifyAndClearCart,
      cartCount: cart.reduce((acc, item) => acc + item.quantity, 0),
      wishlistCount: wishlist.length,
      cartTotal: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    }}>
      {children}
    </ShopContext.Provider>
  );
};
