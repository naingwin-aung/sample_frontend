type ImageType = {
  id: number;
  url: string;
};

type PierType = {
  id: number;
  pier_id: number;
  name: string;
};

export type ProductType = {
  product_type: string;
  city: string;
  id: number;
  name: string;
  slug: string;
  min_price: number;
  description: string;
  images: ImageType[];
  piers: PierType[];
};
