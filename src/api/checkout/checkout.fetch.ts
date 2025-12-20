import api from "../../axios";

interface Quantity {
  id: number,
  quantity: number
}

interface Product {
  product_type: string;
  product_id: number;
  option_id: number;
  zone_id: number,
  ticket_id: number;
  schedule_time_id: number;
  date: string;
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