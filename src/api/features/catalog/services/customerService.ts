import apiClient from '../../../apiClient';

export interface DeviceInfoDto {
    userAgent: string;
    platform: string;
    language: string;
    timeZone: string;
}

export interface CreateGuestRequest {
    latitude?: number;
    longitude?: number;
    deviceInfo: DeviceInfoDto;
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
