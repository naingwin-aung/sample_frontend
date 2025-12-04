const galleries = [
  {
    url: "https://i.pinimg.com/1200x/bd/90/a6/bd90a6c8ea07dc7390e461b655a8b1c6.jpg",
  },
  {
    url: "https://i.pinimg.com/1200x/67/7e/7f/677e7f6240a74891acae4e5df14d5bd1.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/5f/f2/ad/5ff2ada1b287dedb7984510e04ef958d.jpg",
  },
];

const SelectOptionItem = ({ option }: { option: any }) => {
  return (
    <div className="w-full h-[200px] border border-gray-300 rounded-2xl flex cursor-pointer">
      <div
        className="w-1/4 h-full bg-cover bg-center rounded-l-2xl"
        style={{ backgroundImage: `url(${galleries[0].url})` }}
      ></div>
      <div className="w-3/4 h-full py-4 px-5">
        <h3 className="text-xl font-medium line-clamp-1 mb-3">{option.name}</h3>
        <div className="w-full h-[85px] mb-2 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum non odit
          voluptatem repellendus, optio nihil. Accusantium autem distinctio,
          minus expedita qui, vitae dignissimos in
        </div>
        <div className="flex justify-end items-center">
          <span className="text-2xl font-medium">THB 21,00</span>
        </div>
      </div>
    </div>
  );
};

export default SelectOptionItem;
