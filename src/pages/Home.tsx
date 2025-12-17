import Banner from "../components/partials/Home/Banner";
import ProductListing from "../components/partials/Home/ProductListing";

const Home = () => {
  return (
    <section className="flex flex-col gap-12">
      <div className="mb-40 md:mb-15">
        <Banner />
      </div>
      <div className="mt-5">
        <ProductListing />
      </div>
    </section>
  );
};

export default Home;
