import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { ChevronDown } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border border-gray-300 rounded-2xl overflow-hidden cursor-pointer"
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>div]:rounded-b-none [&>svg]:hidden">
          <div className="w-full flex h-[220px]">
            <div
              className="w-1/4 h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${galleries[0].url})` }}
            ></div>
            <div className="w-3/4 h-full py-4 px-5 flex flex-col">
              <div className="flex items-center justify-between mb-4.5">
                <h3 className="text-xl font-medium line-clamp-1 text-left">
                  {option.name}
                </h3>
                <div className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
                  <ChevronDown strokeWidth={1.5}/>
                </div>
              </div>
              <div className="w-full flex-1 mb-2 text-gray-600 text-left overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                non odit voluptatem repellendus, optio nihil. Accusantium autem
                distinctio, minus expedita qui, vitae dignissimos in
              </div>
              <div className="flex justify-end items-center gap-2">
                <span className="text-lg text-gray-600">From</span>
                <span className="text-xl font-medium">THB 21,00</span>
                <div 
                  className="rounded-lg bg-primary py-3 px-5 text-white font-medium text-center cursor-pointer text-sm hover:bg-orange-600 transition"
                >
                  Select
                </div>
              </div>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="p-6 border-t border-gray-200">
          <div>
            <h4 className="text-lg font-semibold mb-4">Details</h4>
            <p className="text-gray-700">
              Here are more details about the selected option. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectOptionItem;
