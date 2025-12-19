import { create, fetchPayloadData } from "./shoppingcart_guid.fetch"

export const listShoppingCartGuidOptionQuery = (guid: string) => {
    return {
        queryKey: ['shopping-cart-guid', guid],
        queryFn: () => fetchPayloadData(guid),
    }
}

export const shoppingCartGuidOptionQuery = () => {
    return {
        mutationFn: (checkout : any) => create(checkout),
    }
}