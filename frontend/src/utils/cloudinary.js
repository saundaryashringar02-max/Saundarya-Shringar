import api from './api';

export const uploadToCloudinary = async (file) => {
    try {
        // Convert to base64 for backend upload
        const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
        });

        const response = await api.post('/upload', { image: base64 });

        return response.data.url;
    } catch (error) {
        console.error('Core Uploader Bridge Error:', error);
        throw new Error('Digital asset transmission failed.');
    }
};
