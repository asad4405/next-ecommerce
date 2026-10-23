import Image from "next/image";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { BrandType } from "@/types/Common";

interface BrandResponse {
    status: boolean;
    data: BrandType[];
    messsage: string;
}

async function getBrands(): Promise<BrandType[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brands`, { cache: "no-store" });
        const data: BrandResponse = await res.json();
        
        if (data.status && data.data && data.data.length > 0) {
            return data.data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching brands:", error);
        return [];
    }
}

export async function BrandSection() {
    const brands = await getBrands();

    if (!brands || brands.length === 0) {
        return null;
    }

    const imageBaseUrl = process.env.NEXT_API_IMAGE_URL;

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    Shop By Brand
                </h2>
            </div>

            <div className="relative px-6 sm:px-10">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4 py-2">
                        {brands.map((brand) => (
                            <CarouselItem 
                                key={brand.id} 
                                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                            >
                                <Link
                                    href={`/brands/${brand.slug}`}
                                    className="bg-white border border-slate-200/80 hover:border-[#124170] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex-col items-center justify-center gap-3 group block h-28"
                                >
                                    <div className="relative w-full h-12 flex items-center justify-center px-2">
                                        <Image
                                            src={`${imageBaseUrl}/${brand.image}`}
                                            alt={brand.brand_name}
                                            fill
                                            className="object-contain p-1 group-hover:scale-105 transition duration-300"
                                            unoptimized={true}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 group-hover:text-[#124170] truncate w-full text-center tracking-wide">
                                        {brand.brand_name}
                                    </span>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    <CarouselPrevious className="-left-4 sm:-left-6 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-md" />
                    <CarouselNext className="-right-4 sm:-right-6 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-md" />
                </Carousel>
            </div>
        </section>
    );
}