import Link from "next/link";
import { ProductType } from "@/types/Products";
import ProductCard from "../common/ProductCard";

interface ApiResponse {
    status: boolean;
    data: ProductType[];
    messsage: string;
}

async function getFeaturedProducts(): Promise<ProductType[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/feature-products`, { cache: "no-store" });
        const data: ApiResponse = await res.json();
        return data.status ? data.data : [];
    } catch (error) {
        console.error("Error fetching feature products:", error);
        return [];
    }
}

export async function FeaturedProducts() {
    const products = await getFeaturedProducts();
    

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        Featured Products
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Grab our top-rated and best-selling items
                    </p>
                </div>
                <Link
                    href="/shop"
                    className="text-xs sm:text-sm font-bold text-[#124170] hover:underline flex items-center gap-1"
                >
                    View All Products &rarr;
                </Link>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-8 text-slate-500 text-sm bg-white rounded-2xl border border-slate-200 shadow-sm">
                    No feature products found.
                </div>
            )}
        </section>
    );
}