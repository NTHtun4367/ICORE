"use client";

import { VariantsWithProduct } from "@/lib/infer-type";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";

type SearchBoxProps = {
  productsWithVariants: VariantsWithProduct[];
};

const SearchBox = ({ productsWithVariants }: SearchBoxProps) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState<VariantsWithProduct[]>([]);

  useEffect(() => {
    if (searchKey !== "") {
      const filteredProducts = productsWithVariants.filter((item) => {
        const searchTerm = searchKey.toLowerCase();
        const itemName = item.product.title.toLowerCase();

        return itemName.includes(searchTerm);
      });

      setSearchResults(filteredProducts);
    } else if (searchKey === "") {
      setSearchResults([]);
    }
  }, [searchKey]);

  return (
    <main className="my-6 relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search products..."
          className="ps-8"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Search size={20} className="absolute top-2 left-2" />
      </div>
      {searchResults.length > 0 && (
        <div className="absolute w-full max-h-80 overflow-y-scroll bg-white shadow-md rounded-md p-2 mt-4">
          <p className="text-sm font-medium ps-4 my-2">
            <span className="font-bold">{searchResults.length}</span> results
            found.
          </p>
          <ul>
            {searchResults.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/products/${item.id}?vid=${item.id}&productId=${item.product.id}&type=${item.productType}&image=${item.variantImages[0].image_url}&title=${item.product.title}&price=${item.product.price}`}
                  className="flex items-center justify-between px-2 py-2 border-b"
                >
                  <Image
                    src={item.variantImages[0].image_url}
                    alt={item.product.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <h2>{item.product.title}</h2>
                  <p>{formatCurrency(item.product.price)} USD</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {searchResults.length === 0 && searchKey !== "" && (
        <p className="absolute bg-white rounded-md shadow-md w-full text-sm font-medium p-2 mt-4 text-red-500 ps-4">
          No results found with this product name.
        </p>
      )}
    </main>
  );
};

export default SearchBox;
