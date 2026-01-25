import { useQuery } from '@tanstack/react-query';
import { productService } from './services/productService';
import type { Product } from './services/productService';
import { ProductCard } from './components/ProductCard';

export const ProductList = () => {
    const { data: products, isLoading, error } = useQuery<Product[]>({
        queryKey: ['home-products'],
        queryFn: productService.getAll
    });

    if (isLoading) return <div className="p-10 text-center animate-pulse">Carregando ofertas...</div>;
    if (error) return <div className="text-red-600 p-10">Erro ao conectar com a API .NET</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products?.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
};