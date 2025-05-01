import { db } from "@/server";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import placeHolderImage from "@/public/placeholder.jpg";

const Products = async () => {
  const products = await db.query.products.findMany({
    with: {
      productVariants: { with: { variantImages: true, variantTags: true } },
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });

  const productData = products.map((product) => {
    if (product.productVariants.length === 0) {
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        variants: [],
        image: placeHolderImage.src,
      };
    }
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      variants: product.productVariants,
      image: product.productVariants[0].variantImages[0].image_url,
    };
  });

  return (
    <main>
      <DataTable columns={columns} data={productData} />
    </main>
  );
};

export default Products;
