import Container from "../../global/Container";
import { useQuery } from "@tanstack/react-query";
import { ListProductQueryOption } from "../../../api/Product/products";
import CarouselSlide from "../../global/CarouselSlide";

const TravelerChoice = () => {
  const { data } = useQuery({
    ...ListProductQueryOption(1, 10),
  });

  return (
    <Container>
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">
        Travelers' favorite choices
      </h2>

      <CarouselSlide products={data?.data || []} />
    </Container>
  );
};

export default TravelerChoice;
