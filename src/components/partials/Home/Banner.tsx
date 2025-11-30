import React, { useCallback, useEffect, useState } from "react";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Minus, Plus, Ship } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ListPierQueryOption } from "../../../api/pier";
import useDebounce from "../../../hooks/useDebounce";

const Banner = () => {
  const backgroundImageUrl = "/src/assets/banner.jpg";
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startPierShow, setStartPierShow] = useState<boolean>(false);
  const [startPierInput, setStartPierInput] = useState<string>("");
  const [selectedStartPierId, setSelectedStartPierId] = useState<number | null>(
    null
  );

  const debouncedSearch = useDebounce(startPierInput, 500);
  
  const { data, isPending, error } = useQuery(
    ListPierQueryOption(debouncedSearch, 1, 8)
  );

  useEffect(() => {
    if (startPierInput.length > 0 && selectedStartPierId === null) {
      setStartPierShow(true);
    } else {
      setStartPierShow(false);
    }
  }, [startPierInput, selectedStartPierId]);

  const handleStartPierChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setStartPierInput(value);
      setSelectedStartPierId(null);
    },
    []
  );

  const selectStartPier = useCallback((pier: any) => {
    setStartPierInput(pier.name);
    setSelectedStartPierId(pier.id);
    setStartPierShow(false);
  }, []);

  return (
    <div
      className="h-[345px] w-full relative mb-40 lg:mb-15"
      style={{
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="w-[calc(100%-3rem)] mx-auto p-5 xl:w-[1220px] h-auto bg-white absolute bottom-[-180px] lg:bottom-[-50px] left-1/2 transform -translate-x-1/2 shadow-lg rounded-2xl flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <div className="w-full lg:w-2/8 relative">
            <span className="absolute left-4 top-2 text-xs text-gray-500">
              From
            </span>

            <input
              type="text"
              value={startPierInput}
              className="text-sm w-full bg-gray-100 px-4 pt-7 pb-3 focus:outline-none rounded-xl border focus:border-orange-500"
              placeholder="Start pier"
              onChange={handleStartPierChange}
            />

            <div
              className={`w-auto lg:w-[300px] p-3 rounded-xl bg-white z-10 absolute top-17 left-0 shadow-md border border-gray-200 ${
                startPierShow ? "block" : "hidden"
              }`}
            >
              {isPending ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error loading piers.</div>
              ) : data?.data.length === 0 ? (
                <div>No piers found.</div>
              ) : (
                <div className="flex flex-col gap-3.5">
                  {data?.data?.map((pier: any) => (
                    <div
                      key={pier.id}
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => selectStartPier(pier)}
                    >
                      <div>
                        <Ship strokeWidth={1.5} />
                      </div>
                      <div className="text-sm text-gray-900">
                        <div>{pier.name}</div>
                        {/* <div className="text-gray-500 text-xs">
                        47/54 Moo 4 Tawasuki, Phra Nakhon Si Ayutthaya, Thailand
                      </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-2/8 relative">
            <span className="absolute left-4 top-2 text-xs text-gray-500">
              To
            </span>

            <input
              type="text"
              className="text-sm w-full bg-gray-100 px-4 pt-7 pb-3 focus:outline-none rounded-xl border focus:border-orange-500"
              placeholder="End pier"
            />

            <div
              className={`w-auto lg:w-[480px] p-3 rounded-xl bg-white z-10 absolute top-17 left-0 shadow-md border border-gray-200 ${
                false ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-col gap-3.5">
                <div className="flex items-start gap-2 cursor-pointer">
                  <div>
                    <Ship strokeWidth={1.5} />
                  </div>
                  <div className="text-sm text-gray-900">
                    <div className="mb-1.5">Hello Sunshine</div>
                    <div className="text-gray-500 text-xs">
                      47/54 Moo 4 Tawasuki, Phra Nakhon Si Ayutthaya, Thailand
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 cursor-pointer">
                  <div>
                    <Ship strokeWidth={1.5} />
                  </div>
                  <div className="text-sm text-gray-900">
                    <div className="mb-1.5">Hello Sunshine</div>
                    <div className="text-gray-500 text-xs">
                      47/54 Moo 4 Tawasuki, Phra Nakhon Si Ayutthaya, Thailand
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/8 relative">
            <span className="absolute left-4 top-2 text-xs text-gray-500">
              Date & time
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
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full lg:w-1/8 relative">
            <span className="absolute left-4 top-2 text-xs text-gray-500">
              Passenger(s)
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <input
                  type="text"
                  className="text-sm w-full px-4 pt-7 pb-3 bg-gray-100 rounded-xl border focus:outline-none focus:border-orange-500"
                  placeholder="2 Adults"
                  readOnly
                />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={6}
                className="w-80 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 font-medium">
                    Passengers
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 px-2 bg-gray-100 rounded cursor-pointer active:bg-gray-200">
                      <Minus strokeWidth={2} size={12} />
                    </button>
                    <div>2</div>
                    <button className="p-2 px-2 bg-gray-100 rounded cursor-pointer active:bg-gray-200">
                      <Plus strokeWidth={2} size={12} />
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full lg:w-1/8 relative">
            <button className="text-sm w-full bg-orange-600 text-white px-10 py-5 rounded-xl hover:bg-orange-700 transition cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
