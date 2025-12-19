import api from "../../axios";

export const fetchPayloadData = async (guid: string) => {
  const response = await api.get(`/shopping-carts`, {
    params: {
      guid: guid,
    },
  });
  return response.data.data.data;
};

export const create = async (checkout: any) => {
  const response = await api.post(`/shopping-carts`, checkout);
  return response.data.data;
};
