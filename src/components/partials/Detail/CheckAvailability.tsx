import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import { Calendar as Calendar1 } from "lucide-react";

const CheckAvailability = ({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div className="bg-primary rounded-xl flex items-center ps-3 cursor-pointer w-[185px]">
            <span className="text-white">
                <Calendar1 strokeWidth={1.5} />
            </span>
            <input
              type="text"
              className="text-sm w-full py-2.5 ps-2 text-white placeholder:text-white rounded-xl focus:outline-none cursor-pointer"
              value={date ? date.toDateString() : ""}
              placeholder="Check availability"
              readOnly
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-full overflow-hidden p-0 border-none"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border [--cell-size:--spacing(8)] md:[--cell-size:--spacing(9)]"
            buttonVariant="ghost"
            startMonth={new Date()}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CheckAvailability;
