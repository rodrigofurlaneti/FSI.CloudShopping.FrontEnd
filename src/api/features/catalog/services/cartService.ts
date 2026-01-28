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
        } catch (error: unknown) { // 👈 Mudamos de 'any' para 'unknown'
            let message = 'Erro inesperado ao adicionar ao carrinho';

            // Verificação segura do erro para satisfazer o TypeScript
            if (error instanceof Error) {
                message = error.message;
            }

            console.error('Erro no CartService:', message);
            throw new Error(message);
        }
    }
};