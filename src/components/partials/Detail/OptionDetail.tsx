import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const zones = [
  { 
    name: "Zone A",
    images: [
      {
        url: "https://i.pinimg.com/1200x/bd/90/a6/bd90a6c8ea07dc7390e461b655a8b1c6.jpg",
      },
      {
        url: "https://i.pinimg.com/1200x/67/7e/7f/677e7f6240a74891acae4e5df14d5bd1.jpg",
      },
      {
        url: "https://i.pinimg.com/736x/5f/f2/ad/5ff2ada1b287dedb7984510e04ef958d.jpg",
      },
    ]
  }, 
  { 
    name: "Zone B",
    images: [
      {
        url: "https://i.pinimg.com/1200x/67/7e/7f/677e7f6240a74891acae4e5df14d5bd1.jpg",
      },
      {
        url: "https://i.pinimg.com/736x/5f/f2/ad/5ff2ada1b287dedb7984510e04ef958d.jpg",
      },
      {
        url: "https://i.pinimg.com/1200x/bd/90/a6/bd90a6c8ea07dc7390e461b655a8b1c6.jpg",
      },
    ]
  }, 
  { 
    name: "Zone C",
    images: [
      {
        url: "https://i.pinimg.com/736x/5f/f2/ad/5ff2ada1b287dedb7984510e04ef958d.jpg",
      },
      {
        url: "https://i.pinimg.com/1200x/bd/90/a6/bd90a6c8ea07dc7390e461b655a8b1c6.jpg",
      },
      {
        url: "https://i.pinimg.com/1200x/67/7e/7f/677e7f6240a74891acae4e5df14d5bd1.jpg",
      },
    ]
  }
];

const tickets = [
  {
    name: "Inter & Thai Dinner Buffet Cruise (Non-Thai)",
  },
  {
    name: "Inter & Thai Dinner Buffet Cruise (Thai)",
  },
];

const quantities = [
  {
    name: "Adult",
    price: 1999,
  },
  {
    name: "Child",
    price: 999,
  },
];

const OptionDetail = () => {
  const [activeZone, setActiveZone] = useState<any | null>(null);
  const [activeTicket, setActiveTicket] = useState<any | null>(null);

  useEffect(() => {
    setActiveZone(zones[0].name);
  }, []);

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Select Zone(s)</h4>
      <div className="flex gap-4">
        {zones.map((zone) => (
          <label
            key={zone.name}
            htmlFor={zone.name}
            className={`text-md font-medium border border-gray-400 rounded-md px-5 py-2.5 cursor-pointer ${
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

      <div className="flex gap-4 mt-5">
        <div className="w-1/3 rounded-lg h-[230px]">
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
        <div className="w-2/3">
          <div className="mb-5">
            <h4 className="text-md font-medium text-gray-500 mb-3">
              Select Ticket
            </h4>
            <div className="flex items-center gap-4">
              {tickets.map((ticket) => (
                <label
                  key={ticket.name}
                  htmlFor={ticket.name}
                  className={`text-md font-medium border border-gray-400 rounded-md px-5 py-2.5 cursor-pointer ${
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

          <div className="mb-5">
            <h4 className="text-md font-medium text-gray-500 mb-3">Quantity</h4>

            <div className="flex flex-col gap-3">
              {quantities.map((quantity) => (
                <div
                  key={quantity.name}
                  className="px-4 py-5 rounded-md border border-gray-200 hover:shadow transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-md font-medium">{quantity.name}</div>
                    <div className="flex items-center gap-3 text-md font-medium">
                      <button className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                        <Minus size={16} />
                      </button>
                      <span>0</span>
                      <button className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5 flex justify-between items-center">
            <div className="text-xl font-semibold">THB 0</div>
            <div>
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
