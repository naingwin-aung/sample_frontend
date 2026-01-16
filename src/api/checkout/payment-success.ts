import { paymentSuccessFetch } from "./payment-success.fetch";

export const paymentSuccess = (booking_number: string) => {
  return {
    queryKey: ["payment_success", booking_number],
    queryFn: () => paymentSuccessFetch(booking_number),
  };
};
