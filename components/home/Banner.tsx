import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// TypeScript Interfaces
export interface SliderItem {
    image: string;
    link: string;
}

interface ApiResponse {
    status: boolean;
    data: SliderItem[];
    message: string;
}

// mainslider API
async function getMainSliders(): Promise<SliderItem[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mainslider`, { cache: "no-store" });
        const data: ApiResponse = await res.json();
        return data.status ? data.data : [];
    } catch (error) {
        console.error("Error fetching main slider:", error);
        return [];
    }
}

export async function Banner() {
    const sliders = await getMainSliders();
    const imageBaseUrl = process.env.NEXT_API_IMAGE_URL;

    return (
        <section className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm h-62.5 sm:h-87.5 lg:h-100 bg-slate-100 group">

                    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full h-full scroll-smooth">
                        {sliders.length > 0 ? (
                            sliders.map((item: SliderItem, index: number) => (
                                <div
                                    key={index}
                                    id={`slide-${index}`}
                                    className="w-full h-full shrink-0 snap-center relative"
                                >
                                    <Link href={item.link || "#"} className="block relative w-full h-full">
                                        <Image
                                            src={`${imageBaseUrl}/${item.image}`}
                                            alt={`Main Banner ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                            unoptimized={true}
                                        />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 text-sm">
                                No banners found
                            </div>
                        )}
                    </div>

                    {sliders.length > 1 && (
                        <>
                            <a
                                href="#slide-0"
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition opacity-0 group-hover:opacity-100 backdrop-blur-sm flex items-center justify-center"
                                aria-label="Previous Slide"
                            >
                                <ChevronLeft size={18} />
                            </a>
                            <a
                                href="#slide-1"
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md transition opacity-0 group-hover:opacity-100 backdrop-blur-sm flex items-center justify-center"
                                aria-label="Next Slide"
                            >
                                <ChevronRight size={18} />
                            </a>
                        </>
                    )}

                    {sliders.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex space-x-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm items-center">
                            {sliders.map((_, index) => (
                                <a
                                    key={index}
                                    href={`#slide-${index}`}
                                    className="h-2.5 w-6 bg-white/60 hover:bg-white rounded-full transition-all block"
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}

                </div>

                {/* right side static 2 pc banner */}
                <div className="hidden lg:grid grid-cols-1 gap-4 h-100">

                    <div className="relative rounded-2xl overflow-hidden shadow-sm h-48 bg-slate-100 group">
                        <Link href="/shop" className="block relative w-full h-full">
                            <Image
                                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop"
                                alt="Side Banner 1"
                                fill
                                className="object-cover group-hover:scale-105 transition duration-500"
                                unoptimized={true}
                            />
                        </Link>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-sm h-48 bg-slate-100 group">
                        <Link href="/gadgets" className="block relative w-full h-full">
                            <Image
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
                                alt="Side Banner 2"
                                fill
                                className="object-cover group-hover:scale-105 transition duration-500"
                                unoptimized={true}
                            />
                        </Link>
                    </div>

                </div>

            </div>
        </section>
    );
}