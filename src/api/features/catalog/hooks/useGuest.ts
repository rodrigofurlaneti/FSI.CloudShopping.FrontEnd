import { useEffect } from 'react';
import { customerService } from '../services/customerService';

const SESSION_TOKEN_KEY = 'session_token';

export const useGuest = () => {
    useEffect(() => {
        const existingToken = localStorage.getItem(SESSION_TOKEN_KEY);

        // 🔒 Já tem sessão → não faz nada
        if (existingToken) return;

        // 🌍 Pegar geolocalização
        if (!navigator.geolocation) {
            createGuest(); // fallback sem geo
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
            const response = await customerService.createGuest({
                latitude,
                longitude
            });

            localStorage.setItem(SESSION_TOKEN_KEY, response.sessionToken);
        } catch (error) {
            console.error('Erro ao criar Guest', error);
        }
    };
};
