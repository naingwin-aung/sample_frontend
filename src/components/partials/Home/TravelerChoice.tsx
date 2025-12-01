import Container from "../../global/Container";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";

const products = [
  {
    title: "Beautiful Bali, Indonesia",
    slug: "beautiful-bali-indonesia",
    image:
      "https://i.pinimg.com/1200x/2b/ab/31/2bab3159dbe18813e1c5d36bbf2573cf.jpg",
    description:
      "Experience the serene beauty of Bali with its stunning beaches, vibrant culture, and lush landscapes. Perfect for a relaxing getaway or an adventurous exploration.",
    price: 700,
  },
  {
    title: "Phi Phi Islands, Thailand",
    slug: "phi-phi-islands-thailand",
    image:
      "https://i.pinimg.com/736x/a5/46/f0/a546f0c5bf17ed1cf7edc496b7ee338e.jpg",
    description:
      "Discover the breathtaking Phi Phi Islands, known for their crystal-clear waters, dramatic cliffs, and vibrant marine life. An ideal destination for snorkeling, diving, and island hopping.",
    price: 850,
  },
  {
    title: "Koh Samui, Thailand",
    slug: "koh-samui-thailand",
    image:
      "https://i.pinimg.com/1200x/c7/b9/62/c7b9623e58290c74241dce8d56622d92.jpg",
    description:
      "Relax on the pristine beaches of Koh Samui, a tropical paradise offering luxurious resorts, lively nightlife, and a variety of water activities. Perfect for both relaxation and adventure.",
    price: 900,
  },
  {
    title: "Maui, Hawaii",
    slug: "maui-hawaii",
    image:
      "https://i.pinimg.com/736x/69/29/e0/6929e05929a463592929377f6a22aa16.jpg",
    description:
      "Explore the diverse landscapes of Maui, from its lush rainforests and volcanic craters to its stunning beaches. Enjoy activities like snorkeling, hiking, and whale watching in this island paradise.",
    price: 1200,
  },
  {
    title: "Santorini, Greece",
    slug: "santorini-greece",
    image:
      "https://i.pinimg.com/736x/71/30/60/7130602940580cded07ddcbb4b36dba4.jpg",
    description:
      "Experience the iconic beauty of Santorini with its white-washed buildings, blue-domed churches, and breathtaking sunsets. A perfect destination for romance, culture, and stunning views.",
    price: 1100,
  },
  {
    title: "Kyoto, Japan",
    slug: "kyoto-japan",
    image:
      "https://i.pinimg.com/1200x/3a/c2/7f/3ac27f43265607c504b70f9e4348acaf.jpg",
    description:
      "Immerse yourself in the rich cultural heritage of Kyoto, known for its historic temples, traditional tea houses, and beautiful gardens. A must-visit for history buffs and culture enthusiasts.",
    price: 950,
  },
  {
    title: "Paris, France",
    slug: "paris-france",
    image:
      "https://i.pinimg.com/1200x/65/dd/cc/65ddccaf9dc75773a876816f7e89281c.jpg",
    description:
      "Discover the romance and charm of Paris, the city of lights. Explore iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral, while indulging in world-class cuisine and shopping.",
    price: 1300,
  },
  {
    title: "New York City, USA",
    slug: "new-york-city-usa",
    image:
      "https://i.pinimg.com/1200x/b4/49/d4/b449d4c6a3f6c9fad6ff1160b625a5b0.jpg",
    description:
      "Experience the vibrant energy of New York City, from the towering skyscrapers of Manhattan to the diverse neighborhoods and cultural landmarks. A city that never sleeps, offering endless entertainment and dining options.",
    price: 1400,
  },
];

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
