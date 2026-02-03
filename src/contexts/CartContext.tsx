import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { cartService } from '../api/features/catalog/services/cartService';
import type { CartDTO } from '../api/types';

// 1. Definição da interface de dados do contexto
interface CartContextData {
    cart: CartDTO | null;
    isDrawerOpen: boolean;
    totalItems: number;
    addToCart: (productId: number, quantity: number) => Promise<void>;
    toggleDrawer: (open: boolean) => void;
}

// 2. Criação do contexto com valor inicial tipado
const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // 3. Estado Tipado: Resolve o erro 'no-explicit-any'
    const [cart, setCart] = useState<CartDTO | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // 4. Cálculo do contador para o Header
    const totalItems = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    const addToCart = async (productId: number, quantity: number) => {
        try {
            // Chamada ao serviço que já lida com o sessionToken
            const updatedCart = await cartService.addItem(productId, quantity);

            // Atualiza o estado e abre a aba lateral automaticamente
            setCart(updatedCart);
            setIsDrawerOpen(true);
        } catch (error: unknown) {
            // Tratamento de erro seguro
            const message = error instanceof Error ? error.message : "Erro no carrinho";
            throw new Error(message);
        }
    };

    const toggleDrawer = (open: boolean) => setIsDrawerOpen(open);

    return (
        <CartContext.Provider value={{ cart, isDrawerOpen, totalItems, addToCart, toggleDrawer }}>
            {children}
        </CartContext.Provider>
    );
};

// 5. Hook personalizado: Resolve o erro 'useContext is defined but never used'
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart deve ser usado dentro de um CartProvider');
    }
    return context;
};