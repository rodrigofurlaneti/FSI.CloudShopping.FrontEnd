import apiClient from '../../../apiClient';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    isTopOffer: boolean;
    installments: number;
}

export interface RegisterLeadDTO {
    customerId: number;
    email: string;
    password?: string; 
}

export const productService = {
    getAll: async (): Promise<Product[]> => {
        const { data } = await apiClient.get<Product[]>('/products');
        return data;
    },
    registerLead: async (userData: RegisterLeadDTO) => {
        const { data } = await apiClient.post('/Customers/register-lead', userData);
        return data;
    }
};