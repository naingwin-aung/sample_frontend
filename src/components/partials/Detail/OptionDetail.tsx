import { useState } from "react";

const zones = [
    { name: "Zone A" },
    { name: "Zone B" },
    { name: "Zone C" },
]

const OptionDetail = () => {
  const [activeZone, setActiveZone] = useState<any | null>(null);

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Select Zone(s)</h4>
      <div className="flex gap-4">
        {
            zones.map((zone) => (
                <label key={zone.name} htmlFor={zone.name} className={`text-md font-medium border rounded-lg px-5 py-2 cursor-pointer ${activeZone === zone.name ? 'border-primary text-primary' : ''}`}>
                    {zone.name}
                <input
                    id={zone.name}
                    type="radio"
                    checked={activeZone === zone.name}
                    onChange={() => setActiveZone(zone.name)}
                    className="appearance-none"
                />
                </label>
            ))
        }
      </div>
      <div className="flex gap-4 mt-6">
        <div className="w-1/3 border border-primary rounded-lg h-[190px]">
            
        </div>
        <div className="w-2/3">
            <h4 className="text-lg font-semibold mb-4">Select Ticket</h4>
            <div className="flex flex-col gap-4">
                <div className="w-full border border-primary rounded-2xl h-[200px]">

                </div>
                <div className="w-full border border-primary rounded-2xl h-[200px]">

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OptionDetail;
