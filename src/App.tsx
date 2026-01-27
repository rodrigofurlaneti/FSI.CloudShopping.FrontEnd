import { Header } from './shared/components/Header';
import { ProductList } from './api/features/catalog/ProductList';
import { useGuest } from './api/features/catalog/hooks/useGuest';

export default function App() {
    useGuest(); // 👈 dispara automaticamente no load

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Banner */}
                <div className="bg-white rounded-xl shadow-sm border-2 border-yellow-400 p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                    <div className="flex items-center gap-6">
                        <div className="text-yellow-400 text-6xl animate-pulse">⚡</div>
                        <div>
                            <h2 className="text-3xl font-black italic text-[#ff0033] uppercase leading-none">
                                oferta relâmpago
                            </h2>
                            <p className="text-gray-500 font-bold uppercase italic mt-1">
                                piscou, perdeu! aproveite agora
                            </p>
                        </div>
                    </div>
                    <button className="bg-[#ff0033] text-white px-16 py-4 rounded-lg font-black italic uppercase text-xl hover:scale-105 transition-transform">
                        veeem
                    </button>
                </div>

                <h2 className="text-2xl font-black italic text-gray-800 uppercase mb-6 tracking-tighter">
                    Nossas Ofertas
                </h2>

                <ProductList />
            </main>
        </div>
    );
}
