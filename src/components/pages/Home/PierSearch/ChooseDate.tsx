import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Calendar } from "../../../ui/calendar";

const ChooseDate = ({ date, setDate, text }: { date: Date | undefined; setDate: React.Dispatch<React.SetStateAction<Date | undefined>>; text?: string }) => {
  return (
    <>
      <span className="absolute left-4 top-2 text-xs text-gray-500">
        {text || "Choose Date"}
      </span>
      <Popover>
        <PopoverTrigger asChild>
          <input
            type="text"
            className="text-sm w-full px-4 pt-7 pb-3 bg-gray-100 rounded-xl border focus:outline-none focus:border-orange-500"
            value={date ? date.toDateString() : ""}
            placeholder="Select date"
            readOnly
          />
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

export default ChooseDate;
