import formatCurrency from "@/lib/formatCurrency";
import { VariantsWithProduct } from "@/lib/infer-type";
import Image from "next/image";
import Link from "next/link";

type ProductsProps = {
  productsWithVariants: VariantsWithProduct[];
};

const Products = ({ productsWithVariants }: ProductsProps) => {
  return (
    <main className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {productsWithVariants.map((p) => {
        return (
          <Link
            href={`/products/${p.id}?vid=${p.id}&productId=${p.product.id}&type=${p.productType}&image=${p.variantImages[0].image_url}&title=${p.product.title}&price=${p.product.price}`}
            key={p.id}
            className="bg-white p-2 rounded-md"
          >
            <Image
              src={p.variantImages[0].image_url}
              alt={p.product.title}
              width={600}
              height={400}
            />
            <hr className="my-2" />
            <h3 className="font-semibold">
              {p.product.title.substring(0, 28) + "..."}
            </h3>
            <p className="text-sm font-medium">
              {formatCurrency(p.product.price)} USD
            </p>
          </Link>
        );
      })}
    </main>
  );
};

export default Products;
