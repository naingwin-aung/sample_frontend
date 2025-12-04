const Gallery = ({
  product,
  openGallery,
}: {
  product: any;
  openGallery: (index: number) => void;
}) => {
  return (
    <div className="w-full h-[400px] mb-6">
      <div className="w-full h-full flex gap-2 rounded-xl overflow-hidden relative">
        <div
          className="w-1/2 h-full relative overflow-hidden cursor-pointer"
          onClick={() => openGallery(0)}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${product.gallery[0]?.url})` }}
          ></div>
        </div>

        <div className="w-1/2 h-full relative overflow-hidden">
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2">
            {product.gallery.slice(1, 5).map((img: any, index: number) => (
              <div
                key={index}
                className="w-full h-full bg-cover bg-center overflow-hidden cursor-pointer"
                style={{ backgroundImage: `url(${img.url})` }}
                onClick={() => openGallery(index + 1)}
              ></div>
            ))}
          </div>

          {/* Image counter overlay */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-lg text-white text-sm font-medium">
            {product.gallery.length}
          </div>

          {/* Gallery button overlay */}
          <button
            className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 font-medium text-sm cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              openGallery(0);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
