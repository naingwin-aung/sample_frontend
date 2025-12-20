import { checkoutConfirm, create, type Checkout, type Product } from "./checkout.fetch";

interface CheckoutQueryOption {
  guid: string | null;
  data: {
    products: Product[];
  };
}

export const checkoutQueryOptionQuery = (checkout: CheckoutQueryOption) => {
  console.log("checkout", checkout);
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
    mutationFn: (data: Checkout) => checkoutConfirm(data),
  };
};
