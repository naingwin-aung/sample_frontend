import api from "../../axios";

interface Quantity {
  id: number,
  quantity: number
}

export interface Product {
  product_type: string;
  product_id: number | string;
  option_id: number | string;
  zone_id: number | string | null;
  ticket_id: number | string | null;
  schedule_time_id: number | string | null;
  date: string | null;
  quantities: Quantity[];
}

export interface Checkout {
  products: Product[];
}

export const create = async (checkout: Checkout) => {
  const response = await api.post(`/checkout`, checkout);
  return response.data.data;
};

export const checkoutConfirm = async (data: Checkout) => {
  const response = await api.post(`/checkout/confirm`, data);
  return response.data.data;
}