import { useQuery } from '@tanstack/react-query';
import { productService } from './services/productService';
import { ProductCard } from './components/ProductCard'; 
import { baseURL } from '../../apiClient';
import type { Product } from './services/productService';

export const ProductList = () => {
    const { data: products, isLoading, error } = useQuery<Product[]>({
        queryKey: ['home-products'],
        queryFn: productService.getAll
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white h-80 rounded-xl animate-pulse border border-gray-100" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-8 rounded-xl border border-red-200 text-center">
                <p className="text-red-600 font-bold">Erro ao carregar produtos da API .NET</p>
                <p className="text-sm text-red-400">Verifique se o backend está rodando em {baseURL}</p>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </section>
    );
};