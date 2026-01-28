import { useState } from 'react';
import Swal from 'sweetalert2'; // 👈 Importação do SweetAlert2
import type { Product } from '../services/productService';
import { useProduct } from '../hooks/useProduct';
import { cartService } from '../services/cartService';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const [isAdding, setIsAdding] = useState(false);
    const { formattedPrice, handleImageError, displayImage, installmentValue } = useProduct(product);

    const isTopOffer = product.price > 1000;

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();

        setIsAdding(true);
        try {
            await cartService.addItem(product.id, 1);

            // 🚀 FEEDBACK DE SUCESSO COM SWEETALERT2
            await Swal.fire({
                title: 'Boa escolha!',
                text: `${product.name} foi adicionado ao seu carrinho.`,
                icon: 'success',
                confirmButtonText: 'Continuar comprando',
                confirmButtonColor: '#ff0033', // Cor do seu tema
                timer: 3000, // Fecha sozinho após 3 segundos
                timerProgressBar: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInUp' // Se tiver o animate.css
                }
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao adicionar";

            // ❌ FEEDBACK DE ERRO
            Swal.fire({
                title: 'Ops!',
                text: message,
                icon: 'error',
                confirmButtonColor: '#ff0033'
            });
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition-all flex flex-col group cursor-pointer border border-transparent hover:border-red-100 text-left h-full">

            {isTopOffer ? (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase w-fit mb-3">
                    🚀 top oferta
                </span>
            ) : (
                <div className="h-[25px] mb-3" />
            )}

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

                <button
                    id="addCart"
                    name="addCart"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`w-full py-3 rounded-lg font-black italic uppercase mt-4 transition-all duration-200 text-white
                        ${isAdding
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#ff0033] hover:bg-red-700 active:scale-95 shadow-md hover:shadow-lg'
                        }`}
                >
                    {isAdding ? 'adicionando...' : 'queeeero'}
                </button>
            </div>
        </div>
    );
};