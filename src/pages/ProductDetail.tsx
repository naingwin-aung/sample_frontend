import { useParams } from "react-router-dom";
import Container from "../components/global/Container";
import { products, type ProductInterface } from "../lib/constants";
import { useEffect, useState } from "react";

const product = {
  gallery: [
    {
      url: "https://i.pinimg.com/1200x/40/32/90/403290a0edcee398d314a1e84ae9cb5d.jpg",
    },
    {
      url: "https://i.pinimg.com/1200x/cf/0c/5c/cf0c5c640e60f1b3ca5d204530f37d85.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/5f/f2/ad/5ff2ada1b287dedb7984510e04ef958d.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/e7/b7/85/e7b785d2cba3004447e07b421391b2fd.jpg",
    },
    {
      url: "https://i.pinimg.com/1200x/2b/25/87/2b2587571d107dd32ce0112b4c034f5c.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/7b/91/87/7b91871d2d00cc68de059df6a34c836b.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/3c/61/23/3c6123aa04908249698efc04b6af04aa.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/e6/a9/3c/e6a93caa62c7e2965faf2999cff6255b.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/bd/e0/2e/bde02e31309fa9e3538a4452dabcc2d5.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/1f/69/9c/1f699cc7d911bee13d9242ba126dff92.jpg",
    },
  ],
};

const ProductDetail = () => {
  const param = useParams<{ slug: string }>();
  const [detail, setDetail] = useState<ProductInterface | undefined>();

  useEffect(() => {
    const product = products.find((p) => p.slug === param.slug);
    setDetail((prev) => product || prev);
  }, [param.slug]);

  return (
    <Container className="mt-6">
      <h2 className="text-3xl font-medium mb-6">{detail?.title}</h2>
      {/* gallery here */}
      <div className="w-full h-[362px] mb-6">
        <div className="w-full h-full grid grid-cols-5 gap-2 overflow-hidden">
          {product.gallery.map((img, index) => (
            <div
              key={index}
              className="w-full h-full rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${img.url})` }}
            ></div>
          ))}
        </div>
      </div>

      {/* description */}
      <div className="flex gap-4 mb-6">
        <div className="w-2/3 h-[170px] border border-gray-200 rounded-2xl"></div>
        <div className="w-1/3 h-[120px] border border-gray-200 rounded-2xl"></div>
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
