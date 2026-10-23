import { ProductType } from "@/types/Products";
import { CategoryTree, FilterSidebar } from "@/components/common/FilterSidebar";
import { ProductGrid } from "@/components/common/ProductGrid";
import { SubcategoryType, ChildCategoryType } from "@/types/Category";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ChildcategoryProductsResponse {
    status: boolean;
    data: ProductType[];
    messsage?: string;
    message?: string;
}

async function getChildcategoryProducts(slug: string): Promise<ProductType[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/childcategory-products/${slug}`, { cache: "no-store" });
        const data: ChildcategoryProductsResponse = await res.json();
        return data.status ? data.data : [];
    } catch (error) {
        console.error("Error fetching childcategory products:", error);
        return [];
    }
}

async function getCategoriesTree(): Promise<CategoryTree[]> {
    try {
        // গ্লোবাল সব ক্যাটেগরি, সাবক্যাটেগরি এবং চাইল্ডক্যাটেগরি একসাথে ফেচ করা হলো
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

        // সঠিক category_id এবং subcategory_id ফিল্টারিং ট্রি
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

interface ChildcategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ChildcategoryPage({ params }: ChildcategoryPageProps) {
    const { slug } = await params;

    const [products, categoriesTree] = await Promise.all([
        getChildcategoryProducts(slug),
        getCategoriesTree()
    ]);

    // বর্তমান চাইল্ডক্যাটেগরি, তার পেরেন্ট সাবক্যাটেগরি এবং মূল ক্যাটেগরি খুঁজে বের করা
    let childcategoryName = slug.replace(/-/g, " ");
    let parentSubcategorySlug = "";
    let parentSubcategoryName = "";
    let parentCategorySlug = "";
    let parentCategoryName = "";

    for (const cat of categoriesTree) {
        if (cat.subcategories) {
            for (const sub of cat.subcategories) {
                const foundChild = sub.childcategories?.find((child) => child.slug === slug);
                if (foundChild) {
                    childcategoryName = foundChild.childcategory_name;
                    parentSubcategorySlug = sub.slug;
                    parentSubcategoryName = sub.subcategory_name;
                    parentCategorySlug = cat.slug;
                    parentCategoryName = cat.category_name;
                    break;
                }
            }
        }
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            
            {/* Breadcrumb Header */}
            <div className="bg-slate-50 border border-slate-200/85 rounded-2xl p-6">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight capitalize">
                    {childcategoryName}
                </h1>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 mt-2 flex-wrap">
                    <Link href="/" className="hover:text-[#124170] transition">Home</Link>
                    <ChevronRight size={14} className="text-slate-400" />
                    <Link href="/shop" className="hover:text-[#124170] transition">Shop</Link>
                    
                    {parentCategorySlug && (
                        <>
                            <ChevronRight size={14} className="text-slate-400" />
                            <Link href={`/categories/${parentCategorySlug}`} className="hover:text-[#124170] transition capitalize">
                                {parentCategoryName}
                            </Link>
                        </>
                    )}

                    {parentSubcategorySlug && (
                        <>
                            <ChevronRight size={14} className="text-slate-400" />
                            <Link href={`/subcategories/${parentSubcategorySlug}`} className="hover:text-[#124170] transition capitalize">
                                {parentSubcategoryName}
                            </Link>
                        </>
                    )}
                    
                    <ChevronRight size={14} className="text-slate-400" />
                    <span className="text-slate-800 font-bold capitalize">{childcategoryName}</span>
                </div>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <FilterSidebar 
                        categories={categoriesTree} 
                        activeCategorySlug={parentCategorySlug}
                        activeSubcategorySlug={parentSubcategorySlug}
                        activeChildcategorySlug={slug}
                    />
                </div>

                <div className="lg:col-span-3 space-y-4">
                    
                    <div className="bg-white border border-slate-200/80 rounded-2xl px-5 py-3.5 shadow-sm flex items-center justify-between">
                        <p className="text-xs sm:text-sm font-semibold text-slate-600">
                            Showing <span className="text-[#124170] font-bold">{products.length}</span> products in <span className="text-slate-900 font-bold capitalize">{childcategoryName}</span>
                        </p>
                    </div>

                    <ProductGrid products={products} />
                </div>
            </div>
        </main>
    );
}