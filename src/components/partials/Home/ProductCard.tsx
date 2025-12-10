import { Link } from "react-router-dom";
import Image from "../../global/Image";
import type { ProductType } from "../../../types/ProductType";
import { Dot } from "lucide-react";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-full h-[390px] border border-gray-200 rounded-2xl cursor-pointer hover:shadow">
        <div className="w-full h-[200px]">
          <Image
            src={product?.images[0]?.url}
            alt="traveler"
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>
        <div className="p-4 h-[150px]">
          <div className="text-sm text-gray-500 mb-1 flex items-center">
            {product.product_type}
            <div>
              <Dot size={16} />
            </div>
            {product.city}
          </div>
          <h3 className="text-md font-medium mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="text-[11px] text-gray-400 line-clamp-4 p-1 rounded bg-gray-100 w-max">
            {product.piers.length > 0 &&
              `${product.piers
                .slice(0, 2)
                .map((pier) => pier.name)
                .join(", ")}`}
          </div>
        </div>
        {/* footer */}
        <div className="flex justify-between items-center px-4 pb-4">
          <span className="text-sm text-gray-500"></span>
          <span className="text-md font-medium">
            From THB {product.min_price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
