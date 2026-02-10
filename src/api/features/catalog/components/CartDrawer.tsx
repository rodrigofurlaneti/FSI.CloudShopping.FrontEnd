import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../contexts/CartContext";
import type { CartItemDTO } from '../../../../contexts/CartContext';

export const CartDrawer = () => {
    const { cart, isDrawerOpen, toggleDrawer, updateQuantity, removeItem } = useCart();
    const navigate = useNavigate();

    const total = cart?.items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0) || 0;
    const subtotalFicticio = total * 1.15;

    const handleContinueToCheckout = () => {
        toggleDrawer(false); // Fecha o drawer lateral
        navigate('/checkout'); // Navega para a rota de checkout
    };

    return (
        <>
            {/* OVERLAY */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 transition-opacity"
                    onClick={() => toggleDrawer(false)}
                />
            )}

            {/* DRAWER CONTAINER */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#f4f4f4] shadow-2xl transform transition-transform duration-300 z-50 flex flex-col
                ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* HEADER */}
                <div className="p-4 flex justify-between items-center bg-[#e60014] text-white shadow-md">
                    <div className="flex items-center gap-2">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9z" />
                        </svg>
                        <h2 className="font-bold text-lg uppercase tracking-tight text-[15px]">Minha Cesta</h2>
                    </div>
                    <button onClick={() => toggleDrawer(false)} className="text-2xl font-light hover:opacity-80">✕</button>
                </div>

                {/* LISTA DE ITENS */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {(!cart || cart.items.length === 0) ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p className="font-medium text-lg">Seu carrinho está vazio.</p>
                        </div>
                    ) : (
                        cart.items.map((item: CartItemDTO) => (
                            <div key={item.productId} className="relative flex gap-4 p-4 bg-white rounded-sm shadow-sm border border-transparent hover:border-gray-200 transition-all">

                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-xs transition-colors"
                                >
                                    ✕
                                </button>

                                <div className="w-20 h-20 flex-shrink-0 border border-gray-100 rounded p-1 flex items-center justify-center overflow-hidden bg-white">
                                    <img
                                        src={item.imageUrl || `https://via.placeholder.com/200?text=Sem+Foto`}
                                        className="max-w-full max-h-full object-contain"
                                        alt={item.name}
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://via.placeholder.com/200?text=Erro+Imagem';
                                        }}
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <p className="text-[13px] font-semibold text-gray-800 leading-[1.2] pr-4 line-clamp-2">
                                        {item.name || "Produto sem nome"}
                                    </p>

                                    <div className="flex justify-between items-end mt-2">
                                        <div className="flex items-center border border-gray-300 rounded overflow-hidden h-8">
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                className="px-2 text-gray-400 hover:bg-gray-100 transition-colors border-r"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="px-2 text-[#e60014] hover:bg-gray-100 transition-colors border-l"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-[11px] text-gray-400 line-through leading-none">
                                                R$ {(item.unitPrice * 1.15).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </p>
                                            <p className="text-[16px] font-bold text-gray-900 leading-none">
                                                R$ {item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* FOOTER */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="space-y-1 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 font-medium uppercase">subtotal</span>
                            <span className="text-sm text-gray-400 line-through">
                                R$ {subtotalFicticio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-800 uppercase">total</span>
                            <span className="text-2xl font-black text-gray-900 leading-none">
                                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            id="continue"
                            name="continue"
                            onClick={handleContinueToCheckout}
                            className="w-full bg-[#e60014] hover:bg-[#c40011] text-white py-4 rounded-md font-bold text-sm uppercase shadow-sm active:scale-95 transition-transform"
                        >
                            continuar
                        </button>
                        <button
                            onClick={() => toggleDrawer(false)}
                            className="w-full border border-[#e60014] text-[#e60014] py-2.5 rounded-md font-bold text-[11px] uppercase hover:bg-red-50 transition-colors"
                        >
                            continuar comprando
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};