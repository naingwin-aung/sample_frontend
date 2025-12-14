import { useParams } from "react-router-dom";
import Container from "../components/global/Container";
import { useState } from "react";
import GalleryModal from "../components/partials/Detail/GalleryModal";
import SelectOptionItem from "../components/partials/Detail/SelectOptionItem";
import Gallery from "../components/partials/Detail/Gallery";
import { useQuery } from "@tanstack/react-query";
import { GetProductBySlugQueryOption } from "../api/Product/products";

const select_options = [
  {
    name: "River Cruise Boat",
    values: ["Standard", "Premium", "Deluxe"],
  },
  {
    name: "Luxury Boat",
    values: ["Breakfast Only", "Half Board", "Full Board"],
  },
  {
    name: "EV Boat",
    values: ["Indoor", "Outdoor", "Window Seat"],
  },
];

type ParamTypes = {
  slug: string;
};

const ProductDetail = () => {
  const { slug } = useParams<ParamTypes>();
  const {
    data: detail,
    isPending,
    error,
  } = useQuery({
    ...GetProductBySlugQueryOption(slug),
  });

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [expandedOption, setExpandedOption] = useState<number | null>(null);

  const scrollToSelectOptions = () => {
    const targetElement = document.getElementById("select_option");
    const navBarElement = document.getElementById("nav-bar-id");

    if (targetElement && navBarElement) {
      const navBarHeight = navBarElement.offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const finalScrollPosition = targetPosition - (navBarHeight + 10);

      window.scrollTo({
        top: finalScrollPosition,
        behavior: "smooth",
      });
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      console.warn(
        "Could not find the navigation bar element. Scrolling to start without offset."
      );
    }
  };

  const openGallery = (index: number = 0) => {
    setInitialSlide(index);
    setIsGalleryOpen(true);
  };

  if (isPending) {
    return <Container className="mt-6">Loading...</Container>;
  }

  if (error || !detail) {
    return (
      <Container className="mt-6">Error loading product details.</Container>
    );
  }

  return (
    <Container className="mt-6">
      <h2 className="text-3xl font-medium mb-6">{detail?.name}</h2>

      {/* gallery here */}
      <Gallery gallery={detail.images} openGallery={openGallery} />
      {/* end gallery */}

      {/* gallery modal */}
      <GalleryModal
        galleries={detail.images}
        isGalleryOpen={isGalleryOpen}
        setIsGalleryOpen={setIsGalleryOpen}
        initialSlide={initialSlide}
      />

      {/* description */}
      <div className="flex gap-4 mb-6">
        <div className="w-3/4 h-max border border-gray-200 rounded-2xl p-4">
          <div dangerouslySetInnerHTML={{ __html: detail.description }} />
        </div>
        <div className="w-1/4 h-[120px] border border-gray-200 rounded-2xl p-5">
          <div className="text-xl font-medium">
            <span className="text-sm text-gray-600 mr-2">From</span>
            THB 18,99
          </div>
          <button
            onClick={scrollToSelectOptions}
            className="w-full rounded-2xl bg-primary py-3 text-white text-center mt-2 cursor-pointer text-sm hover:bg-orange-600 transition"
          >
            Select Options
          </button>
        </div>
      </div>

      {/* select option */}
      <div id="select_option">
        <h3 className="text-2xl font-medium mb-4">Select options</h3>
        <div className="w-full mb-6">
          <div className="flex flex-col gap-7">
            {detail.options.map((option: any, index: number) => (
              <SelectOptionItem
                key={index}
                option={option}
                index={index}
                isExpanded={expandedOption === index}
                onToggle={(idx) =>
                  setExpandedOption(expandedOption === idx ? null : idx)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
