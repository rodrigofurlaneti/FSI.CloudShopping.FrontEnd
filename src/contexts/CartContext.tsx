import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { cartService } from "../api/features/catalog/services/cartService";

export interface CartItemDTO {
    productId: number;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;
}

export interface CartDTO {
    id: number;
    items: CartItemDTO[];
}

interface CartContextType {
    cart: CartDTO | null;
    isDrawerOpen: boolean;
    totalItems: number;
    toggleDrawer: (open: boolean) => void;
    refreshCart: () => Promise<void>;
    addToCart: (productId: number, quantity: number) => Promise<void>;
    updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartDTO | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const refreshCart = useCallback(async () => {
        try {
            const data = await cartService.getCartByToken();
            setCart(data || null);
        } catch (error) {
            console.error("Erro ao carregar carrinho:", error);
        }
    }, []);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const addToCart = async (productId: number, quantity: number) => {
        await cartService.addItem(productId, quantity);
        await refreshCart();
        setIsDrawerOpen(true);
    };

    const updateQuantity = async (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) return removeItem(productId);
        const currentItem = cart?.items.find(i => i.productId === productId);
        const diff = newQuantity - (currentItem?.quantity || 0);
        await cartService.addItem(productId, diff);
        await refreshCart();
    };

    const removeItem = async (productId: number) => {
        const currentItem = cart?.items.find(i => i.productId === productId);
        if (currentItem) {
            await cartService.addItem(productId, -currentItem.quantity);
            await refreshCart();
        }
    };

    const totalItems = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <CartContext.Provider value={{
            cart, isDrawerOpen, totalItems, toggleDrawer: setIsDrawerOpen,
            refreshCart, addToCart, updateQuantity, removeItem
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
    return context;
};