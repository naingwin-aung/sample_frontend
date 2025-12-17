import { useQuery } from "@tanstack/react-query";
import type { ProductType } from "../../../types/ProductType";
import ProductCard from "./ProductCard";
import { ListProductQueryOption } from "../../../api/Product/products";

const ProductListing = () => {
  const { data } = useQuery({
    ...ListProductQueryOption(1, 10),
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {data?.data.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductListing;
