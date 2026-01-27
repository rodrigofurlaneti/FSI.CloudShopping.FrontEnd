import type { Product } from '../services/productService';

export const useProduct = (product: Product) => {
    // Formatação de preço: R$ 4.500,00
    const formattedPrice = product.price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Se a API não trouxer imagem, gera uma imagem aleatória baseada no ID
    const displayImage = product.imageUrl || `https://picsum.photos/seed/${product.id}/400/400`;

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/200?text=Sem+Foto';
    };

    const installmentValue = (product.price / 10).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return {
        formattedPrice,
        installmentValue,
        handleImageError,
        displayImage
    };
};