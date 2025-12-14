import api from "../../axios"

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

export const GetProductBySlugQueryOption = (slug?: string) => {
    return {
        queryKey: ['product', slug],
        queryFn: () => fetchProductBySlug(slug),
    }
}

const fetchProductBySlug = async (slug?: string) => {
    const response = await api.get(`/products/${slug}`);
    return response.data.data.product;
}