import Banner from "../components/partials/Home/Banner";
import Offer from "../components/partials/Home/Offer";
import TravelerChoice from "../components/partials/Home/TravelerChoice";
import WhereNext from "../components/partials/Home/WhereNext";

const Home = () => {
  return (
    <section className="flex flex-col gap-12">
      <div className="mb-10 md:mb-3">
        <Banner />
      </div>

      {/* <Offer />
      <WhereNext /> */}
      <TravelerChoice />
    </section>
  );
};

export default Home;
