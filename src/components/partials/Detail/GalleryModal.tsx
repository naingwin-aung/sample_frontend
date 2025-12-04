import { X } from "lucide-react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GalleryModal = ({
  isGalleryOpen,
  setIsGalleryOpen,
  galleries,
}: {
  isGalleryOpen: boolean,
  setIsGalleryOpen: React.Dispatch<React.SetStateAction<boolean>>,
  galleries: { url: string }[],
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

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

  const handleSwiperInit = (swiper) => {
    setSwiperInstance(swiper);
  };

  if (!isGalleryOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs"
      onClick={() => setIsGalleryOpen(false)}
    >
      <button
        onClick={() => setIsGalleryOpen(false)}
        className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 transition cursor-pointer"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div
        className="w-full max-w-7xl h-[90vh] px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-swiper-container">
          <button ref={prevRef} className="gallery-swiper-button-prev-custom">
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            onSwiper={handleSwiperInit}
          >
            {galleries.map((gallery, index) => (
              <SwiperSlide key={index}>
                <div className="w-auto h-[90vh] flex items-center justify-center">
                  <img
                    src={gallery.url}
                    alt={`Gallery image ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button ref={nextRef} className="gallery-swiper-button-next-custom">
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
