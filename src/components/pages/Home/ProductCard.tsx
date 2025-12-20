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
      <div className="w-full h-[393px] border border-gray-200 rounded-2xl cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="w-full h-[200px]">
          <Image
            src={product?.images[0]?.url}
            alt="traveler"
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>
        <div className="p-4 h-[150px]">
          <div className="text-xs text-gray-500 mb-1 flex items-center">
            {product.product_type}
            <div>
              <Dot size={16} />
            </div>
            {product.city}
          </div>
          <h3 className="text-md font-medium mb-1 line-clamp-2" title={product.name}>
            {product.name}
          </h3>
          <div className="text-[11px] line-clamp-4">
            {product.piers.length > 0 &&
              product.piers.slice(0, 2).map((pier) => (
                <span key={pier.id} className="mr-1 text-primary bg-orange-100 px-1.5 py-1 rounded-md">
                  {pier.name}
                </span>
              ))}
          </div>
        </div>
        {/* footer */}
        <div className="flex justify-between items-center px-4">
          <span className="text-sm text-gray-500"></span>
          <span className="text-md font-medium">
            From THB {product.min_price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
