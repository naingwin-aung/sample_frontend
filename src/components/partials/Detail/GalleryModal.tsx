import { X } from "lucide-react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

const GalleryModal = ({
  isGalleryOpen,
  setIsGalleryOpen,
  galleries,
  initialSlide = 0,
}: {
  isGalleryOpen: boolean;
  setIsGalleryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  galleries: { url: string }[];
  initialSlide?: number;
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isGalleryOpen]);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const handleSwiperInit = (swiper: SwiperType) => {
    setSwiperInstance(swiper);
    swiper.slideTo(initialSlide, 0);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    if (isGalleryOpen && swiperInstance) {
      swiperInstance.slideTo(initialSlide, 0);
      setActiveIndex(initialSlide);
    }
  }, [isGalleryOpen, initialSlide]);

  if (!isGalleryOpen) return null;

  const breakpoints = {
    769: {
      pagination: false,
    },
    0: {
      pagination: {
        clickable: true,
      },
      navigation: {
        enabled: false,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs">
      <button
        onClick={() => setIsGalleryOpen(false)}
        className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 transition cursor-pointer"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div
        className="w-full max-w-6xl px-4 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Swiper */}
        <div className="custom-swiper-container">
          {galleries.length > 1 && !isMobile && (
            <button ref={prevRef} className="gallery-swiper-button-prev-custom">
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
          )}

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
            breakpoints={breakpoints}
            spaceBetween={10}
            slidesPerView={1}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSlideChange}
            pagination={{ clickable: true }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
          >
            {galleries.map((gallery, index) => (
              <SwiperSlide key={index}>
                <div className="w-auto h-[80vh] flex items-center justify-center">
                  <img
                    src={gallery.url}
                    alt={`Gallery image ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {galleries.length > 1 && !isMobile && (
            <button ref={nextRef} className="gallery-swiper-button-next-custom">
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Thumbnail Gallery */}
        <div className="w-full max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Thumbs]}
            spaceBetween={12}
            slidesPerView="auto"
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            className="thumbnail-swiper"
          >
            {galleries.map((gallery, index) => (
              <SwiperSlide key={index} style={{ width: "auto" }}>
                <div
                  className={`cursor-pointer transition-all duration-200 rounded-lg overflow-hidden ${
                    activeIndex === index
                      ? "ring-2 ring-white opacity-100"
                      : "opacity-60 hover:opacity-80"
                  }`}
                  onClick={() => swiperInstance?.slideTo(index)}
                >
                  <img
                    src={gallery.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
