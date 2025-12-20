// import Banner from "../components/partials/Home/Banner";
import Container from "../components/global/Container";
import ProductListing from "../components/pages/Home/ProductListing";

const Home = () => {
  return (
    <section className="flex flex-col gap-12 pb-12">
      {/* <div className="mb-40 md:mb-15">
        <Banner />
      </div> */}
      <Container className="mt-7">
        <h2 className="text-2xl mb-6">
          Explore the World Through Unforgettable Cruises
        </h2>
        {/* <div className="flex justify-between items-center mb-4">
          <h4 className="">10K+ cruises</h4>
        </div> */}
        <ProductListing />
      </Container>
    </section>
  );
};

export default Home;
