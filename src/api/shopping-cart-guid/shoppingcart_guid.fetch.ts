import api from "../../axios";

export const create = async (checkout: any) => {
    const response = await api.post(`/shopping-carts`, checkout);
    return response.data.data;
};