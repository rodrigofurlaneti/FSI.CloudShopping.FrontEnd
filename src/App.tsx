import { Header } from './shared/components/Header';

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Banner de Oferta Relâmpago Responsivo */}
                <div className="bg-white rounded-xl shadow-sm border-2 border-yellow-400 p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                    <div className="flex items-center gap-6">
                        <div className="text-yellow-400 text-6xl animate-pulse">⚡</div>
                        <div>
                            <h2 className="text-3xl font-black italic text-[#ff0033] uppercase leading-none">oferta relâmpago</h2>
                            <p className="text-gray-500 font-bold uppercase italic mt-1">piscou, perdeu! aproveite agora</p>
                        </div>
                    </div>
                    <button className="bg-[#ff0033] text-white px-16 py-4 rounded-lg font-black italic uppercase text-xl hover:scale-105 transition-transform">
                        veeem
                    </button>
                </div>

                {/* Grid de Produtos - Responsividade Automática */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Exemplo de Card Componentizado */}
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition-all flex flex-col group cursor-pointer">
                            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase w-fit mb-3">🚀 top oferta</span>
                            <div className="aspect-square bg-gray-50 mb-4 flex items-center justify-center overflow-hidden rounded-lg">
                                <img src="https://via.placeholder.com/200" alt="Produto" className="group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h3 className="text-sm text-gray-700 h-10 line-clamp-2 mb-4 font-medium">Smartphone Samsung Galaxy A17 128GB - 5G</h3>
                            <div className="mt-auto">
                                <span className="text-[11px] text-gray-400 line-through italic">por R$ 1.599,00</span>
                                <div className="flex items-baseline gap-1 text-[#ff0033]">
                                    <span className="text-sm font-bold">R$</span>
                                    <span className="text-3xl font-black tracking-tighter">1.098,90</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold italic">no pix ou em até 10x s/ juros</p>
                                <button className="w-full bg-[#ff0033] text-white py-3 rounded-lg font-black italic uppercase mt-4 opacity-90 hover:opacity-100 transition-opacity">
                                    queeeero
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}