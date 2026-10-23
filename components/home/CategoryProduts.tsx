import Link from "next/link";
import ProductCard from "../common/ProductCard";
import { ProductType } from "@/types/Products";

interface CategoryWithProducts {
    category_id: number;
    category_name: string;
    slug: string;
    front_view: string;
    products: ProductType[];
}

interface ApiResponse {
    status: boolean;
    data: CategoryWithProducts[];
    message: string;
}

async function getCategoryProducts(): Promise<CategoryWithProducts[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/front-category-products`, { cache: "no-store" });
        const data: ApiResponse = await res.json();
        return data.status ? data.data : [];
    } catch (error) {
        console.error("Error fetching category products:", error);
        return [];
    }
}

export async function CategoryProduts() {
    const categories = await getCategoryProducts();

    if (!categories || categories.length === 0) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center py-8 text-slate-500 text-sm bg-white rounded-2xl border border-slate-100 shadow-sm">
                    No category products found.
                </div>
            </section>
        );
    }

    return (
        <div className="space-y-10 max-w-7xl mx-auto px-4 py-8">
            {categories.map((category) => {
                if (!category.products || category.products.length === 0) return null;

                return (
                    <section key={category.category_id}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                    {category.category_name}
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                                    Explore top items from {category.category_name}
                                </p>
                            </div>
                            <Link
                                href={`/category/${category.slug}`}
                                className="text-xs sm:text-sm font-bold text-[#124170] hover:underline flex items-center gap-1"
                            >
                                View All &rarr;
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {category.products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}