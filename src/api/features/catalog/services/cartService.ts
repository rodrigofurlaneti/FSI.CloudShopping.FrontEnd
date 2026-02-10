import apiClient from '../../../apiClient';

export const cartService = {
    async addItem(productId: number, quantity: number) {
        let token = localStorage.getItem('session_token');

        if (!token) {
            token = crypto.randomUUID();
            localStorage.setItem('session_token', token);
        }

        try {
            const response = await apiClient.post('/carts/add-item', {
                sessionToken: token,
                productId: productId,
                quantity: quantity
            });

            return response.data;
        } catch (error: unknown) {
            let message = 'Erro inesperado ao adicionar ao carrinho';

            if (error instanceof Error) {
                message = error.message;
            }

            console.error('Erro no CartService:', message);
            throw new Error(message);
        }
    },

    async getCartByToken() {
        const token = localStorage.getItem('session_token');
        if (!token) return null;

        try {
            const response = await apiClient.get(`/carts/${token}`);
            return response.data;
        } catch (error: unknown) {
            console.error('Erro ao buscar carrinho:', error);
            return null;
        }
    },

    async clearCart() {
        const token = localStorage.getItem('session_token');
        if (!token) return;

        try {
            await apiClient.delete(`/carts/clear/${token}`);
            localStorage.removeItem('session_token');
        } catch (error: unknown) {
            console.error('Erro ao limpar carrinho:', error);
        }
    }
};