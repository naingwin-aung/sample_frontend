import { checkoutConfirm, create } from "./checkout.fetch";

export const checkoutQueryOptionQuery = (cart_query: any) => {
  return {
    queryKey: ["checkout", cart_query?.cart_id ?? null],
    queryFn: () => create(cart_query?.products),
  };
};

export const checkoutConfirmMutationOption = () => {
  return {
    mutationKey: ["checkout_confirm"],
    mutationFn: (data: any) => checkoutConfirm(data),
  };
}
