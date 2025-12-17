import { useParams } from "react-router-dom";
import Container from "../components/global/Container";
import { useState } from "react";
import GalleryModal from "../components/partials/Detail/GalleryModal";
import SelectOptionItem from "../components/partials/Detail/SelectOptionItem";
import Gallery from "../components/partials/Detail/Gallery";
import { useQuery } from "@tanstack/react-query";
import { GetProductBySlugQueryOption } from "../api/Product/products";

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
      <h2 className="text-2xl md:text-3xl font-medium mb-6">{detail?.name}</h2>

      <div className="mb-5 text-gray-600 flex items-center gap-2">
        <div>Departure piers</div>
        {detail.piers.length > 0 &&
          detail.piers.slice(0, 2).map((pier: any) => (
            <span
              key={pier.id}
              className="mr-1 text-primary text-sm bg-orange-100 px-1.5 py-1 rounded-md"
            >
              {pier.name}
            </span>
          ))}
      </div>

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
      <div className="flex gap-4 mb-7">
        <div className="w-full md:w-3/4 h-max border border-gray-200 rounded-2xl p-4 leading-6.5">
          <div dangerouslySetInnerHTML={{ __html: detail.description }} />
        </div>
        <div className="hidden md:block w-1/4 h-[120px] border border-gray-200 rounded-2xl p-5">
          <div className="text-xl font-medium">
            <span className="text-sm text-gray-600 mr-2">From</span>
            THB {detail.min_price.toLocaleString()}
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
        <h3 className="text-2xl font-medium mb-5">Select options</h3>
        <div className="w-full mb-6">
          <div className="flex flex-col gap-7">
            {detail.options.map((option: any, index: number) => (
              <SelectOptionItem
                slug={slug}
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
