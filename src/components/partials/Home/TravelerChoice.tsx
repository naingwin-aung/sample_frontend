import Container from "../../global/Container";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { products } from "../../../lib/constants";

const TravelerChoice = () => {
  return (
    <Container>
      <h2 className="text-3xl font-semibold mb-8">
        Travelers' favorite choices
      </h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {
              products.map((product, index) => (
                <ProductCard 
                  key={index}
                  {...product}
                />
              ))
            }
        </div> */}

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <ProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Container>
  );
};

export default TravelerChoice;
