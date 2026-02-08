import axios from 'axios';

//const baseURLLocalHost = import.meta.env.VITE_API_URL || 'https://localhost:7003/api';
const rawBaseURL = import.meta.env.VITE_API_URL || 'https://fsi-cloudshopping-backend.onrender.com/api';
export const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL.slice(0, -1) : rawBaseURL;

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
    }
});

apiClient.interceptors.request.use(config => {
    return config;
});

export default apiClient;

