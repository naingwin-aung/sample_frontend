import { useParams } from "react-router-dom";
import Container from "../components/global/Container";
import { useState } from "react";
import GalleryModal from "../components/partials/Detail/GalleryModal";
import SelectOptionItem from "../components/partials/Detail/SelectOptionItem";
import Gallery from "../components/partials/Detail/Gallery";
import { useQuery } from "@tanstack/react-query";
import { GetProductBySlugQueryOption } from "../api/Product/products";

const product = {
  gallery: [
    {
      url: "https://i.pinimg.com/1200x/bd/90/a6/bd90a6c8ea07dc7390e461b655a8b1c6.jpg",
    },
    {
      url: "https://i.pinimg.com/1200x/67/7e/7f/677e7f6240a74891acae4e5df14d5bd1.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/5f/f2/ad/5ff2ada1b287dedb7984510e04ef958d.jpg",
    },
    {
      url: "https://i.pinimg.com/736x/e7/b7/85/e7b785d2cba3004447e07b421391b2fd.jpg",
    },
    {
      url: "https://i.pinimg.com/1200x/2b/25/87/2b2587571d107dd32ce0112b4c034f5c.jpg",
    },
    // {
    //   url: "https://i.pinimg.com/736x/7b/91/87/7b91871d2d00cc68de059df6a34c836b.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/3c/61/23/3c6123aa04908249698efc04b6af04aa.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/e6/b9/c1/e6b9c1decfae8e63c78edf62d1328f3f.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/bd/e0/2e/bde02e31309fa9e3538a4452dabcc2d5.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/1f/69/9c/1f699cc7d911bee13d9242ba126dff92.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/1200x/bd/90/a6/bd90a6c8ea07dc7390e461b655a8b1c6.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/1200x/67/7e/7f/677e7f6240a74891acae4e5df14d5bd1.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/5f/f2/ad/5ff2ada1b287dedb7984510e04ef958d.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/e7/b7/85/e7b785d2cba3004447e07b421391b2fd.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/1200x/2b/25/87/2b2587571d107dd32ce0112b4c034f5c.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/7b/91/87/7b91871d2d00cc68de059df6a34c836b.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/3c/61/23/3c6123aa04908249698efc04b6af04aa.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/e6/b9/c1/e6b9c1decfae8e63c78edf62d1328f3f.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/bd/e0/2e/bde02e31309fa9e3538a4452dabcc2d5.jpg",
    // },
    // {
    //   url: "https://i.pinimg.com/736x/1f/69/9c/1f699cc7d911bee13d9242ba126dff92.jpg",
    // },
  ],
};

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
  const {data: detail, isPending, error} = useQuery({
    ...GetProductBySlugQueryOption(slug)
  })

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
    return <Container className="mt-6">Error loading product details.</Container>;
  }

  return (
    <Container className="mt-6">
      <h2 className="text-3xl font-medium mb-6">{detail?.name}</h2>

      {/* gallery here */}
      <Gallery gallery={product.gallery} openGallery={openGallery} />
      {/* end gallery */}

      {/* gallery modal */}
      <GalleryModal
        galleries={product.gallery}
        isGalleryOpen={isGalleryOpen}
        setIsGalleryOpen={setIsGalleryOpen}
        initialSlide={initialSlide}
      />

      {/* description */}
      <div className="flex gap-4 mb-6">
        <div className="w-3/4 h-[170px] border border-gray-200 rounded-2xl"></div>
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
            {select_options.map((option, index) => (
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
