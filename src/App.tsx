import { Header } from './shared/components/Header';
import { ProductList } from './api/features/catalog/ProductList';
import { useGuest } from './api/features/catalog/hooks/useGuest';
import { CartDrawer } from './api/features/catalog/components/CartDrawer';

export default function App() {
    useGuest(); // dispara automaticamente no load

    // Cor padrão para consistência
    const THEME_COLOR_RED = "#e60014";

    return (
        <div className="min-h-screen bg-[#f4f4f4] relative"> {/* Fundo levemente cinza para destacar os cards brancos */}

            <Header />
            <CartDrawer />

            <main className="max-w-7xl mx-auto px-4 py-8">

                {/* BANNER DE OFERTA: Padronizado com o novo estilo */}
                <div className="bg-white rounded-lg shadow-sm border border-yellow-400 p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                    <div className="flex items-center gap-6">
                        {/* Raio com brilho mais suave */}
                        <div className="text-yellow-400 text-5xl animate-pulse drop-shadow-sm">⚡</div>

                        <div>
                            <h2
                                className="text-3xl font-black italic uppercase leading-none"
                                style={{ color: THEME_COLOR_RED }}
                            >
                                oferta relâmpago
                            </h2>
                            <p className="text-gray-500 font-bold uppercase italic mt-1 text-sm tracking-wide">
                                piscou, perdeu! aproveite agora
                            </p>
                        </div>
                    </div>

                    <button
                        className="text-white px-16 py-4 rounded-md font-black italic uppercase text-xl hover:opacity-90 transition-all active:scale-95 shadow-lg"
                        style={{ backgroundColor: THEME_COLOR_RED }}
                    >
                        veeem
                    </button>
                </div>

                {/* TÍTULO DA SEÇÃO */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-6 w-1 bg-[#e60014]"></div> {/* Detalhe visual na lateral do título */}
                    <h2 className="text-2xl font-black italic text-gray-800 uppercase tracking-tighter">
                        Nossas Ofertas
                    </h2>
                </div>

                <ProductList />
            </main>

            {/* Rodapé Simples (Opcional) */}
            <footer className="mt-20 py-10 bg-white border-t text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                conecta store &copy; Feito por Furlaneti Suporte em Informatica LTDA - 14.486.046/0001-77 - 2026 - todos os direitos reservados
            </footer>
        </div>
    );
}