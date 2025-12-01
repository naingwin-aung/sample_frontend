import Banner from "../components/partials/Home/Banner";
import Offer from "../components/partials/Home/Offer";
import TravelerChoice from "../components/partials/Home/TravelerChoice";
import WhereNext from "../components/partials/Home/WhereNext";

const Home = () => {
  return (
    <section className="flex flex-col gap-12">
      <Banner />

      {/* <Offer />
      <WhereNext /> */}
      <TravelerChoice />
    </section>
  );
};

export default Home;
