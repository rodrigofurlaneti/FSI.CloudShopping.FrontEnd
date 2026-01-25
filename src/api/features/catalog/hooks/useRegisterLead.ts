import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { productService } from '../services/productService';
import type { RegisterLeadDTO } from '../services/productService';

interface RegisterResponse {
    message: string;
}

export const useRegisterLead = (onClose: () => void) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const mutation = useMutation({
        mutationFn: (data: RegisterLeadDTO) =>
            productService.registerLead(data) as Promise<RegisterResponse>,
        onSuccess: (res) => {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: res.message || "Registrado com sucesso.",
                confirmButtonColor: '#ff0033'
            });
            onClose();
            resetForm();
        },
        onError: (err: unknown) => {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMsg = axiosError.response?.data?.message || "Erro de conexão com o servidor.";

            Swal.fire({
                icon: 'error',
                title: 'Erro no Cadastro',
                text: errorMsg,
                confirmButtonColor: '#ff0033'
            });
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
            Swal.fire({
                icon: 'warning',
                title: 'Senhas Diferentes',
                text: "Por favor, confirme se as senhas digitadas são iguais.",
                confirmButtonColor: '#ff0033'
            });
            return;
        }

        mutation.mutate({
            customerId: 0,
            email: email,
            password: password
        });
    };

    return {
        formData: { email, password, confirmPassword },
        setters: { setEmail, setPassword, setConfirmPassword },
        handleSubmit,
        isPending: mutation.isPending
    };
};