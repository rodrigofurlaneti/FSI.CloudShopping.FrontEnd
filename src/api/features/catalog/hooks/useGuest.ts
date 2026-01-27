import { useEffect } from 'react';
import { customerService } from '../services/customerService';

const SESSION_TOKEN_KEY = 'session_token';

const getDeviceInfo = () => ({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
});

export const useGuest = () => {
    useEffect(() => {
        const existingToken = localStorage.getItem(SESSION_TOKEN_KEY);
        if (existingToken) return;

        if (!navigator.geolocation) {
            createGuest();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                createGuest(
                    position.coords.latitude,
                    position.coords.longitude
                );
            },
            () => {
                createGuest();
            },
            {
                enableHighAccuracy: true,
                timeout: 10000
            }
        );
    }, []);

    const createGuest = async (latitude?: number, longitude?: number) => {
        try {
            const deviceInfo = getDeviceInfo();
            const payload = {
                latitude,
                longitude,
                deviceInfo
            };
            const response = await customerService.createGuest(payload);
            localStorage.setItem(SESSION_TOKEN_KEY, response.sessionToken);
        } catch (error) {
            console.error('Erro ao criar Guest', error);
        }
    };

};
