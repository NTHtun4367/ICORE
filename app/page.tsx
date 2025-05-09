import Products from "@/components/products";
import SearchBox from "@/components/products/search-box";
import TagFilter from "@/components/products/tag-filter";
import { db } from "@/server";

export default async function Home() {
  const productWithVariants = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true
    }
  })
  
  return (
    <main>
      <SearchBox productsWithVariants={productWithVariants} />
      <TagFilter />
      <Products productsWithVariants={productWithVariants} />
    </main>
  );
}
