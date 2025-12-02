import { useParams } from "react-router-dom";
import Container from "../components/global/Container";
import {products, type ProductInterface} from "../lib/constants";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const param = useParams<{ slug: string }>();
  const [detail, setDetail] = useState<ProductInterface | undefined>();

  useEffect(() => {
    const product = products.find((p) => p.slug === param.slug);
    setDetail((prev) => product || prev);
  }, [param.slug]);

  return (
    <Container className="mt-6">
      <h2 className="text-3xl font-medium mb-6">
        {detail?.title}
      </h2>
      {/* gallery here */}
      <div className="w-full h-[362px] border border-gray-200 rounded-2xl mb-6">
      </div>

      {/* description */}
      <div className="flex gap-4 mb-6">
        <div className="w-2/3 h-[170px] border border-gray-200 rounded-2xl">

        </div>
        <div className="w-1/3 h-[120px] border border-gray-200 rounded-2xl">
        </div>
      </div>

      {/* select option */}
      <div>
        <h3 className="text-2xl font-medium mb-4">Select options</h3>
        <div className="flex flex-col gap-4">
          <div className="w-full h-[190px] border border-gray-200 rounded-2xl"></div>
          <div className="w-full h-[190px] border border-gray-200 rounded-2xl"></div>
          <div className="w-full h-[190px] border border-gray-200 rounded-2xl"></div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
