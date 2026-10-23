import { BrandSection } from "@/components/common/Brands";
import { Banner } from "@/components/home/Banner";
import { Categories } from "@/components/home/Categories";
import { CategoryProduts } from "@/components/home/CategoryProduts";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function Page() {
  return (
    <div>
        <Banner/>

        <Categories/>

        <BrandSection/>

        <FeaturedProducts/>

        <CategoryProduts/>

    </div>
  )
}
