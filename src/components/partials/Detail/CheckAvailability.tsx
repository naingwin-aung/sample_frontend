import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import { Calendar as Calendar1 } from "lucide-react";
import moment from "moment";

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
            <div className="bg-primary rounded-xl flex items-center ps-2 cursor-pointer w-[140px]">
            <span className="text-white">
              <Calendar1 strokeWidth={1.5} />
            </span>
            <input
              type="text"
              className="text-sm w-full py-2.5 ps-1 text-white placeholder:text-white placeholder:text-[11px] rounded-xl focus:outline-none cursor-pointer"
              value={date ? moment(date).format("DD MMM YYYY") : ""}
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
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(moment(selectedDate).startOf("day").toDate());
              } else {
                setDate(undefined);
              }
            }}
            className="rounded-lg border [--cell-size:--spacing(8)] md:[--cell-size:--spacing(9)]"
            buttonVariant="ghost"
            disabled={{ before: moment().startOf("day").toDate() }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CheckAvailability;
