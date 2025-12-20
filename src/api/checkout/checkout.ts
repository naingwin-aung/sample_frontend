import { checkoutConfirm, create } from "./checkout.fetch";

export const checkoutQueryOptionQuery = (checkout: any) => {
  return {
    queryKey: ["checkout", checkout?.guid ?? null],
    queryFn: () =>
      create({
        products: checkout?.data?.products,
      }),
  };
};

export const checkoutConfirmMutationOption = () => {
  return {
    mutationKey: ["checkout_confirm"],
    mutationFn: (data: any) => checkoutConfirm(data),
  };
};
