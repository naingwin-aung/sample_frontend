import { useCallback, useEffect, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { ListPierQueryOption } from "../../../../api/pier";
import { Ship } from "lucide-react";

const ToPier = ({ selectedEndPierId, setSelectedEndPierId }: { selectedEndPierId: number | null; setSelectedEndPierId: React.Dispatch<React.SetStateAction<number | null>> }) => {
  const [endPierShow, setEndPierShow] = useState<boolean>(false);
  const [endPierInput, setEndPierInput] = useState<string>("");

  const debouncedSearch = useDebounce(endPierInput, 500);

  const { data, isPending, error } = useQuery({
    ...ListPierQueryOption(debouncedSearch, 1, 8),
    enabled: debouncedSearch.length > 0,
  });

  useEffect(() => {
    if (endPierInput.length > 0 && selectedEndPierId === null) {
      setEndPierShow(true);
    } else {
      setEndPierShow(false);
    }
  }, [endPierInput, selectedEndPierId]);

  const handleEndPierChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEndPierInput(value);
      setSelectedEndPierId(null);
    },
    []
  );

  const selectEndPier = useCallback((pier: any) => {
    setEndPierInput(pier.name);
    setSelectedEndPierId(pier.id);
    setEndPierShow(false);
  }, []);

  return (
    <div className="relative">
      <span className="absolute left-4 top-2 text-xs text-gray-500">From</span>

      <input
        type="text"
        value={endPierInput}
        className="text-sm w-full bg-gray-100 px-4 pt-7 pb-3 focus:outline-none rounded-xl border focus:border-orange-500"
        placeholder="End pier"
        onChange={handleEndPierChange}
      />

      <div
        className={`w-auto lg:w-[340px] p-3 rounded-xl bg-white z-20 absolute top-full mt-2 left-0 shadow-md border border-gray-200 ${
          endPierShow ? "block" : "hidden"
        }`}
      >
        {isPending ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading piers.</div>
        ) : data?.data.length === 0 ? (
          <div>No piers found.</div>
        ) : (
          <div className="flex flex-col">
            {data?.data?.map((pier: any) => (
              <div
                key={pier.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg p-[9px]"
                onClick={() => selectEndPier(pier)}
              >
                <div>
                  <Ship strokeWidth={1.5} />
                </div>
                <div className="text-sm text-gray-900">
                  <div>{pier.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToPier;
