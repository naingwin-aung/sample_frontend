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
    <Container className="mt-5">
      {detail?.title}
    </Container>
  );
};

export default ProductDetail;
