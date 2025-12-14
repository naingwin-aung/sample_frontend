import { fetchProductBySlug, fetchProducts } from "./product.fetch"

export const ListProductQueryOption = (page: number, limit: number) => {
    return {
        queryKey: ['products', page, limit],
        queryFn: () => fetchProducts(page, limit),
    }
}

export const GetProductBySlugQueryOption = (slug?: string) => {
    return {
        queryKey: ['product', slug],
        queryFn: () => fetchProductBySlug(slug),
    }
}