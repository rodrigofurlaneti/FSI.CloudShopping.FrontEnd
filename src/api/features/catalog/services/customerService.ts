import apiClient from '../../../apiClient';

export interface CreateGuestRequest {
    latitude?: number;
    longitude?: number;
}

export interface CreateGuestResponse {
    sessionToken: string;
    expiresAt: string;
}

export const customerService = {
    createGuest: async (
        payload: CreateGuestRequest
    ): Promise<CreateGuestResponse> => {
        const { data } = await apiClient.post<CreateGuestResponse>(
            '/Customers/guest',
            payload
        );

        return data;
    }
};
