import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://localhost:7003/api';

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

