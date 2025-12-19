import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { listShoppingCartGuidOptionQuery } from "../api/shopping-cart-guid/shoppingcart_guid";
import { checkoutQueryOptionQuery } from "../api/checkout/checkout";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const guid = searchParams.get("shoppingcart_guid");
  const cartQuery = useQuery({
    ...listShoppingCartGuidOptionQuery(guid || ""),
    enabled: !!guid,
  });

  const checkoutQuery = useQuery({
    ...checkoutQueryOptionQuery({
      products: cartQuery.data,
    }),
    enabled: !!cartQuery.data,
  });

  if (cartQuery.isLoading || checkoutQuery.isLoading)
    return <div>Validating booking...</div>;
  
  if (checkoutQuery.error) return <div>Error loading checkout.</div>;

  const checkoutData = checkoutQuery.data;

  return (
    <div>
      <h1>Order Summary</h1>
      <pre>{JSON.stringify(checkoutData, null, 2)}</pre>
    </div>
  );
};

export default Checkout;
