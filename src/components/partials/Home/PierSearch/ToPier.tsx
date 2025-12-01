import { useCallback, useEffect, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { ListPierQueryOption } from "../../../../api/pier";
import { Ship, X } from "lucide-react";

const ToPier = ({ selectedToPierId, setSelectedToPierId }: { selectedToPierId: number | null; setSelectedToPierId: React.Dispatch<React.SetStateAction<number | null>> }) => {
  const [toPierShow, setToPierShow] = useState<boolean>(false);
  const [toPierInput, setToPierInput] = useState<string>("");

  const debouncedSearch = useDebounce(toPierInput, 500);

  const { data, isPending, error } = useQuery({
    ...ListPierQueryOption(debouncedSearch, 1, 8),
    enabled: debouncedSearch.length > 0,
  });

  useEffect(() => {
    if (toPierInput.length > 0 && selectedToPierId === null) {
      setToPierShow(true);
    } else {
      setToPierShow(false);
    }
  }, [toPierInput, selectedToPierId]);

  const handleToPierChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setToPierInput(value);
      setSelectedToPierId(null);
    },
    []
  );

  const selectToPier = useCallback((pier: any) => {
    setToPierInput(pier.name);
    setSelectedToPierId(pier.id);
    setToPierShow(false);
  }, []);

  const clearSelection = () => {
    setToPierInput("");
    setSelectedToPierId(null);
  };

  return (
    <>
      <span className="absolute left-4 top-2 text-xs text-gray-500">To</span>

      <div
        className="absolute right-3 top-6.5 cursor-pointer"
        onClick={clearSelection}
      >
        {toPierInput && (
          <div className="bg-gray-200 rounded-full p-0.5 hover:bg-gray-300">
            <X
              strokeWidth={1.5}
              className="h-4 w-4 text-gray-400 hover:text-gray-600"
            />
          </div>
        )}
      </div>

      <input
        type="text"
        value={toPierInput}
        className="text-sm w-full bg-gray-100 px-4 pt-7 pb-3 focus:outline-none rounded-xl border focus:border-orange-500"
        placeholder="To pier"
        onChange={handleToPierChange}
      />

      <div
        className={`w-auto lg:w-[340px] p-3 rounded-xl bg-white z-10 absolute top-full mt-2 left-0 shadow-md border border-gray-200 ${
          toPierShow ? "block" : "hidden"
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
                onClick={() => selectToPier(pier)}
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

export default ToPier;
