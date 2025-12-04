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

      <div className="custom-swiper-container">
        <button ref={prevRef} className="swiper-button-prev-custom">
          <ChevronLeft size={17} strokeWidth={1.5} />
        </button>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={13}
          slidesPerView={4}
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
