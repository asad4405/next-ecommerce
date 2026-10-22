import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Zap } from "lucide-react";
import { Product } from "@/types/Products";

interface ApiResponse {
    status: boolean;
    data: Product[];
    messsage: string;
}

async function getFeaturedProducts(): Promise<Product[]> {
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
    const imageBaseUrl = process.env.NEXT_API_IMAGE_URL;

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
                        const hasDiscount = product.old_price && product.old_price > product.new_price;
                        const discountPercent = hasDiscount
                            ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
                            : 0;

                        const productSlug = product.slug || product.id.toString();

                        return (
                            <div
                                key={product.id}
                                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#124170]/30 transition-all duration-300 flex flex-col overflow-hidden relative"
                            >
                                <div className="relative w-full h-44 sm:h-56 bg-slate-100 overflow-hidden">
                                    {hasDiscount && (
                                        <span className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-md">
                                            -{discountPercent}%
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500 p-2 rounded-full shadow-md transition backdrop-blur-sm cursor-default"
                                    >
                                        <Heart size={16} />
                                    </button>

                                    <Link href={`/product-details/${productSlug}`} className="block w-full h-full relative">
                                        <Image
                                            src={`${imageBaseUrl}/${product.product_image}`}
                                            alt={product.product_name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition duration-500"
                                            unoptimized={true}
                                        />
                                    </Link>
                                </div>

                                <div className="p-4 flex flex-col flex-1 justify-between">
                                    <div>
                                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                                            {product.product_code}
                                        </span>
                                        <Link href={`/product-details/${productSlug}`}>
                                            <h3 className="text-xs sm:text-sm font-bold text-slate-800 hover:text-[#124170] transition line-clamp-2 mt-1">
                                                {product.product_name}
                                            </h3>
                                        </Link>
                                    </div>

                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="text-sm sm:text-base font-black text-[#124170]">
                                            ৳{product.new_price}
                                        </span>
                                        {hasDiscount && (
                                            <span className="text-xs text-slate-400 line-through">
                                                ৳{product.old_price}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                                        <div className="bg-slate-100 text-slate-800 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-default select-none">
                                            <ShoppingBag size={14} />
                                            <span className="hidden sm:inline">Add</span> Cart
                                        </div>

                                        <div className="bg-[#124170] text-white py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-default select-none">
                                            <Zap size={14} />
                                            Buy Now
                                        </div>
                                    </div>
                                </div>
                            </div>
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