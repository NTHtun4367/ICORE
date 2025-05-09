import Products from "@/components/products";
import SearchBox from "@/components/products/search-box";
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
      <Products productsWithVariants={productWithVariants} />
    </main>
  );
}
