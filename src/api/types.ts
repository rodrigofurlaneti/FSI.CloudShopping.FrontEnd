export interface Product {
    id: number;           // Changed from string to number to match API
    sku: string;         // Added from API
    name: string;
    description: string;
    price: number;
    stockQuantity: number; // Added from API
    categoryId: number;    // Added from API
    isActive: boolean;     // Added from API
    imageUrl?: string;
    isTopOffer?: boolean;
    installments?: number;
}