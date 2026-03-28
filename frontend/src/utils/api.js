import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Add a request interceptor to include JWT in headers
api.interceptors.request.use((config) => {
    // Determine the active scope based on the current URL
    const isAdminScope = window.location.pathname.startsWith('/admin');

    // Fetch the correct token layer
    const token = isAdminScope
        ? localStorage.getItem('admin_token')
        : localStorage.getItem('customer_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
