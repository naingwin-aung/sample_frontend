import api from "../../axios";

export const index = async (checkout: any) => {
    const response = await api.post(`/checkout`, checkout);
    return response.data.data;
};
