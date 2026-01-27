import type { Product } from '../services/productService';
import { useProduct } from '../hooks/useProduct';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { formattedPrice, handleImageError, displayImage, installmentValue } = useProduct(product);

    const isTopOffer = product.price > 1000;

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition-all flex flex-col group cursor-pointer border border-transparent hover:border-red-100 text-left h-full">
            {/* CORREÇÃO: Usando a variável isTopOffer aqui para remover o erro do TS */}
            {isTopOffer && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase w-fit mb-3">
                    🚀 top oferta
                </span>
            )}

            {!isTopOffer && <div className="h-[25px] mb-3" />} {/* Espaçador para manter o alinhamento */}

            <div className="aspect-square bg-gray-50 mb-4 flex items-center justify-center overflow-hidden rounded-lg">
                <img
                    src={displayImage}
                    onError={handleImageError}
                    alt={product.name}
                    className="group-hover:scale-110 transition-transform duration-300 object-contain p-2 h-48 w-full"
                />
            </div>

            <h3 className="text-sm text-gray-700 h-10 line-clamp-2 mb-1 font-bold">
                {product.name}
            </h3>

            <p className="text-[11px] text-gray-400 line-clamp-2 mb-4 h-8 leading-tight">
                {product.description}
            </p>

            <div className="mt-auto">
                <div className="flex items-baseline gap-1 text-[#ff0033]">
                    <span className="text-sm font-bold">R$</span>
                    <span className="text-3xl font-black tracking-tighter">{formattedPrice}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold italic">
                    ou 10x de {installmentValue}
                </p>
                <button className="w-full bg-[#ff0033] text-white py-3 rounded-lg font-black italic uppercase mt-4 hover:bg-red-700 transition-colors">
                    queeeero
                </button>
            </div>
        </div>
    );
};