import api from "../../axios";

export const fetchProducts = async (page: number, limit: number) => {
    const response = await api.get(`/products`, {
        params: {
            page,
            limit,
        }
    });

    return response.data.data;
}

export const fetchProductBySlug = async (slug?: string) => {
    const response = await api.get(`/products/${slug}`);
    return response.data.data.product;
}