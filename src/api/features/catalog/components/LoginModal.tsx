import { useLogin } from '../hooks/useLogin';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: Props) => {
    const { formData, setters, handleSubmit, isPending } = useLogin(onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl w-full max-w-md p-8 shadow-2xl relative text-left">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black italic text-gray-800 uppercase tracking-tighter">Faça seu Login</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-600 text-3xl transition-colors">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-red-500 transition-colors">e-mail</label>
                        <input
                            type="email"
                            required
                            placeholder="seu@email.com"
                            className="w-full border-b-2 border-gray-100 py-2 focus:border-red-500 outline-none transition-all text-gray-700 text-sm"
                            value={formData.email}
                            onChange={(e) => setters.setEmail(e.target.value)}
                        />
                    </div>

                    <div className="group">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-red-500 transition-colors">senha</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full border-b-2 border-gray-100 py-2 focus:border-red-500 outline-none transition-all text-gray-700 text-sm"
                            value={formData.password}
                            onChange={(e) => setters.setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-[#ff0033] text-white py-4 rounded-lg font-black italic uppercase tracking-tighter hover:bg-red-700 transition-all disabled:bg-gray-300 shadow-lg shadow-red-100 mt-4 active:scale-95"
                    >
                        {isPending ? 'autenticando...' : 'entrar na conta'}
                    </button>
                </form>
            </div>
        </div>
    );
};