import { Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CheckAvailability from "./CheckAvailability";

const zones = [
  {
    name: "Rooftop Area - middle zone",
    images: [
      {
        url: "https://i.pinimg.com/736x/db/b8/11/dbb81102a793c857fac3c093aa6e1769.jpg",
      },
      {
        url: "https://i.pinimg.com/1200x/1f/9f/aa/1f9faaa7fe3968c385f11c83aed8c347.jpg",
      },
      {
        url: "https://i.pinimg.com/736x/58/6a/4c/586a4ce92dd4c633544be30584d40dc3.jpg",
      },
    ],
  },
  {
    name: "Front Area - near the stage",
    images: [
      {
        url: "https://i.pinimg.com/1200x/21/93/4b/21934b0b34b3b55ab21c683a3677faf1.jpg",
      },
      {
        url: "https://i.pinimg.com/1200x/96/81/79/9681794f4393110f73f0c8e12edd621a.jpg",
      },
      {
        url: "https://i.pinimg.com/736x/ff/10/60/ff1060939b9bc96f5be5cb21bd85bbe7.jpg",
      },
    ],
  },
  {
    name: "Lower Deck Area - near the bar",
    images: [
      {
        url: "https://i.pinimg.com/736x/bc/66/86/bc668682736908b0b8323bd52d818a3d.jpg",
      },
      {
        url: "https://i.pinimg.com/736x/4b/d1/56/4bd156c28ef580d3e45be71b53a7a830.jpg",
      },
      {
        url: "https://i.pinimg.com/736x/a9/3c/2b/a93c2b2b4142f19e791d7f341eda0197.jpg",
      },
    ],
  },
];

const tickets = [
  {
    name: "Inter & Thai Dinner Buffet Cruise (Non-Thai)",
  },
  {
    name: "Inter & Thai Dinner Buffet Cruise (Thai)",
  },
];

const times = [
  {
    name: "18:30 - 21:30",
  }
];

const additionalOptions = [
  {
    name: "Beer Buffet",
    price: 2999,
    count: 0,
  },
  {
    name: "BBQ Buffet",
    price: 999,
    count: 0,
  },
];

const initialQuantities = [
  {
    name: "Adult",
    price: 1999,
    count: 0, 
  },
  {
    name: "Child",
    price: 999,
    count: 0,
  },
];

const OptionDetail = () => {
  const [activeZone, setActiveZone] = useState<any | null>(null);
  const [activeTicket, setActiveTicket] = useState<any | null>(null);
  const [activeTime, setActiveTime] = useState<any | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [activeQuantities, setActiveQuantities] = useState(initialQuantities);

  useEffect(() => {
    setActiveZone(zones[0].name);
    setActiveTime(times[0].name);
    setActiveTicket(tickets[0].name);
  }, []);

  const updateQuantity = (index: number, delta: 1 | -1) => {
    setActiveQuantities((prevQuantities) =>
      prevQuantities.map((item, i) => {
        if(item.count == 10 && delta === 1) return item; // max 10

        if (i === index) {
          const newCount = Math.max(0, item.count + delta);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  const quantityPlus = (index: number) => updateQuantity(index, 1);
  const quantityMinus = (index: number) => updateQuantity(index, -1);

  const { totalPrice } = useMemo(() => {
    const totalP = activeQuantities.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    return { totalPrice: totalP };
  }, [activeQuantities]);

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Select Zone(s)</h4>
      <div className="flex flex-col md:flex-row gap-4">
        {zones.map((zone) => (
          <label
            key={zone.name}
            htmlFor={zone.name}
            className={`w-max text-md font-medium border border-gray-400 rounded-md px-5 py-2.5 cursor-pointer ${
              activeZone === zone.name ? "border-primary text-primary" : ""
            }`}
          >
            {zone.name}
            <input
              id={zone.name}
              type="radio"
              checked={activeZone === zone.name}
              onChange={() => setActiveZone(zone.name)}
              className="appearance-none"
            />
          </label>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-5">
        <div className="w-full md:w-1/3 rounded-lg h-[300px] mt-8">
          {activeZone ? (
            <img
              src={
                zones.find((zone) => zone.name === activeZone)?.images[0].url
              }
              alt={activeZone}
              className="w-full h-full object-cover rounded-lg"
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
              {times.map((time) => (
                <label
                  key={time.name}
                  htmlFor={time.name}
                  className={`text-md font-medium border border-gray-400 rounded-md px-5 py-2.5 cursor-pointer ${
                    activeTime === time.name
                      ? "border-primary text-primary"
                      : ""
                  }`}
                >
                  {time.name}
                  <input
                    id={time.name}
                    type="radio"
                    checked={activeTime === time.name}
                    onChange={() => setActiveTime(time.name)}
                    className="appearance-none"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-md text-gray-500 mb-3">Select Ticket</h4>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {tickets.map((ticket) => (
                <label
                  key={ticket.name}
                  htmlFor={ticket.name}
                  className={`text-md font-medium border border-gray-400 rounded-md px-5 py-2.5 cursor-pointer w-max ${
                    activeTicket === ticket.name
                      ? "border-primary text-primary"
                      : ""
                  }`}
                >
                  {ticket.name}
                  <input
                    id={ticket.name}
                    type="radio"
                    checked={activeTicket === ticket.name}
                    onChange={() => setActiveTicket(ticket.name)}
                    className="appearance-none"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mb-7">
            <h4 className="text-md text-gray-500 mb-3">Quantity</h4>

            <div className="flex flex-col gap-3">
              {activeQuantities.map((quantity, index) => (
                <div
                  key={quantity.name}
                  className="px-4 py-5 rounded-md border border-gray-200 hover:shadow transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-md font-medium">{quantity.name}</div>
                    <div className="flex items-center gap-3 text-md font-medium">
                      <button onClick={() => quantityMinus(index)} className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                        <Minus size={16} />
                      </button>
                      <span>{quantity.count}</span>
                      <button onClick={() => quantityPlus(index)} className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-7">
            <h4 className="text-md text-gray-500 mb-3">Additional options (optional)</h4>

            <div className="flex flex-col gap-3">
              {additionalOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-5 rounded-md border border-gray-200 hover:shadow transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-md font-medium">{option.name}</div>
                    <div className="flex items-center gap-3 text-md font-medium">
                      <button className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                        <Minus size={16} />
                      </button>
                      <span>{option.count}</span>
                      <button className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="text-2xl font-medium">
              THB {totalPrice ? totalPrice.toLocaleString("en-US") : "-"}
              <div className="text-xs text-gray-400 font-normal mt-1.5">Complete all required fields to continue</div>
            </div>
            <div className="text-end mt-2 md:mt-0">
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition cursor-pointer">
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
