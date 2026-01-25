import { useState } from 'react';
import { RegisterModal } from '../../api/features/catalog/components/RegisterModal';
import { LoginModal } from '../../api/features/catalog/components/LoginModal'; // [Novo Ajuste]

export const Header = () => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false); // [Novo Ajuste] para gerenciar o login

    return (
        <>
            <header className="bg-[#ff0033] text-white w-full sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <h1 className="text-2xl font-black italic tracking-tighter cursor-pointer">Conecta Store</h1>

                    <div className="flex-1 hidden md:flex max-w-2xl relative text-left">
                        <input
                            type="text"
                            placeholder="busque aqui seu produto"
                            className="w-full p-2.5 rounded-md text-gray-800 focus:outline-none shadow-inner text-sm"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                    </div>

                    <div className="flex items-center gap-6 text-sm font-semibold">
                        <div className="hidden lg:block leading-tight cursor-pointer group text-left">
                            {/* [Novo Ajuste]: Agora o clique no texto principal abre o Login */}
                            <span
                                onClick={() => setIsLoginOpen(true)}
                                className="hover:text-gray-200 transition-colors"
                            >
                                olá, faça seu login
                            </span>
                            <br />
                            {/* [Novo Ajuste]: Clique apenas no 'ou cadastre-se' abre o Registro */}
                            <span
                                className="text-[11px] font-normal group-hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    setIsRegisterOpen(true);
                                }}
                            >
                                ou cadastre-se
                            </span>
                        </div>

                        <div className="relative cursor-pointer text-2xl">
                            🛒 <span className="absolute -top-1 -right-2 bg-yellow-400 text-red-700 text-[10px] font-bold px-1.5 rounded-full border border-red-600">0</span>
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