import { useState } from "react";
import GalleryModal from "./GalleryModal";

const SmallImageGallery = ({ images }: { images: any }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const openGallery = (index: number = 0, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setInitialSlide(index);
    setIsGalleryOpen(true);
  }

  const imageClass = () => {
    if (images.length === 1) return "grid-cols-1 col-span-2";
    if (images.length === 2) return "grid-rows-2";
    return "grid-cols-2 grid-rows-2";
  }

  return (
    <>
      <div className={`grid ${imageClass()} gap-1 w-full h-full rounded overflow-hidden relative`}>
        {images.slice(0, 3).map((img: {url: string}, index: number) => (
          <div
            onClick={(e) => openGallery(index, e)}
            key={index}
            className={`w-full h-full bg-cover bg-center ${
              index === 0 && images.length >= 3 ? "col-span-2" : "col-span-1"
            }`}
            style={{ backgroundImage: `url(${img.url})` }}
          />
        ))}
        <div className="absolute bottom-2 right-2 bg-black/45 rounded">
          <span className="text-white text-xs p-1 py-2">more</span>
        </div>
      </div>

      <GalleryModal
        galleries={images}
        isGalleryOpen={isGalleryOpen}
        setIsGalleryOpen={setIsGalleryOpen}
        initialSlide={initialSlide}
      />
    </>
  );
};

export default SmallImageGallery;
