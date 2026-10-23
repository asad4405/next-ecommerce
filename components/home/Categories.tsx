import { CategoryType } from "@/types/Category";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface ApiResponse {
    status: boolean;
    data: CategoryType[];
    message: string;
}

// Categories API 
async function getCategories(): Promise<CategoryType[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, { cache: "no-store" });
        const data: ApiResponse = await res.json();
        return data.status ? data.data : [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function Categories() {
    const categories = await getCategories();
    const imageBaseUrl = process.env.NEXT_API_IMAGE_URL;

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        Top Categories
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Explore our popular product categories
                    </p>
                </div>
                <Link
                    href="/categories"
                    className="text-xs sm:text-sm font-bold text-[#124170] hover:underline flex items-center gap-1"
                >
                    View All &rarr;
                </Link>
            </div>

            {/* Categories Grid */}
            {categories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            className="group"
                        >
                            <Card className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#124170]/40 transition-all duration-300 flex flex-col items-center text-center h-full">
                                <CardContent className="p-0 flex flex-col items-center w-full">
                                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 bg-slate-100 shadow-inner">
                                        <Image
                                            src={`${imageBaseUrl}/${cat.image}`}
                                            alt={cat.category_name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition duration-500"
                                            unoptimized={true}
                                        />
                                    </div>

                                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#124170] transition line-clamp-1">
                                        {cat.category_name}
                                    </h3>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-slate-500 text-sm bg-white rounded-2xl border border-slate-100 shadow-sm">
                    No categories found.
                </div>
            )}
        </section>
    );
}