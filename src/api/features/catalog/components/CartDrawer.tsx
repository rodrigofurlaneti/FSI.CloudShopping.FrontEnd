import { useCart } from "../../../../contexts/CartContext";
import type { CartItemDTO } from '../../../../contexts/CartContext';

export const CartDrawer = () => {
    const { cart, isDrawerOpen, toggleDrawer } = useCart();

    return (
        <div
            className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50
      ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="p-4 flex justify-between items-center border-b">
                <h2 className="font-bold">Minha Cesta</h2>
                <button onClick={() => toggleDrawer(false)}>✖</button>
            </div>

            <div className="p-4 space-y-4 overflow-auto h-[80%]">
                {(!cart || cart.items.length === 0) && (
                    <p className="text-gray-500 text-center">
                        Seu carrinho está vazio.
                    </p>
                )}

                {cart?.items.map((item: CartItemDTO) => (
                    <div key={item.productId} className="flex gap-3 border-b pb-3">
                        <img
                            src={item.imageUrl}
                            className="w-16 h-16 object-contain"
                            alt={item.name}
                        />

                        <div>
                            <p className="font-bold">{item.name}</p>
                            <p>Qtd: {item.quantity}</p>
                            <p className="text-red-600 font-bold">
                                R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t">
                <button className="w-full bg-[#ff0033] text-white py-3 rounded-lg font-bold">
                    Continuar
                </button>
            </div>
        </div>
    );
};
