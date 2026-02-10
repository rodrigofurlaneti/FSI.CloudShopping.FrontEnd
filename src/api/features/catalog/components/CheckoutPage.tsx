import { useCart } from "../../../../contexts/CartContext";
import type { CartItemDTO } from '../../../../contexts/CartContext';
import { useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
    const { cart, updateQuantity, removeItem } = useCart();
    const navigate = useNavigate();

    const total = cart?.items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0) || 0;

    return (
        <div className="min-h-screen bg-[#f4f4f4] pb-10">
            {/* Header Simples de Checkout */}
            <div className="bg-white border-b border-gray-200 p-4 mb-6">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <img className="h-8" />
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span>ambiente <strong>100% seguro</strong></span>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">minha cesta</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* COLUNA DA ESQUERDA: ITENS E ENTREGA */}
                    <div className="lg:col-span-2 space-y-4">

                        {/* CABE ALHO DA TABELA */}
                        <div className="hidden md:grid grid-cols-4 gap-4 px-4 text-xs text-gray-400 uppercase font-bold">
                            <div className="col-span-2">produto</div>
                            <div className="text-center">quantidade</div>
                            <div className="text-right">preço</div>
                        </div>

                        {/* LISTA DE PRODUTOS */}
                        <div className="bg-white rounded-md shadow-sm divide-y divide-gray-100">
                            {cart?.items.map((item: CartItemDTO) => (
                                <div key={item.productId} className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                                        {/* INFO PRODUTO */}
                                        <div className="col-span-2 flex gap-4">
                                            <img
                                                src={item.imageUrl || 'https://via.placeholder.com/80'}
                                                alt={item.name}
                                                className="w-20 h-20 object-contain"
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-gray-800 line-clamp-2">{item.name}</p>
                                                <p className="text-[10px] text-gray-400 mt-1">vendido por <strong>conecta store</strong></p>
                                            </div>
                                        </div>
                                        {/* QUANTIDADE */}
                                        <div className="flex justify-center">
                                            <div className="flex items-center border border-gray-300 rounded h-9">
                                                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-3 text-gray-400 hover:bg-gray-50">-</button>
                                                <span className="px-4 text-sm font-bold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-3 text-red-600 hover:bg-gray-50">+</button>
                                            </div>
                                        </div>
                                        {/* PRE O E REMOVER */}
                                        <div className="text-right relative">
                                            <button
                                                onClick={() => removeItem(item.productId)}
                                                className="absolute -top-10 right-0 md:-top-2 text-gray-300 hover:text-red-600"
                                            >
                                                <span className="text-xl"> </span>
                                            </button>
                                            <p className="text-lg font-bold text-gray-900">
                                                R$ {item.unitPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {(!cart || cart.items.length === 0) && (
                                <div className="p-10 text-center text-gray-500">Sua cesta está  vazia.</div>
                            )}
                        </div>

                        {/* BOX DE ENTREGA */}
                        <div className="bg-white rounded-md shadow-sm p-6">
                            <h3 className="font-bold text-lg mb-4">entrega</h3>
                            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                                <div className="flex items-start gap-3">
                                    <span className="text-yellow-600 mt-1">??</span>
                                    <div>
                                        <button className="text-red-600 font-bold text-xs uppercase mt-3 border border-red-600 px-10 py-2 rounded hover:bg-red-50">
                                            remover item do carrinho
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUNA DA DIREITA: RESUMO */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-md shadow-sm p-6 sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl font-bold text-gray-800">total</span>
                                <div className="text-right">
                                    <span className="text-xs text-gray-400 block">a calcular</span>
                                    <span className="text-2xl font-black text-gray-900">
                                        R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            <button id="CheckoutPageContinue" name="CheckoutPageContinue" className="w-full bg-[#e60014] hover:bg-[#c40011] text-white py-4 rounded-md font-bold text-lg uppercase transition-all shadow-md active:scale-[0.98]">
                                continuar
                            </button>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full text-center text-blue-500 text-sm mt-4 hover:underline"
                            >
                                adicionar mais produtos
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};