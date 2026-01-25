import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { productService } from '../services/productService';
import type { RegisterLeadDTO } from '../services/productService';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

interface RegisterResponse {
    message: string;
}

export const RegisterModal = ({ isOpen, onClose }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const mutation = useMutation({
        mutationFn: (data: RegisterLeadDTO) => productService.registerLead(data) as Promise<RegisterResponse>,
        onSuccess: (res) => {
            alert(res.message || "Lead registrado com sucesso.");
            onClose();
            resetForm();
        },
        onError: (error: any) => {
            const errorMsg = error.response?.data?.message || "Erro de conexão. Verifique o CORS no Backend.";
            alert(errorMsg);
        }
    });

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("As senhas não conferem!");
            return;
        }

        mutation.mutate({ customerId: 0, email, password });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 font-sans">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl relative text-left animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-black italic text-gray-800 uppercase tracking-tighter">cadastre-se</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-600 text-3xl font-light">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">e-mail</label>
                        <input
                            type="email"
                            required
                            placeholder="rodrigo.furlaneti@hotmail.com"
                            className="w-full border-b-2 border-gray-100 p-2 focus:border-red-500 outline-none transition-colors text-gray-700 text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">senha</label>
                        <input
                            type="password"
                            required
                            className="w-full border-b-2 border-gray-100 p-2 focus:border-red-500 outline-none transition-colors text-gray-700 text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">confirmar senha</label>
                        <input
                            type="password"
                            required
                            className="w-full border-b-2 border-gray-100 p-2 focus:border-red-500 outline-none transition-colors text-gray-700 text-sm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-[#ff0033] text-white py-4 rounded-md font-black italic uppercase tracking-tighter hover:bg-red-700 transition-all disabled:bg-gray-300 shadow-lg shadow-red-200 mt-2"
                    >
                        {mutation.isPending ? 'enviando...' : 'cadastrar agora'}
                    </button>
                </form>
            </div>
        </div>
    );
};