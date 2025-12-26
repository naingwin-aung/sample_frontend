import { useQuery } from "@tanstack/react-query";
import { GetRelatedProductsQueryOption } from "../../../api/product/products";
import CarouselSlide from "../../global/CarouselSlide";

const RelatedProducts = ({ except_id }: { except_id?: number }) => {
  const { data } = useQuery({
    ...GetRelatedProductsQueryOption(except_id),
  });

  return (
    <div>
      <CarouselSlide products={data?.data || []} />
    </div>
  );
};

export default RelatedProducts;
