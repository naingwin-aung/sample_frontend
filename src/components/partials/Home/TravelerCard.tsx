import Image from "../../global/Image"

const TravelerCard = ({title, image, description, price}: {title: string, image: string, description: string, price: number}) => {
  return (
    <div className="w-full h-[390px] border border-gray-200 rounded-2xl cursor-pointer hover:shadow">
        <div className="w-full h-[200px]">
          <Image src={image} alt="traveler" className="w-full h-full object-cover rounded-t-2xl"/>
        </div>
        <div className="p-4 h-[150px]">
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-sm text-gray-500 line-clamp-4">
            {description}
          </p>
        </div>
        {/* footer */}
        <div className="flex justify-between items-center px-4 mt-auto pb-4">
          <span className="text-sm text-gray-500"></span>
          <span className="text-md font-medium">THB {price}</span>
        </div>
    </div>
  )
}

export default TravelerCard