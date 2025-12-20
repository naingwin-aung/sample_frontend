import { create, fetchPayloadData, type createShoppingCartPayload } from "./shoppingcart_guid.fetch"

export const listShoppingCartGuidOptionQuery = (guid: string) => {
    return {
        queryKey: ['shopping-cart-guid', guid],
        queryFn: () => fetchPayloadData(guid),
    }
}

export const shoppingCartGuidOptionQuery = () => {
    return {
        mutationFn: (checkout : createShoppingCartPayload) => create(checkout),
    }
}