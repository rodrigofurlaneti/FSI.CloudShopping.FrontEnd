import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { authenticationService, type LoginDTO } from '../services/authenticationService';

export const useLogin = (onClose: () => void) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const mutation = useMutation({
        mutationFn: (data: LoginDTO) => authenticationService.login(data),
        onSuccess: (res) => {
            const name = res.customerName || "Usuário";
            const token = res.token || "Token";
            localStorage.setItem('@ConectaStore:Token', token);
            localStorage.setItem('@ConectaStore:UserName', name);
            Swal.fire({
                icon: 'success',
                title: `Olá, ${name}!`,
                text: res.message || "Login realizado com sucesso.",
                confirmButtonColor: '#ff0033'
            });
            resetForm();
            onClose();
        },
        onError: (err: { response?: { data?: { message?: string } } }) => {
            const errorMsg = err.response?.data?.message || "E-mail ou senha incorretos.";

            Swal.fire({
                icon: 'error',
                title: 'Falha no Acesso',
                text: errorMsg,
                confirmButtonColor: '#ff0033'
            });
        }
    });

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            id: 0,
            email: email,
            password: password,
            isAuthenticationAccess: true,
            createdAt: new Date().toISOString()
        });
    };

    return {
        formData: { email, password },
        setters: { setEmail, setPassword },
        handleSubmit,
        isPending: mutation.isPending
    };
};