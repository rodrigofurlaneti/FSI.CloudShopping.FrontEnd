import { useState } from 'react';
import { RegisterModal } from '../../api/features/catalog/components/RegisterModal';
import { LoginModal } from '../../api/features/catalog/components/LoginModal';
import { useCart } from '../../contexts/CartContext';

export const Header = () => {
    const { totalItems, toggleDrawer } = useCart();
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <header className="bg-[#e60014] text-white w-full sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-8">

                    {/* LOGO */}
                    <div className="flex flex-col items-start leading-none shrink-0">
                        <h1
                            className="text-3xl font-black italic tracking-tighter cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            conecta
                        </h1>
                        <span className="text-[10px] font-bold tracking-widest uppercase ml-1 opacity-80">store</span>
                    </div>

                    {/* BARRA DE BUSCA */}
                    <div className="flex-1 hidden md:flex max-w-3xl relative">
                        <input
                            type="text"
                            placeholder="busque aqui seu produto"
                            className="w-full py-2.5 px-5 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-inner text-sm transition-all"
                        />
                        <button className="absolute right-4 top-2.5 text-red-600 font-bold hover:scale-110 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* ACÕES */}
                    <div className="flex items-center gap-8 text-sm font-semibold shrink-0">

                        {/* LOGIN / CADASTRO */}
                        <div className="hidden lg:flex items-center gap-2 cursor-pointer group">
                            <svg className="w-6 h-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="leading-tight text-left">
                                <span
                                    onClick={() => setIsLoginOpen(true)}
                                    className="block hover:text-gray-200 transition-colors text-[13px]"
                                >
                                    olá, faça seu login
                                </span>
                                <span
                                    className="text-[11px] font-normal opacity-80 group-hover:underline group-hover:opacity-100"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsRegisterOpen(true);
                                    }}
                                >
                                    ou cadastre-se
                                </span>
                            </div>
                        </div>

                        {/* CARRINHO COM BADGE DE QUANTIDADE */}
                        <div
                            className="relative cursor-pointer flex flex-col items-center group"
                            onClick={() => toggleDrawer(true)}
                        >
                            <div className="relative p-1"> {/* Padding extra para o badge não cortar */}
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>

                                {/* BADGE: Ajustado posicionamento e contraste */}
                                {totalItems > 0 && (
                                    <span className="absolute top-0 -right-1 bg-[#ff0] text-[#e60014] text-[11px] font-black min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-[#e60014] shadow-sm animate-in zoom-in duration-300">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-bold uppercase mt-[-2px]">Cesta</span>
                        </div>
                    </div>
                </div>
            </header>

            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
            />

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </>
    );
};