import type { Product } from '../services/productService';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col group cursor-pointer">
            {product.isTopOffer && (
                <span className="bg-[#e60014] text-white text-[10px] font-bold px-2 py-1 rounded uppercase w-fit mb-3">
                    🚀 top oferta
                </span>
            )}
            <img
                src={product.imageUrl}
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/200?text=Sem+Foto'; }}
                alt={product.name}
                className="object-contain h-full w-full group-hover:scale-105 transition-transform"
            />
            <h3 className="text-sm text-gray-700 h-10 line-clamp-2">{product.description}</h3>
            <div className="mt-auto">
                <div className="text-[#e60014] flex items-baseline gap-1">
                    <span className="text-sm font-bold">R$</span>
                    <span className="text-3xl font-black">{product.price.toLocaleString('pt-BR')}</span>
                </div>
                <button className="w-full bg-[#e60014] text-white py-2 rounded mt-4 font-bold italic uppercase">
                    queeeero
                </button>
            </div>
        </div>
    );
};