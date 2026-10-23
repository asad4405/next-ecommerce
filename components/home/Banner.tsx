import Image from "next/image";
import Link from "next/link";
import { BannerSlider } from "./BannerSlider";

export interface SliderItem {
    image: string;
    link: string;
}

interface ApiResponse {
    status: boolean;
    data: SliderItem[];
    message: string;
}

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
                
                <BannerSlider sliders={sliders} imageBaseUrl={imageBaseUrl} />

                <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4 h-64 sm:h-80 lg:h-96">
                    <div className="relative rounded-2xl overflow-hidden shadow-sm bg-slate-100 group h-full">
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

                    <div className="relative rounded-2xl overflow-hidden shadow-sm bg-slate-100 group h-full">
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