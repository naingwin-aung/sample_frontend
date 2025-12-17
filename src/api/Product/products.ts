import { fetchProductBySlug, fetchProducts } from "./product.fetch"

export const ListProductQueryOption = (page: number, limit: number, except_ids?: number[]) => {
    return {
        queryKey: ['products', page, limit, except_ids],
        queryFn: () => fetchProducts(page, limit, except_ids),
    }
}

export const GetProductBySlugQueryOption = (slug?: string) => {
    return {
        queryKey: ['product', slug],
        queryFn: () => fetchProductBySlug(slug),
    }
}