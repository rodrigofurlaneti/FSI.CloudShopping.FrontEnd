import type { Product } from '../services/productService';
import { useProduct } from '../hooks/useProduct';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { formattedPrice, handleImageError } = useProduct(product);

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col group cursor-pointer h-full">
            {product.isTopOffer && (
                <span className="bg-[#e60014] text-white text-[10px] font-bold px-2 py-1 rounded uppercase w-fit mb-3">
                    🚀 top oferta
                </span>
            )}

            <div className="flex-1 mb-4 overflow-hidden rounded-lg">
                <img
                    src={product.imageUrl}
                    onError={handleImageError}
                    alt={product.name}
                    className="object-contain h-48 w-full group-hover:scale-105 transition-transform"
                />
            </div>

            <h3 className="text-sm text-gray-700 h-10 line-clamp-2 mb-2">
                {product.description}
            </h3>

            <div className="mt-auto">
                <div className="text-[#e60014] flex items-baseline gap-1">
                    <span className="text-sm font-bold">R$</span>
                    <span className="text-3xl font-black">{formattedPrice}</span>
                </div>

                <button className="w-full bg-[#e60014] hover:bg-red-700 text-white py-2 rounded mt-4 font-bold italic uppercase transition-colors">
                    queeeero
                </button>
            </div>
        </div>
    );
};