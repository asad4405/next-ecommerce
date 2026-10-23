import Link from "next/link";
import { ShoppingBag, Heart, Zap } from "lucide-react";
import Image from 'next/image';
import { ProductType } from "@/types/Products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProductCard = ({ product }: { product: ProductType }) => {
    const hasDiscount = product.old_price && product.old_price > product.new_price;
    const discountPercent = hasDiscount
        ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
        : 0;

    const productSlug = product.slug || product.id.toString();
    const imageBaseUrl = process.env.NEXT_API_IMAGE_URL;

    return (
        <Card className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#124170]/30 transition-all duration-300 flex flex-col overflow-hidden relative p-0 gap-0">
            
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

            <CardContent className="p-4 flex flex-col flex-1 justify-between w-full">
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
            </CardContent>

            
            <CardFooter className="p-4 pt-0 w-full">
                <div className="w-full pt-3 border-t border-slate-100 flex flex-col sm:grid sm:grid-cols-2 gap-2">
                    <div className="bg-slate-200 hover:bg-slate-400 text-slate-800 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer select-none transition w-full">
                        <ShoppingBag size={14} />
                        <span>Add to Cart</span>
                    </div>

                    <div className="bg-[#124170] hover:bg-[#0d3156] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer select-none transition w-full">
                        <Zap size={14} />
                        <span>Buy Now</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;