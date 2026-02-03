import { useState } from 'react';
import Swal from 'sweetalert2';
import type { Product } from '../services/productService';
import { useProduct } from '../hooks/useProduct';
import { cartService } from '../services/cartService';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const { formattedPrice, handleImageError, displayImage, installmentValue } = useProduct(product);

    // Cor padrão do tema para reuso
    const THEME_COLOR = '#e60014';

    const isTopOffer = product.price > 1000;

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();

        setIsAdding(true);
        try {
            await cartService.addItem(product.id, 1);

            await Swal.fire({
                title: 'boa escolha!',
                text: `${product.name} foi adicionado à sua cesta.`,
                icon: 'success',
                confirmButtonText: 'continuar comprando',
                confirmButtonColor: THEME_COLOR,
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    title: 'font-black italic uppercase text-xl',
                    popup: 'rounded-xl'
                }
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "erro ao adicionar";

            Swal.fire({
                title: 'ops!',
                text: message,
                icon: 'error',
                confirmButtonColor: THEME_COLOR,
                customClass: {
                    title: 'font-black italic uppercase text-xl'
                }
            });
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer border border-gray-100 hover:border-red-200 text-left h-full">

            {/* TAG DE OFERTA: Estilo Americanas */}
            <div className="h-[28px] mb-2">
                {isTopOffer && (
                    <span className="bg-[#e60014] text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase flex items-center gap-1 w-fit">
                        <span className="text-[12px]">📌</span> top oferta
                    </span>
                )}
            </div>

            {/* IMAGEM DO PRODUTO */}
            <div className="aspect-square bg-white mb-4 flex items-center justify-center overflow-hidden">
                <img
                    src={displayImage}
                    onError={handleImageError}
                    alt={product.name}
                    className="group-hover:scale-105 transition-transform duration-500 object-contain h-44 w-full"
                />
            </div>

            {/* TÍTULO E DESCRIÇÃO */}
            <h3 className="text-[13px] text-gray-800 h-10 line-clamp-2 mb-1 font-semibold leading-tight">
                {product.name}
            </h3>

            <p className="text-[11px] text-gray-400 line-clamp-2 mb-4 h-8 leading-[1.2]">
                {product.description}
            </p>

            {/* PREÇOS E BOTÃO */}
            <div className="mt-auto">
                <div className="flex items-baseline gap-1 text-[#e60014]">
                    <span className="text-sm font-bold">R$</span>
                    <span className="text-2xl font-black tracking-tighter">{formattedPrice}</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">
                    ou 10x de <span className="font-bold">R$ {installmentValue}</span>
                </p>

                <button
                    id="addCart"
                    name="addCart"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`w-full py-3 rounded-md font-black italic uppercase mt-4 transition-all duration-200 text-white text-sm tracking-wider
                        ${isAdding
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-[#e60014] hover:bg-[#c40011] active:scale-95 shadow-sm'
                        }`}
                >
                    {isAdding ? 'adicionando...' : 'queeeero'}
                </button>
            </div>
        </div>
    );
};