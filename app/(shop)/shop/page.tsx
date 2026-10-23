import { ProductType } from "@/types/Products";
import { CategoryTree, FilterSidebar } from "@/components/common/FilterSidebar";
import { ProductGrid } from "@/components/common/ProductGrid";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SubcategoryType, ChildCategoryType } from "@/types/Category";

interface ShopProductResponse {
    status: boolean;
    data: ProductType[];
    messsage: string;
}

async function getShopProducts(): Promise<ProductType[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/shop-products`, { cache: "no-store" });
        const data: ShopProductResponse = await res.json();
        return data.status ? data.data : [];
    } catch (error) {
        console.error("Error fetching shop products:", error);
        return [];
    }
}

async function getCategoriesTree(): Promise<CategoryTree[]> {
    try {
        
        const [catRes, subRes, childRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, { cache: "no-store" }),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/subcategories`, { cache: "no-store" }),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/childcategories`, { cache: "no-store" }),
        ]);

        const catData = await catRes.json();
        const subData = await subRes.json();
        const childData = await childRes.json();

        if (!catData.status) return [];

        const categories: CategoryTree[] = catData.data;
        const allSubcategories: SubcategoryType[] = subData.status ? subData.data : [];
        const allChildcategories: ChildCategoryType[] = childData.status ? childData.data : [];

        // সঠিক category_id এবং subcategory_id অনুযায়ী ট্রি তৈরি করা
        const fullTree = categories.map((cat) => {
            const catSubcategories = allSubcategories
                .filter((sub) => sub.category_id === cat.id)
                .map((sub) => {
                    const subChildcategories = allChildcategories.filter(
                        (child) => child.subcategory_id === sub.id
                    );

                    return {
                        ...sub,
                        childcategories: subChildcategories,
                    };
                });

            return {
                ...cat,
                subcategories: catSubcategories,
            };
        });

        return fullTree;
    } catch (error) {
        console.error("Error fetching categories tree:", error);
        return [];
    }
}

export default async function ShopPage() {
    const [products, categoriesTree] = await Promise.all([
        getShopProducts(),
        getCategoriesTree()
    ]);

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            
            <div className="bg-slate-50 border border-slate-200/85 rounded-2xl p-6">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Shop All Products
                </h1>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 mt-2">
                    <Link href="/" className="hover:text-[#124170] transition">Home</Link>
                    <ChevronRight size={14} className="text-slate-400" />
                    <span className="text-slate-800 font-bold">Shop</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <FilterSidebar categories={categoriesTree} />
                </div>

                <div className="lg:col-span-3 space-y-4">
                    
                    <div className="bg-white border border-slate-200/80 rounded-2xl px-5 py-3.5 shadow-sm flex items-center justify-between">
                        <p className="text-xs sm:text-sm font-semibold text-slate-600">
                            Showing <span className="text-[#124170] font-bold">{products.length}</span> products
                        </p>
                    </div>

                    <ProductGrid products={products} />
                </div>
            </div>
        </main>
    );
}