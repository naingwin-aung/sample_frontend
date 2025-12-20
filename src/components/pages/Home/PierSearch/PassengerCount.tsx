import { Minus, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";

const PassengerCount = ({ passengerCount, setPassengerCount } : { passengerCount: number; setPassengerCount: React.Dispatch<React.SetStateAction<number>> }) => {
    const handleMinus = () => {
        if (passengerCount > 1) {
            setPassengerCount((prev) => prev - 1);
        }
    }

    const handlePlus = () => {
        if(passengerCount < 10) {
            setPassengerCount((prev) => prev + 1);
        }
    }

  return (
    <>
      <span className="absolute left-4 top-2 text-xs text-gray-500">
        Passenger(s)
      </span>
      <Popover>
        <PopoverTrigger asChild>
          <input
            value={`${passengerCount} pax(s)`}
            type="text"
            className="text-sm w-full px-4 pt-7 pb-3 bg-gray-100 rounded-xl border focus:outline-none focus:border-orange-500"
            placeholder="Adults"
            readOnly
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={6}
          className="w-80 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">Passengers</div>
            <div className="flex items-center gap-3">
              <button onClick={() => handleMinus()} className="p-2 px-2 bg-gray-100 rounded cursor-pointer active:bg-gray-200">
                <Minus strokeWidth={2} size={12} />
              </button>
              <div>{passengerCount}</div>
              <button onClick={() => handlePlus()} className="p-2 px-2 bg-gray-100 rounded cursor-pointer active:bg-gray-200">
                <Plus strokeWidth={2} size={12} />
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PassengerCount;
