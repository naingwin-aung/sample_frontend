import api from "../../axios"
import type { ProductType } from "../../types/ProductType";

export const ListProductQueryOption = (page: number, limit: number) => {
    return {
        queryKey: ['products', page, limit],
        queryFn: () => fetchProducts(page, limit),
    }
}

const fetchProducts = async (page: number, limit: number) => {
    const response = await api.get(`/products`, {
        params: {
            page,
            limit,
        }
    });

    return response.data.data;
}