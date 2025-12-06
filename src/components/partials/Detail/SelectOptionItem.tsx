import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import OptionDetail from "./OptionDetail";

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

const SelectOptionItem = ({
  option,
  index,
  isExpanded,
  onToggle,
}: {
  option: any;
  index: number;
  isExpanded: boolean;
  onToggle: (index: number) => void;
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      value={isExpanded ? "item-1" : ""}
      className={`w-full border rounded-2xl overflow-hidden cursor-pointer ${isExpanded ? "border-primary" : "border-gray-300"}`}
      onValueChange={() => onToggle(index)}
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>div]:rounded-b-none [&>svg]:hidden">
          <div className="w-full flex h-[220px]">
            <div
              className="w-1/4 h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${galleries[index + 1].url})` }}
            ></div>
            <div className="w-3/4 h-full py-4 px-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-medium line-clamp-1 text-left">
                  {option.name}
                </h3>
                <div className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
                  {isExpanded ? (
                    <ChevronUp strokeWidth={1.5} />
                  ) : (
                    <ChevronDown strokeWidth={1.5} />
                  )}
                </div>
              </div>

              <div className="w-full text-gray-600 mb-4 text-left overflow-hidden font-normal">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                non odit voluptatem repellendus, optio nihil. Accusantium autem
                distinctio, minus expedita qui, vitae dignissimos in Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Dolor excepturi
                possimus corrupti, earum ea, iste dignissimos
              </div>

              <div
                className={`${
                  isExpanded
                    ? "mt-[26.5px]"
                    : "mt-auto flex justify-between items-center"
                }`}
              >
                <div className="font-normal underline text-gray-600 cursor-pointer flex items-center">
                  <div>Package details</div>
                  <div>
                    <ChevronRight strokeWidth={1.5} size={23} />
                  </div>
                </div>
                {!isExpanded ? (
                  <div className="flex justify-end items-center gap-2">
                    <span className="text-lg text-gray-600 mt-1">From</span>
                    <span className="text-xl font-medium mt-1">THB 21,00</span>
                    <div className="rounded-lg bg-primary py-3 px-5 text-white font-medium text-center cursor-pointer text-sm hover:bg-orange-600 transition">
                      Select
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="p-6 border-t border-gray-100">
          <OptionDetail />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectOptionItem;
