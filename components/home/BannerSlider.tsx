"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SliderItem } from "./Banner";

interface BannerSliderProps {
    sliders: SliderItem[];
    imageBaseUrl?: string;
}

export function BannerSlider({ sliders, imageBaseUrl }: BannerSliderProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const index = Math.round(scrollLeft / clientWidth);
            if (index !== currentIndex) {
                setCurrentIndex(index);
            }
        }
    };

    const scrollToIndex = (index: number) => {
        if (scrollRef.current) {
            const child = scrollRef.current.children[index] as HTMLElement;
            if (child) {
                scrollRef.current.scrollTo({
                    left: child.offsetLeft,
                    behavior: "smooth"
                });
                setCurrentIndex(index);
            }
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < sliders.length - 1) {
            scrollToIndex(currentIndex + 1);
        }
    };

    return (
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-sm h-64 sm:h-80 lg:h-96 bg-slate-100 group">
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full h-full scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {sliders.length > 0 ? (
                    sliders.map((item: SliderItem, index: number) => (
                        <div
                            key={index}
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
                    <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        onClick={(e) => { e.preventDefault(); handlePrev(); }}
                        disabled={currentIndex === 0}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity h-9 w-9 p-0 shadow-md cursor-pointer bg-white/80 hover:bg-white text-slate-800 disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={18} />
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        onClick={(e) => { e.preventDefault(); handleNext(); }}
                        disabled={currentIndex === sliders.length - 1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity h-9 w-9 p-0 shadow-md cursor-pointer bg-white/80 hover:bg-white text-slate-800 disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={18} />
                    </Button>
                </>
            )}

            {sliders.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex space-x-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm items-center">
                    {sliders.map((_, index) => (
                        <button
                            type="button"
                            key={index}
                            onClick={(e) => { e.preventDefault(); scrollToIndex(index); }}
                            className={`h-2.5 rounded-full transition-all cursor-pointer border-0 ${
                                currentIndex === index 
                                    ? "w-6 bg-white shadow-md" 
                                    : "w-2.5 bg-white/50 hover:bg-white/80"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}