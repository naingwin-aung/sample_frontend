import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../partials/Home/ProductCard";
import type { ProductType } from "../../types/ProductType";

const CarouselSlide = ({products}: {products: ProductType[]}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

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

  const breakpoints = {
    769: {
      slidesPerView: 4,
      spaceBetween: 13,
      pagination: false,
    },
    0: {
      slidesPerView: 1.2,
      spaceBetween: 10,
      pagination: {
        clickable: true,
      },
      navigation: {
        enabled: false,
      },
    },
  };
  return (
    <div className="custom-swiper-container relative">
      <button
        ref={prevRef}
        className="swiper-button-prev-custom hidden md:block absolute top-1/2 left-0 z-10 -translate-y-1/2 p-1 bg-white rounded-full shadow"
      >
        <ChevronLeft size={17} strokeWidth={1.5} />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={breakpoints}
        pagination={{ clickable: true }}
        onSwiper={handleSwiperInit}
      >
        {products.map((product: ProductType) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={nextRef}
        className="swiper-button-next-custom hidden md:block absolute top-1/2 right-0 z-10 -translate-y-1/2 p-1 bg-white rounded-full shadow"
      >
        <ChevronRight size={17} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default CarouselSlide;
