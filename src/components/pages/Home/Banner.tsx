import PierSearchBox from "./PierSearch/PierSearchBox";

const Banner = () => {
  const backgroundImageUrl = "/src/assets/banner.jpg";

  return (
    <div
      className="h-[345px] w-full relative"
      style={{
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <PierSearchBox />
    </div>
  );
};

export default Banner;
