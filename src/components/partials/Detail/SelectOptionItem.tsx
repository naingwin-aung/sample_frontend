import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import OptionDetail from "./OptionDetail";
import SmallImageGallery from "./SmallImageGallery";

const SelectOptionItem = ({
  slug,
  option,
  index,
  isExpanded,
  onToggle,
}: {
  slug: string | undefined;
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
      className={`w-full border rounded-2xl overflow-hidden cursor-pointer ${
        isExpanded ? "border-primary" : "border-gray-300"
      }`}
      onValueChange={() => onToggle(index)}
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>div]:rounded-b-none [&>svg]:hidden">
          <div className="flex flex-col md:flex-row w-full h-auto md:h-[210px]">
            <div className="w-full md:w-1/4 h-[250px] md:h-full">
              <SmallImageGallery images={option?.boat?.images} />        
            </div>
            <div className="w-full md:w-3/4 h-full py-4 px-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-medium line-clamp-1 text-left">
                  {option.boat?.name}
                </h3>
                <div className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
                  {isExpanded ? (
                    <ChevronUp strokeWidth={1.5} />
                  ) : (
                    <ChevronDown strokeWidth={1.5} />
                  )}
                </div>
              </div>

              <div className="w-full text-gray-600 mb-6 text-left overflow-hidden font-normal line-clamp-3">
                {option.boat?.description}
              </div>

              <div
                className={`${
                  isExpanded
                    ? "mt-[31.5px]"
                    : "mt-auto flex flex-col md:flex-row md:justify-between md:items-center"
                }`}
              >
                <div className="font-normal text-gray-600 cursor-pointer flex  items-center">
                  <span className="text-lg text-gray-600 me-2">From</span>
                  <span className="text-xl font-medium">
                    THB {option?.min_price.toLocaleString()}
                  </span>
                </div>
                {!isExpanded ? (
                  <div className="flex justify-end items-center gap-2">
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
          <OptionDetail slug={slug} optionId={option.id} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectOptionItem;
