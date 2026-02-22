import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { authenticationService, type LoginDTO } from '../services/authenticationService';

export const useLogin = (onClose: () => void) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // --- Mutation de Login (Existente) ---
    const loginMutation = useMutation({
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

    // --- 🆕 Mutation de Reset de Senha (Nova) ---
    const resetPasswordMutation = useMutation({
        mutationFn: (email: string) => authenticationService.resetPassword(email),
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'E-mail enviado!',
                text: 'Verifique sua caixa de entrada. Enviamos uma nova senha temporária para você.',
                confirmButtonColor: '#ff0033'
            });
        },
        onError: (err: { response?: { data?: { message?: string } } }) => {
            const errorMsg = err.response?.data?.message || "Não foi possível processar o reset de senha no momento.";
            
            Swal.fire({
                icon: 'error',
                title: 'Ops!',
                text: errorMsg,
                confirmButtonColor: '#ff0033'
            });
        }
    });

    // --- 🆕 Função para disparar o Modal de Esqueci Senha ---
    const handleForgotPassword = async () => {
        const { value: emailInput } = await Swal.fire({
            title: 'Esqueci minha senha',
            text: 'Informe seu e-mail para receber uma nova senha temporária',
            input: 'email',
            inputPlaceholder: 'seu@email.com',
            showCancelButton: true,
            confirmButtonText: 'Enviar Nova Senha',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#ff0033',
            cancelButtonColor: '#6e7881',
            inputValidator: (value) => {
                if (!value) {
                    return 'O e-mail é obrigatório!';
                }
                return null;
            }
        });

        if (emailInput) {
            resetPasswordMutation.mutate(emailInput);
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({
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
        handleForgotPassword, 
        isPending: loginMutation.isPending || resetPasswordMutation.isPending
    };
};