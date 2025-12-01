import { useState } from "react";
import FromPier from "./PierSearch/FromPier";
import ToPier from "./PierSearch/ToPier";
import PassengerCount from "./PierSearch/PassengerCount";
import ChooseDate from "./PierSearch/ChooseDate";

const Banner = () => {
  const backgroundImageUrl = "/src/assets/banner.jpg";
  const [selectedFromPierId, setSelectedFromPierId] = useState<number | null>(
    null
  );
  const [selectedToPierId, setSelectedToPierId] = useState<number | null>(
    null
  );
  const [passengerCount, setPassengerCount] = useState<number>(2);
  const [date, setDate] = useState<Date | undefined>(new Date());

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

      <div className="w-[calc(100%-3rem)] mx-auto p-5 xl:w-[1180px] h-auto bg-white absolute bottom-[-180px] lg:bottom-[-50px] left-1/2 transform -translate-x-1/2 shadow-lg rounded-2xl flex flex-col justify-center z-10">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          <div className="w-full lg:w-2/8 relative">
            <FromPier selectedFromPierId={selectedFromPierId} setSelectedFromPierId={setSelectedFromPierId} />
          </div>

          <div className="w-full lg:w-2/8 relative">
            <ToPier selectedToPierId={selectedToPierId} setSelectedToPierId={setSelectedToPierId} />
          </div>

          <div className="w-full lg:w-2/8 relative">
            <ChooseDate date={date} setDate={setDate} />
          </div>

          <div className="w-full lg:w-1/8 relative">
            <PassengerCount passengerCount={passengerCount} setPassengerCount={setPassengerCount} />
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
