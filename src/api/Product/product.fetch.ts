import api from "../../axios";

export const fetchProducts = async (page: number, limit: number, except_ids?: number[]) => {
    const response = await api.get(`/products`, {
        params: {
            page,
            limit,
            except_ids,
        }
    });

    return response.data.data;
}

export const fetchProductBySlug = async (slug?: string) => {
    const response = await api.get(`/products/${slug}`);
    return response.data.data.product;
}

export const fetchRelatedProducts = async (except_id?: number) => {
    const response = await api.get(`/products/${except_id}/related`);
    return response.data.data;
}