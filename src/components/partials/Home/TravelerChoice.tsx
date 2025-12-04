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
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TravelerChoice = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null); // To store the Swiper object

  const handleSwiperInit = (swiper) => {
    setSwiperInstance(swiper);
  };

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

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

      {/* <Carousel
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
      </Carousel> */}

      <div className="custom-swiper-container">
        <button ref={prevRef} className="swiper-button-prev-custom">
          <ChevronLeft size={17} strokeWidth={1.5} />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={13}
          slidesPerView={4}
          // navigation
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          onSwiper={handleSwiperInit}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button ref={nextRef} className="swiper-button-next-custom">
          <ChevronRight size={17} strokeWidth={1.5} />
        </button>
      </div>
    </Container>
  );
};

export default TravelerChoice;
