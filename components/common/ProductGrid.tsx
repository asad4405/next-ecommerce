import { ProductType } from "@/types/Products";
import ProductCard from "@/components/common/ProductCard";

interface ProductGridProps {
    products: ProductType[];
}

export function ProductGrid({ products }: ProductGridProps) {
    if (!products || products.length === 0) {
        return (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-3 shadow-sm">
                <p className="text-base font-bold text-slate-700">No products found</p>
                <p className="text-xs text-slate-400">Please check back later or try changing your filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}