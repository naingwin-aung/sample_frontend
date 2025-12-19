import api from "../../axios";

export const create = async (checkout: any) => {
  const response = await api.post(`/checkout`, checkout);
  return response.data.data;
};


export const checkoutConfirm = async (data: any) => {
  const response = await api.post(`/checkout/confirm`, data);
  return response.data.data;
}