import { useCallback, useEffect, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { ListPierQueryOption } from "../../../../api/pier";
import { Ship } from "lucide-react";

const FromPier = ({ selectedFromPierId, setSelectedFromPierId }: { selectedFromPierId: number | null; setSelectedFromPierId: React.Dispatch<React.SetStateAction<number | null>> }) => {
  const [fromPierShow, setFromPierShow] = useState<boolean>(false);
  const [fromPierInput, setFromPierInput] = useState<string>("");

  const debouncedSearch = useDebounce(fromPierInput, 500);

  const { data, isPending, error } = useQuery({
    ...ListPierQueryOption(debouncedSearch, 1, 8),
    enabled: debouncedSearch.length > 0,
  });

  useEffect(() => {
    if (fromPierInput.length > 0 && selectedFromPierId === null) {
      setFromPierShow(true);
    } else {
      setFromPierShow(false);
    }
  }, [fromPierInput, selectedFromPierId]);

  const handleFromPierChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFromPierInput(value);
      setSelectedFromPierId(null);
    },
    []
  );

  const selectFromPier = useCallback((pier: any) => {
    setFromPierInput(pier.name);
    setSelectedFromPierId(pier.id);
    setFromPierShow(false);
  }, []);

  return (
    <>
      <span className="absolute left-4 top-2 text-xs text-gray-500">From</span>

      <input
        type="text"
        value={fromPierInput}
        className="text-sm w-full bg-gray-100 px-4 pt-7 pb-3 focus:outline-none rounded-xl border focus:border-orange-500"
        placeholder="From pier"
        onChange={handleFromPierChange}
      />

      <div
        className={`w-auto lg:w-[340px] p-3 rounded-xl bg-white z-10 absolute top-full mt-2 left-0 shadow-md border border-gray-200 ${
          fromPierShow ? "block" : "hidden"
        }`}
      >
        {isPending ? (
          <div className="p-2 text-sm text-gray-600">Loading...</div>
        ) : error ? (
          <div className="p-2 text-sm text-gray-600">Error loading piers.</div>
        ) : data?.data.length === 0 ? (
          <div className="p-2 text-sm text-gray-600">No piers found.</div>
        ) : (
          <div className="flex flex-col">
            {data?.data?.map((pier: any) => (
              <div
                key={pier.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg p-[9px]"
                onClick={() => selectFromPier(pier)}
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
    </>
  );
};

export default FromPier;
