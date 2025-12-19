import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { listShoppingCartGuidOptionQuery } from "../api/shopping-cart-guid/shoppingcart_guid";
import { checkoutQueryOptionQuery } from "../api/checkout/checkout";
import Container from "../components/global/Container";
import Image from "../components/global/Image";
import { useEffect } from "react";

const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  if (cartQuery.error) return <div>Error loading cart.</div>;

  if (checkoutQuery.error) return <div>Error loading checkout.</div>;

  const checkoutData = checkoutQuery.data;
  console.log("Checkout Data:", checkoutData);

  return (
    <Container>
      <section className="flex gap-6 mt-5">
        <div className="w-2/3">
          <div className="border border-gray-200 rounded-xl h-[900px] p-4">
            <div className="mb-6">
              <h4 className="text-[18px] font-medium mb-2">Contact info</h4>
              <p className="text-gray-500 mb-3 text-sm">
                We'll contact you only if there's any updates to your booking
              </p>
              <div className="border border-gray-200 rounded-lg p-4 flex gap-4 text-sm">
                <div className="w-full flex items-center">
                  <div className="w-1/4 text-gray-500 flex flex-col gap-3 font-normal">
                    <div>First name</div>
                    <div>Last name</div>
                    <div>Country/region</div>
                    <div>Phone number</div>
                    <div>Email address</div>
                  </div>
                  <div className="w-/4 text-gray-800 flex flex-col gap-3">
                    <div>Naing</div>
                    <div>Win Aung</div>
                    <div>Thailand</div>
                    <div>+66 1234 5678</div>
                    <div>naingwinaung1710@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-[18px] font-medium mb-4">Product info</h4>
              <div className="border border-gray-200 rounded-lg p-4 flex gap-4">
                <Image
                  src="https://i.pinimg.com/1200x/7b/38/f1/7b38f1022730431e6b14622b6972a88d.jpg"
                  alt="Product Image"
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div>
                  <h5 className="text-lg font-medium mb-2">
                    Ayutthaya Temples One Day Tour from Bangkok
                  </h5>
                  <p className="text-gray-500">India Buffet cruise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 text-sm">
          <div className="border border-gray-200 rounded-xl h-fit p-4">
            <h4 className="text-[17px] font-medium mb-4">
              Ayutthaya Temples One Day Tour from Bangkok
            </h4>
            <p className="text-gray-500">India Buffet cruise</p>
            <hr className="my-4" />
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500">Date</div>
              <div className="text-gray-800">27 Dec 2025</div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500">Quantity</div>
              <div className="text-gray-800">Adult x 1</div>
            </div>
            <hr className="my-4" />
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500">Total</div>
              <div className="text-gray-800 font-medium">THB 3,200</div>
            </div>
          </div>

          <div className="sticky top-22 mt-3 border border-gray-200 rounded-xl h-fit p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500">Subtotal</div>
              <div className="text-gray-800">THB 3,200</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-500">Payment amount</div>
              <div className="text-primary text-xl font-medium">THB 3,200</div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Checkout;
