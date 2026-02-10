import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom' // 1. Importe o Router
import { CartProvider } from './contexts/CartContext'
import './index.css'
import App from './App'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter> {/* 2. Envolva o CartProvider e o App */}
                <CartProvider>
                    <App />
                </CartProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)