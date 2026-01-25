import type { Product } from '../services/productService';

export const useProduct = (product: Product) => {
    // Formatação de preço centralizada
    const formattedPrice = product.price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Lógica para imagem reserva (Fallback)
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/200?text=Sem+Foto';
    };

    // Exemplo de lógica futura: Cálculo de parcelas
    const installmentValue = (product.price / 10).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return {
        formattedPrice,
        installmentValue,
        handleImageError
    };
};