import { index } from "./checkout.fetch"

export const checkoutQueryOption = () => {
    return {
        mutationFn: (checkout : any) => index(checkout),
    }
}