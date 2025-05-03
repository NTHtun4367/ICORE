import Products from "@/components/products";
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
      <h2>Nav</h2>
      <Products productsWithVariants={productWithVariants} />
    </main>
  );
}
