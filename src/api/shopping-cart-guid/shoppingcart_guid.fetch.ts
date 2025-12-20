import api from "../../axios";
import type { Product } from "../checkout/checkout.fetch";

export interface createShoppingCartPayload {
  cart_data: {
    products: Product[];
  }
}

export const fetchPayloadData = async (guid: string) => {
  const response = await api.get(`/shopping-carts`, {
    params: {
      guid: guid,
    },
  });
  return response.data.data;
};

export const create = async (checkout: createShoppingCartPayload) => {
  const response = await api.post(`/shopping-carts`, checkout);
  return response.data.data;
};
