import { createContext, useContext, useState, type ReactNode } from "react";

export interface CartItemDTO {
    productId: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
}

export interface CartDTO {
    items: CartItemDTO[];
}

interface CartContextType {
    cart: CartDTO | null;
    isDrawerOpen: boolean;
    totalItems: number;
    toggleDrawer: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart] = useState<CartDTO | null>({
        items: [],
    });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const totalItems =
        cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    const toggleDrawer = (open: boolean) => {
        setIsDrawerOpen(open);
    };

    return (
        <CartContext.Provider
            value={{ cart, isDrawerOpen, totalItems, toggleDrawer }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart deve ser usado dentro de CartProvider");
    }

    return context;
};
