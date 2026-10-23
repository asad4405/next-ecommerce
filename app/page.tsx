import { BrandSection } from "@/components/common/Brands";
import { Banner } from "@/components/home/Banner";
import { Categories } from "@/components/home/Categories";
import { CategoryProduts } from "@/components/home/CategoryProduts";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BannerSkeleton } from "@/components/home/skeleton/BannerSkeleton";
import { BrandSkeleton } from "@/components/home/skeleton/BrandSkeleton";
import { CategoriesSkeleton } from "@/components/home/skeleton/CategoriesSkeleton";
import { ProductSkeleton } from "@/components/home/skeleton/ProductSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
        {/* Banner */}
        <Suspense fallback={<BannerSkeleton />}>
            <Banner />
        </Suspense>

        {/* Categories */}
        <Suspense fallback={<CategoriesSkeleton />}>
            <Categories />
        </Suspense>

        {/* Brand Section */}
        <Suspense fallback={<BrandSkeleton />}>
            <BrandSection />
        </Suspense>

        {/* Featured Products */}
        <Suspense fallback={<ProductSkeleton />}>
            <FeaturedProducts />
        </Suspense>

        {/* Category Products */}
        <Suspense fallback={<ProductSkeleton />}>
            <CategoryProduts />
        </Suspense>

    </div>
  )
}
