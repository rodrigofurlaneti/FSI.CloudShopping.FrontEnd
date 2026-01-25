import apiClient from '../../../apiClient';

export interface LoginDTO {
    id: number;
    email: string;
    password?: string;
    isAuthenticationAccess: boolean;
    createdAt: string;
}

export interface AuthResponse {
    message: string;
    token?: string; 
    customerName?: string;
}

export const authenticationService = {
    login: async (credentials: LoginDTO): Promise<AuthResponse> => {
        const { data } = await apiClient.post<AuthResponse>('/Authentication/access', credentials);
        return data;
    }
};