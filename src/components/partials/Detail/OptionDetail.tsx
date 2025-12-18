import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CheckAvailability from "./CheckAvailability";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ListOptionQueryOption } from "../../../api/option/options";
import moment from "moment";
import SmallImageGallery from "./SmallImageGallery";
import { checkoutQueryOption } from "../../../api/checkout/checkout";

interface PriceWithQuantity {
  id: number;
  name: string;
  net_price: number;
  quantity: number;
}

const OptionDetail = ({
  slug,
  optionId,
}: {
  slug: string | undefined;
  optionId: number;
}) => {
  const { data: option } = useQuery({
    ...ListOptionQueryOption(slug, optionId),
  });

  const [activeZone, setActiveZone] = useState<any | null>(null);
  const [activeTicket, setActiveTicket] = useState<any | null>(null);
  const [activeTime, setActiveTime] = useState<any | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [activeQuantities, setActiveQuantities] = useState<PriceWithQuantity[]>(
    []
  );

  useEffect(() => {
    if (option?.zones && option.zones.length > 0 && !activeZone) {
      setActiveZone(option.zones[0].id);
      setActiveTicket(option.tickets[0].id);
      setActiveTime(option.schedule_times[0].id);
      setActiveQuantities(
        option.tickets[0].prices.map((price: any) => ({
          ...price,
          quantity: 0,
        }))
      );
    }
  }, [option]);

  const selectTicket = (ticket: any) => {
    setActiveTicket(ticket.id);
    const quantitiesWithQuantity = ticket.prices.map((price: any) => ({
      ...price,
      quantity: 0,
    }));

    setActiveQuantities(quantitiesWithQuantity);
  };

  const updateQuantity = (index: number, delta: 1 | -1) => {
    setActiveQuantities((prevQuantities: any) =>
      prevQuantities.map((item: any, i: number) => {
        if (item.quantity == 10 && delta === 1) return item; // max 10

        if (i === index) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const quantityPlus = (index: number) => {
    updateQuantity(index, 1);
  };

  const quantityMinus = (index: number) => {
    updateQuantity(index, -1);
  };

  const { totalPrice } = useMemo(() => {
    const totalP = activeQuantities.reduce(
      (sum, item) => sum + item?.net_price * item?.quantity,
      0
    );
    return { totalPrice: totalP };
  }, [activeQuantities]);

  const resetSelect = () => {
    setActiveZone(null);
    setActiveTicket(null);
    setActiveTime(null);
    setDate(undefined);
    setActiveQuantities([]);
  };

  const checkoutMutation = useMutation({
    ...checkoutQueryOption(),
    onSuccess: () => {
      console.log("Checkout successful");
    },
  });

  const checkoutHandler = () => {
    const quantities = activeQuantities.filter((item) => item.quantity > 0).map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    console.log({
      product_id: option.product_id,
      option_id: option.id,
      zone_id: activeZone,
      ticket_id: activeTicket,
      schedule_time_id: activeTime,
      date: date ? moment(date).format("YYYY-MM-DD") : null,
      quantities: quantities,
    });

    const payload = {
      product_id: option.product_id,
      option_id: option.id,
      zone_id: activeZone,
      ticket_id: activeTicket,
      schedule_time_id: activeTime,
      date: date ? moment(date).format("YYYY-MM-DD") : null,
      quantities: quantities,
    };

    checkoutMutation.mutate(payload);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Select Zone(s)</h4>
        <button
          onClick={() => resetSelect()}
          className="text-[15px] font-medium underline text-gray-800 cursor-pointer"
        >
          Clear all
        </button>
      </div>
      <h5 className="text-md text-gray-500 mb-3">
        Please select your preferred zone
      </h5>
      <div className="flex flex-col md:flex-row gap-4">
        {option?.zones.map((zone: any) => (
          <label
            key={zone.name}
            htmlFor={zone.name}
            className={`w-max text-md font-medium border border-gray-400 rounded-md px-5 py-2.5 cursor-pointer ${
              activeZone === zone.id ? "border-primary text-primary" : ""
            }`}
          >
            {zone.name}
            <input
              id={zone.name}
              type="radio"
              checked={activeZone === zone.id}
              onChange={() => setActiveZone(zone.id)}
              className="appearance-none"
            />
          </label>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3 rounded-xl h-[380px] mt-8 overflow-hidden shadow-xl border border-gray-200">
          {activeZone ? (
            <SmallImageGallery
              images={
                option?.zones.find((zone: any) => zone.id === activeZone)
                  ?.images
              }
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Please select a zone to see the image
            </div>
          )}
        </div>
        <div className="w-full md:w-2/3 mt-4">
          <div className="mb-5">
            <h4 className="text-md text-gray-500 mb-3">
              Please select a participation date
            </h4>
            <div className="relative w-1/4">
              <CheckAvailability date={date} setDate={setDate} />
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-md text-gray-500 mb-3">Select Time</h4>
            <div className="flex flex-col w-max md:flex-row md:items-center gap-4">
              {option?.schedule_times.map((time: any) => (
                <label
                  key={time.id}
                  htmlFor={time.start_time}
                  className={`text-md font-medium border border-gray-400 rounded-md px-5 py-2.5 cursor-pointer ${
                    activeTime === time.id ? "border-primary text-primary" : ""
                  }`}
                >
                  {moment(time.start_time, "HH:mm:ss").format("HH:mm")} -{" "}
                  {moment(time.end_time, "HH:mm:ss").format("HH:mm")}
                  <input
                    id={time.start_time}
                    type="radio"
                    checked={activeTime === time.id}
                    onChange={() => setActiveTime(time.id)}
                    className="appearance-none"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-md text-gray-500 mb-3">Select Ticket</h4>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {option?.tickets.map((ticket: any) => (
                <label
                  key={ticket.id}
                  htmlFor={ticket.id}
                  className={`text-md font-medium border border-gray-400 rounded-md px-5 py-2.5 cursor-pointer w-max ${
                    activeTicket === ticket.id
                      ? "border-primary text-primary"
                      : ""
                  }`}
                >
                  {ticket.name}
                  <input
                    id={ticket.id}
                    type="radio"
                    checked={activeTicket === ticket.id}
                    onChange={() => selectTicket(ticket)}
                    className="appearance-none"
                  />
                </label>
              ))}
            </div>
          </div>

          {activeQuantities.length > 0 && (
            <div className="mb-7">
              <h4 className="text-md text-gray-500 mb-3">Quantity</h4>

              <div className="flex flex-col gap-3">
                {activeQuantities?.map((quantity: any, index: number) => (
                  <div
                    key={quantity.id}
                    className="px-4 py-5 rounded-md border border-gray-200 hover:shadow transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-md font-medium">{quantity.name}</div>
                      <div className="flex items-center gap-3 text-md font-medium">
                        <button
                          onClick={() => quantityMinus(index)}
                          className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                        >
                          <Minus size={16} />
                        </button>
                        <span>{quantity.quantity}</span>
                        <button
                          onClick={() => quantityPlus(index)}
                          className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="text-2xl font-medium">
              THB {totalPrice ? totalPrice.toLocaleString("en-US") : "-"}
              <div className="text-xs text-gray-400 font-normal mt-1.5">
                Complete all required fields to continue
              </div>
            </div>
            <div className="text-end mt-2 md:mt-0">
              <button
                onClick={() => checkoutHandler()}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionDetail;
