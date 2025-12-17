import { useQuery } from "@tanstack/react-query";
import type { ProductType } from "../../../types/ProductType";
import ProductCard from "./ProductCard";
import { ListProductQueryOption } from "../../../api/Product/products";
import Container from "../../global/Container";

const ProductListing = () => {
  const { data } = useQuery({
    ...ListProductQueryOption(1, 10),
  });

  return (
    <Container>
    <h2 className="text-2xl mb-7">Explore the World Through Unforgettable Cruises</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {data?.data.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default ProductListing;
