import { useQuery } from "@tanstack/react-query";
import { ListProductQueryOption } from "../../../api/Product/products";
import type { ProductType } from "../../../types/ProductType";
import ProductCard from "../Home/ProductCard";

const RelatedProducts = ({ except_ids }: { except_ids?: number[] }) => {
  const { data } = useQuery({
    ...ListProductQueryOption(1, 4, except_ids),
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {data?.data.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
