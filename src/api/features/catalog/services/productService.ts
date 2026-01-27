import apiClient from '../../../apiClient';

export interface Product {
    id: number;
    sku: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
    isActive: boolean;
    imageUrl?: string; // Campo opcional se a API não enviar
    isTopOffer?: boolean;
}

export interface RegisterLeadDTO {
    customerId: number;
    email: string;
    password?: string;
}

export const productService = {
    getAll: async (): Promise<Product[]> => {
        // A rota deve ser exatamente como no seu curl: /Products
        const { data } = await apiClient.get<Product[]>('/Products');
        return data;
    },
    registerLead: async (userData: RegisterLeadDTO) => {
        const { data } = await apiClient.post('/Customers/register-lead', userData);
        return data;
    }
};