import AddToCart from "@/components/cart/add-to-cart";
import ImageSlider from "@/components/products/image-slider";
import VariantPicker from "@/components/products/variant-picker";
import formatCurrency from "@/lib/formatCurrency";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";

type SingleProductProps = {
  params: {
    id: number;
  };
};

export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
  });

  if (data) {
    const idArr = data.map((d) => ({
      id: d.id.toString(),
    }));
    return idArr;
  }

  return [];
}

const SingleProduct = async ({ params }: SingleProductProps) => {
  const productWithVariants = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, params.id),
    with: {
      product: {
        with: {
          productVariants: {
            with: {
              variantImages: true,
              variantTags: true,
            },
          },
        },
      },
    },
  });

  return (
    <>
      {productWithVariants && (
        <main className="flex flex-col lg:flex-row gap-4 my-6">
          <div className="flex-1">
            <ImageSlider variants={productWithVariants.product.productVariants} />
          </div>
          <div className="flex-1 lg:mt-8">
            <h2 className="text-2xl font-bold">
              {productWithVariants.product.title}
            </h2>
            <p className="text-xs bg-gray-200 font-medium w-fit p-1 rounded-md my-2">
              {productWithVariants.productType} Variant
            </p>
            <hr className="mb-4 mt-3" />
            <div className="leading-8"
              dangerouslySetInnerHTML={{
                __html: productWithVariants.product.description,
              }}
            />
            <p className="text-2xl font-bold my-3">
              {formatCurrency(productWithVariants.product.price)} MMK
            </p>
            <div className="flex items-center gap-2">
              <p className="text-base font-medium">Colors :</p>
              {productWithVariants.product.productVariants.map((v) => (
                <VariantPicker
                  key={v.id}
                  {...v}
                  title={productWithVariants.product.title}
                  price={productWithVariants.product.price}
                  image={v.variantImages[0].image_url}
                  productId={v.productID}
                />
              ))}
            </div>
            <AddToCart />
          </div>
        </main>
      )}
    </>
  );
};

export default SingleProduct;
