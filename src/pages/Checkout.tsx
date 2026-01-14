import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { listShoppingCartGuidOptionQuery } from "../api/shopping-cart-guid/shoppingcart_guid";
import {
  checkoutConfirmMutationOption,
  checkoutQueryOptionQuery,
} from "../api/checkout/checkout";
import Container from "../components/global/Container";
import Image from "../components/global/Image";
import { useEffect } from "react";
import moment from "moment";
import { Armchair, Clock, TicketCheck } from "lucide-react";
import { truncateWord } from "../lib/helper";

const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [searchParams] = useSearchParams();

  const guid = searchParams.get("shoppingcart_guid");
  const cartQuery = useQuery({
    ...listShoppingCartGuidOptionQuery(guid || ""),
    enabled: !!guid,
  });

  const checkoutQuery = useQuery({
    ...checkoutQueryOptionQuery(cartQuery?.data),
    enabled: !!cartQuery?.data?.data,
  });

  const confirmCheckout = useMutation({
    ...checkoutConfirmMutationOption(),
    onSuccess: () => {
      navigate("/");
    },
  });

  const checkout_data = checkoutQuery.data;

  const checkoutConfirmHandler = () => {
    const products: any[] = [];

    checkout_data?.data.forEach((checkout: any) => {
      if (checkout.product_type === "boat") {
        products.push({
          product_type: checkout.product_type,
          product_id: checkout.product.product.id,
          option_id: checkout.product.option_id,
          zone_id: checkout.product.zone.id,
          ticket_id: checkout.product.ticket.id,
          schedule_time_id: checkout.product.schedule_time.id,
          date: checkout.product.date,
          quantities: checkout.product.variations.map((variation: any) => ({
            id: variation.id,
            quantity: variation.quantity,
          })),
          travelers: [
            {
              name: "zen",
              email: "zen@gmail.com",
              passport: "MI800000",
            },
          ],
          additional_options: checkout.product.additional_options.map(
            (additional: any) => ({
              id: additional.id,
              quantity: additional.quantity,
            })
          ),
        });
      }
    });

    const confirmData = {
      products: products,
    };

    confirmCheckout.mutate(confirmData);
  };

  if (cartQuery.isLoading || checkoutQuery.isLoading)
    return <Container>Loading booking...</Container>;

  if (cartQuery.error) return <Container>Error loading cart.</Container>;

  if (checkoutQuery.error)
    return <Container>Error loading checkout.</Container>;

  return (
    <section className="bg-gray-100 pt-1 pb-12 text-sm">
      <Container>
        <section className="block md:flex gap-6 mt-5">
          <div className="w-full md:w-2/3 mb-5 md:mb-0 bg-white overflow-hidden rounded-xl">
            <div className="border border-gray-100 rounded-xl h-fit p-4">
              <div className="mb-6">
                <h4 className="text-[18px] font-medium mb-2">Contact info</h4>
                <p className="text-gray-500 mb-3">
                  We'll contact you only if there's any updates to your booking
                </p>
                <div className="border border-gray-200 rounded-lg p-4 flex gap-4">
                  <div className="w-full flex items-center">
                    <div className="w-1/2 md:w-1/4 text-gray-500 flex flex-col gap-3 font-normal">
                      <div>First name</div>
                      <div>Last name</div>
                      <div>Country/region</div>
                      <div>Phone number</div>
                      <div>Email address</div>
                    </div>
                    <div className="w-1/2 md:w-3/4 text-gray-800 flex flex-col gap-3">
                      <div>Naing</div>
                      <div>Win Aung</div>
                      <div>Thailand</div>
                      <div>+66 1234 5678</div>
                      <div className="wrap-break-word">
                        naingwinaung1710@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-[18px] font-medium mb-4">Product info</h4>
                {checkout_data?.data.map((checkout: any, index: number) => (
                  <div key={index}>
                    {checkout?.product_type === "boat" && (
                      <div className="border border-gray-200 rounded-lg p-4 flex gap-4 mb-4">
                        <Image
                          src={checkout.product.product?.image}
                          alt="Product Image"
                          className="w-24 h-24 rounded-md object-cover"
                        />
                        <div>
                          <h5
                            className="font-medium mb-1"
                            title={checkout.product.product.name}
                          >
                            {truncateWord(checkout.product.product.name, 66)}
                          </h5>
                          <p className="text-gray-500 mb-3">
                            {checkout.product.boat.name}
                          </p>
                          <p className="ms-1 text-gray-500 mb-1.5 flex items-center gap-4">
                            <Armchair /> {checkout.product.zone.name}
                          </p>
                          <p className="ms-1 text-gray-500 mb-1.5 flex items-center gap-4">
                            <TicketCheck /> {checkout.product.ticket.name}
                          </p>
                          <p className="ms-1 text-gray-500 flex items-center gap-4">
                            <Clock />
                            {moment(
                              checkout.product.schedule_time?.start_time,
                              "HH:mm:ss"
                            ).format("HH:mm")}{" "}
                            -{" "}
                            {moment(
                              checkout.product.schedule_time?.end_time,
                              "HH:mm:ss"
                            ).format("HH:mm")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!isMobile && (
                <div className="flex justify-end">
                  <button
                    onClick={() => checkoutConfirmHandler()}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition cursor-pointer"
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/3">
            {checkout_data?.data.map((checkout: any, index: number) => (
              <div key={index}>
                {checkout?.product_type === "boat" && (
                  <div className="bg-white overflow-hidden border border-gray-100 rounded-xl h-fit p-4 mb-4">
                    <h4 className="text-[17px] font-medium mb-2">
                      {checkout.product.product?.name}
                    </h4>
                    <p className="text-gray-500">
                      {checkout.product.boat?.name}
                    </p>
                    <hr className="my-4" />
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-gray-500">Date</div>
                      <div className="text-gray-800">
                        {moment(checkout.product.date).format("DD MMM YYYY")}
                      </div>
                    </div>

                    <div className="flex justify-between mb-4">
                      <div className="text-gray-500">Quantity</div>
                      <div className="flex flex-col gap-1.5">
                        {checkout.product.variations.map(
                          (variation: any, vIndex: number) => (
                            <div key={vIndex} className="text-gray-800">
                              {variation.name} x {variation.quantity}
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {checkout.product.additional_options.length > 0 && (
                      <div className="flex justify-between mb-4">
                        <div className="text-gray-500">Additional Option</div>
                        <div className="flex flex-col gap-1.5">
                          {checkout.product.additional_options.map(
                            (additional: any, aIndex: number) => (
                              <div key={aIndex} className="text-gray-800">
                                {additional.name} x {additional.quantity}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    <hr className="my-4" />
                    <div className="flex items-center justify-between">
                      <div className="text-gray-500">Total</div>
                      <div className="text-gray-800 font-medium">
                        THB {checkout?.total_price.toLocaleString("en-US")}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="sticky top-22 border border-gray-100 bg-white overflow-hidden rounded-xl h-fit p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500">Subtotal</div>
                <div className="text-gray-800">
                  THB {checkout_data?.total_price.toLocaleString("en-US")}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-500">Payment amount</div>
                <div className="text-primary text-[21px] font-medium">
                  THB {checkout_data?.total_price.toLocaleString("en-US")}
                </div>
              </div>
            </div>
          </div>

          {isMobile && (
            <div className="flex justify-end mt-7">
              <button
                onClick={() => checkoutConfirmHandler()}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition cursor-pointer"
              >
                Pay Now
              </button>
            </div>
          )}
        </section>
      </Container>
    </section>
  );
};

export default Checkout;
