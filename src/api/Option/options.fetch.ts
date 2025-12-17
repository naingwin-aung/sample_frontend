import api from "../../axios";

export const fetchOptions = async (slug: string, option_id: number) => {
    const response = await api.get(`/products/${slug}/options/${option_id}`);
    return response.data.data.data;
}