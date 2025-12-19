import { create } from "./shoppingcart_guid.fetch"

export const shoppingCartGuidOptionQuery = () => {
    return {
        mutationFn: (checkout : any) => create(checkout),
    }
}