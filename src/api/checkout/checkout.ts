import { create } from "./checkout.fetch";

export const checkoutQueryOption = () => {
  return {
    mutationFn: (checkout: any) => create(checkout),
  };
};
