import { Banner } from "@/components/home/Banner";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function Page() {
  return (
    <div>
        <Banner/>

        <Categories/>

        <FeaturedProducts/>
    </div>
  )
}
